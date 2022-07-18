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

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setBuyQuotesHandler: (state, action: PayloadAction<string[][]>) => {
      // Reducer
      /**
       * 1. Modify quotes transform to be Array<{ price: number, size: number }>
       * 2. Sort quotes based on price
       * 3. Slice quotes to be 8 items
       * 4. Count total of each item in quotes array
       */
      const modifiedQuotes = modifyQuotes(action.payload);
      const updatedQuotes = [...modifiedQuotes, ...current(state).buyQuotes];
      const shownQuotes = updatedQuotes.slice(0, 8);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'DESC');
      state.buyQuotes = calculateQuotesTotal(sortedQuotes);
    },
    setSellQuotesHandler: (state, action: PayloadAction<string[][]>) => {
      const modifiedQuotes = modifyQuotes(action.payload);
      const updatedQuotes = [...modifiedQuotes, ...current(state).sellQuotes];
      const shownQuotes = updatedQuotes.slice(0, 8);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'ASC');
      const quotesWithTotal = calculateQuotesTotal(sortedQuotes);
      state.sellQuotes = quotesWithTotal.sort((a, b) => {
        return b.price - a.price;
      });
    },
  },
});

export const { setBuyQuotesHandler, setSellQuotesHandler } =
  quotesSlice.actions;

export default quotesSlice.reducer;
