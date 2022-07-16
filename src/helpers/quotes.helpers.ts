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
    .map((quote) => {
      const [price, size] = quote;
      return {
        price: Number(price),
        size: Number(size),
      };
    })
    .filter((quote) => quote.size > 0);
};
