import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  applyDeltas,
  applySnapshots,
  calculateQuotesTotal,
  modifyQuotes,
  sortQuotesPrice,
} from '../helpers/quotes.helpers';
import { ORDERBOOK_MAX_LEVEL } from '../constants';

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
    setQuotesSnapshot: (
      state,
      { payload }: PayloadAction<IOrderBookResponse>
    ) => {
      const buyQuotes = payload.data.bids;
      const sellQuotes = payload.data.asks;
      state.buyQuotes = applySnapshots(buyQuotes, 'BUY');
      state.sellQuotes = applySnapshots(sellQuotes, 'SELL').sort((a, b) => {
        return b.price - a.price;
      });
    },
    addDeltaBuyQuotes: (state, { payload }: PayloadAction<string[][]>) => {
      const modifiedDeltaQuotes = modifyQuotes(payload);
      const updatedQuotes = applyDeltas(
        modifiedDeltaQuotes,
        current(state).buyQuotes
      );
      const shownQuotes = updatedQuotes.slice(0, ORDERBOOK_MAX_LEVEL);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'DESC');
      state.buyQuotes = calculateQuotesTotal(sortedQuotes);
    },
    addDeltaSellQuotes: (state, { payload }: PayloadAction<string[][]>) => {
      const modifiedDeltaQuotes = modifyQuotes(payload);
      const updatedQuotes = applyDeltas(
        modifiedDeltaQuotes,
        current(state).sellQuotes
      );
      const shownQuotes = updatedQuotes.slice(0, ORDERBOOK_MAX_LEVEL);
      const sortedQuotes = sortQuotesPrice(shownQuotes, 'ASC');
      const quotesWithTotal = calculateQuotesTotal(sortedQuotes);
      // Sort the sell quotes back in descending order after calculating the quote total
      state.sellQuotes = quotesWithTotal.sort((a, b) => {
        return b.price - a.price;
      });
    },
  },
});

export const { addDeltaBuyQuotes, addDeltaSellQuotes, setQuotesSnapshot } =
  quotesSlice.actions;

export default quotesSlice.reducer;
