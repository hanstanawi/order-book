import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { modifyQuotes, sortQuotesPrice } from '../helpers/quotes.helpers';

interface IQuoteState {
  buyQuotes: IQuote[];
  sellQuotes: IQuote[];
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
      const modifiedQuotes = modifyQuotes(action.payload);
      // const updatedQuotes = [...modifiedQuotes, ...state.buyQuotes];
      modifiedQuotes.forEach((quote) => {
        state.buyQuotes.push(quote);
      });
      console.log(current(state).buyQuotes);
      const sortedQuotes = sortQuotesPrice(current(state).buyQuotes, 'ASC');
      state.buyQuotes = [...sortedQuotes];
    },
    setSellQuotesHandler: (state, action: PayloadAction<string[][]>) => {
      const modifiedQuotes = modifyQuotes(action.payload);
      const updatedQuotes = [...modifiedQuotes, ...state.sellQuotes];
      const sortedQuotes = sortQuotesPrice(updatedQuotes, 'DESC');
      state.sellQuotes = [...updatedQuotes];
    },
  },
});

export const { setBuyQuotesHandler, setSellQuotesHandler } =
  quotesSlice.actions;

export default quotesSlice.reducer;
