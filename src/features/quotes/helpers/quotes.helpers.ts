export const sortQuotesPrice = (
  quotes: IQuote[],
  direction: 'ASC' | 'DESC'
) => {
  return quotes.sort((a, b) => {
    if (direction === 'ASC') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
};

export const modifyQuotes = (quotes: string[][]) => {
  return quotes
    .map((quote, i) => {
      const [price, size] = quote;
      return {
        price: Number(price),
        size: Number(size),
      };
    })
    .filter((quote) => quote.size > 0);
};

export const calculateQuotesTotal = (quotes: IQuote[]) => {
  // TODO: CLEAN UP
  const quotesWithTotal: { price: number; size: number; total: number }[] = [];
  for (let i = 0; i < quotes.length; i += 1) {
    const currQuote = quotes[i];
    const nextQuote = quotesWithTotal[i - 1];

    if (i === 0) {
      quotesWithTotal.push({
        ...currQuote,
        total: currQuote.size,
      });
    } else if (i !== quotesWithTotal.length - 1) {
      quotesWithTotal.push({
        ...currQuote,
        total: currQuote.size + nextQuote.total,
      });
    }
  }
  return quotesWithTotal;
};
