import { ORDERBOOK_MAX_LEVEL } from '../constants';

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
 * @desc Modify quotes data from multi-dimensional array of price and size to be array of objects
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

const levelExists = (deltaPrice: number, currentQuotes: IQuote[]) => {
  return currentQuotes.some((quote) => quote.price === deltaPrice);
};

/**
 * @description 1. Iterates over delta quotes
 *              2. if size of a price is 0, remove the price from the list
 *              3. if quote with same price exists, update it with the new size
 *              4. if quote with same price doesn't exist, push it to the list
 * @param {IQuote[]} deltaQuotes array of incoming modified delta data
 * @param {IQuote[]} currentQuotes array of current state
 * @returns {IQuote[]} array with updated delta data
 */
export const applyDeltas = (deltaQuotes: IQuote[], currentQuotes: IQuote[]) => {
  let updatedQuotes = currentQuotes;
  deltaQuotes.forEach((deltaQuote) => {
    const { price: deltaPriceNum, size: deltaSizeNum } = deltaQuote;

    if (deltaSizeNum === 0 && updatedQuotes.length > ORDERBOOK_MAX_LEVEL) {
      updatedQuotes = updatedQuotes.filter(
        (quote) => quote.price !== deltaPriceNum
      );
    } else {
      if (levelExists(deltaPriceNum, currentQuotes)) {
        updatedQuotes = updatedQuotes.map((quote) => {
          return quote.price === deltaPriceNum
            ? { price: deltaPriceNum, size: deltaSizeNum }
            : quote;
        });
      } else {
        if (updatedQuotes.length < ORDERBOOK_MAX_LEVEL) {
          const quoteObject = { price: deltaPriceNum, size: deltaSizeNum };
          updatedQuotes = [quoteObject, ...updatedQuotes];
        }
      }
    }
  });

  return updatedQuotes;
};

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
