import { ORDERBOOK_MAX_LEVEL } from '../constants';

/**
 * @description Check if quote with the same price exists in the current quotes
 * @param {number} deltaPrice Price of delta quote
 * @param {IQuote} currentQuotes Current quotes array
 * @returns {boolean}
 */
const levelExists = (deltaPrice: number, currentQuotes: IQuote[]): boolean => {
  return currentQuotes.some((quote) => quote.price === deltaPrice);
};

/**
 * @description Update a quote with existing price that has updated size
 * @param {IQuote} deltaQuote New delta Quote
 * @param currentQuotes Current quotes array
 * @returns {IQuote[]} Array with updated values
 */
const updateQuote = (deltaQuote: IQuote, currentQuotes: IQuote[]): IQuote[] => {
  return currentQuotes.map((quote) => {
    if (quote.price === deltaQuote.price) {
      return { price: deltaQuote.price, size: deltaQuote.size };
    }
    return quote;
  });
};

/**
 * @description Remove a quote from the list
 * @param {IQuote} deltaQuote Delta quote
 * @param {IQuote[]} currentQuotes Current quotes array
 * @returns {IQuote[]} Array with updated values
 */
const removeQuote = (deltaQuote: IQuote, currentQuotes: IQuote[]): IQuote[] => {
  return currentQuotes.filter((quote) => quote.price !== deltaQuote.price);
};

/**
 * @description Add a quote to quotes list
 * @param {IQuote} deltaQuote New delta quote
 * @param {IQuote[]} currentQuotes Current quotes array
 * @returns {IQuote[]} Array with updated values
 */
const addQuote = (deltaQuote: IQuote, currentQuotes: IQuote[]): IQuote[] => {
  return [deltaQuote, ...currentQuotes];
};

/**
 * @description Sort quotes based on the price
 * @param {IQuote[]} quotes Quotes array that needs to be sorted
 * @param {'ASC' | 'DESC'} direction Ascending or Descending
 * @returns {IQuote[]} Sorted quotes array
 */
export const sortQuotesPrice = (
  quotes: IQuote[],
  direction: 'ASC' | 'DESC'
): IQuote[] => {
  return quotes.sort((a, b) => {
    if (direction === 'ASC') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
};

/**
 * @description Modify quotes data from multi-dimensional array of price and size to be array of objects
 * @param {string[][]} quotes
 * @returns {IQuote[]} Array of quote objects
 */
export const modifyQuotes = (quotes: string[][]): IQuote[] => {
  return quotes.map((quote) => {
    const [price, size] = quote;
    return {
      price: Number(price),
      size: Number(size),
    };
  });
};

/**
 * @description 1. Iterates over delta quotes
 *              2. If size of a price is 0, remove the price from the list, then add the next quote
 *              3. If quote with same price exists, update it with the new size
 *              4. If quote with same price doesn't exist, push it to the list
 * @param {IQuote[]} deltaQuotes array of incoming modified delta data
 * @param {IQuote[]} currentQuotes array of current state
 * @returns {IQuote[]} array with updated delta data
 */
export const applyDeltas = (
  deltaQuotes: IQuote[],
  currentQuotes: IQuote[]
): IQuote[] => {
  let updatedQuotes = [...currentQuotes];
  // Iterates over delta quotes
  deltaQuotes.forEach((quote, index, arr) => {
    const { price: deltaPrice, size: deltaSize } = quote;
    // If size of a price is 0, remove the price from the list, then add the next quote
    if (deltaSize === 0) {
      updatedQuotes = removeQuote(quote, updatedQuotes);
      if (arr[index + 1]) {
        updatedQuotes = addQuote(arr[index + 1], updatedQuotes);
      }
    } else {
      // If quote with same price exists, update it with the new size
      if (levelExists(deltaPrice, currentQuotes)) {
        updatedQuotes = updateQuote(quote, updatedQuotes);
        // If quote with same price doesn't exist, push it to the list
      } else {
        updatedQuotes = addQuote(quote, updatedQuotes);
      }
    }
  });

  return updatedQuotes;
};

/**
 * @description Set initial snapshot of quotes data from websocket
 * @param {string[][]} snapshotQuotes Array of snapshot quotes
 * @param {QuoteType} quoteType Buy or Sell quotes
 * @returns {IQuoteWithTotal[]} Array with quotes object with total
 */
export const applySnapshots = (
  snapshotQuotes: string[][],
  quoteType: QuoteType
): IQuoteWithTotal[] => {
  const modifiedBuyQuotes = modifyQuotes(snapshotQuotes);
  const shownQuotes = modifiedBuyQuotes.slice(0, ORDERBOOK_MAX_LEVEL);
  const sortedQuotes = sortQuotesPrice(
    shownQuotes,
    quoteType === 'BUY' ? 'DESC' : 'ASC'
  );
  return calculateQuotesTotal(sortedQuotes);
};

/**
 * @description Calculate each quote item size and store them as total property
 * @param {IQuote[]} quotes Quotes array with only price and size
 * @returns {IQuoteWithTotal[]} Quotes array with updated total value on each object item
 */
export const calculateQuotesTotal = (quotes: IQuote[]): IQuoteWithTotal[] => {
  const quotesWithTotal: IQuoteWithTotal[] = [];
  for (let i = 0; i < quotes.length; i += 1) {
    const currQuote = quotes[i];
    const nextQuote = quotesWithTotal[i - 1];

    if (i === 0) {
      quotesWithTotal.push({
        ...currQuote,
        total: currQuote.size,
      });
    } else {
      quotesWithTotal.push({
        ...currQuote,
        total: currQuote.size + nextQuote.total,
      });
    }
  }
  return quotesWithTotal;
};
