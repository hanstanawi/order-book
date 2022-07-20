import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  calculateQuotesTotal,
  modifyQuotes,
  sortQuotesPrice,
} from '../helpers/quotes.helpers';

interface IQuoteState {
  buyQuotes: IQuoteWithTotal[];
  sellQuotes: IQuoteWithTotal[];
}

const initialState: IQuoteState = {
  buyQuotes: [],
  sellQuotes: [],
};

const levelExists = (deltaPrice: number, currentQuotes: IQuote[]) => {
  return currentQuotes.some((quote) => quote.price === deltaPrice);
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addDeltaBuyQuotes: (state, action: PayloadAction<string[][]>) => {
      let updatedQuotes: IQuote[] = [...current(state).buyQuotes];
      const modifiedDeltaQuotes = modifyQuotes(action.payload);
      modifiedDeltaQuotes.forEach((quote, index, arr) => {
        const { price: deltaPrice, size: deltaSize } = quote;
        if (deltaSize === 0) {
          updatedQuotes = updatedQuotes.filter(
            (quote) => quote.price !== deltaPrice
          );
          if (arr[index + 1]) {
            updatedQuotes = [arr[index + 1], ...updatedQuotes];
          }
        } else {
          if (levelExists(deltaPrice, current(state).buyQuotes)) {
            updatedQuotes = updatedQuotes.map((quote) => {
              if (quote.price === deltaPrice) {
                return { price: deltaPrice, size: deltaSize };
              }
              return quote;
            });
          } else {
            updatedQuotes = [quote, ...updatedQuotes];
          }
        }
      });

      // const updatedQuotes = [...modifiedQuotes, ...current(state).buyQuotes];
      const shownQuotes = updatedQuotes.slice(0, 8);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'DESC');
      state.buyQuotes = calculateQuotesTotal(sortedQuotes);
    },
    addDeltaSellQuotes: (state, action: PayloadAction<string[][]>) => {
      let updatedQuotes: IQuote[] = [...current(state).sellQuotes];
      const modifiedDeltaQuotes = modifyQuotes(action.payload);
      modifiedDeltaQuotes.forEach((quote, index, arr) => {
        const { price: deltaPrice, size: deltaSize } = quote;
        if (deltaSize === 0) {
          updatedQuotes = updatedQuotes.filter(
            (quote) => quote.price !== deltaPrice
          );
          if (arr[index + 1]) {
            updatedQuotes = [arr[index + 1], ...updatedQuotes];
          }
        } else {
          if (levelExists(deltaPrice, current(state).sellQuotes)) {
            updatedQuotes = updatedQuotes.map((quote) => {
              if (quote.price === deltaPrice) {
                return { price: deltaPrice, size: deltaSize };
              }
              return quote;
            });
          } else {
            updatedQuotes = [quote, ...updatedQuotes];
          }
        }
      });
      const shownQuotes = updatedQuotes.slice(0, 8);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'ASC');
      const quotesWithTotal = calculateQuotesTotal(sortedQuotes);
      // Sort the sell quotes back in descending order after calculating the quote total
      state.sellQuotes = quotesWithTotal.sort((a, b) => {
        return b.price - a.price;
      });
    },
  },
});

export const { addDeltaBuyQuotes, addDeltaSellQuotes } = quotesSlice.actions;

export default quotesSlice.reducer;
