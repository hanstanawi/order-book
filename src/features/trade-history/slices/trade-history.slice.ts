import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ITradeHistoryState {
  lastPrice: number;
}

const initialState: ITradeHistoryState = {
  lastPrice: 0,
};

export const tradeHistorySlice = createSlice({
  name: 'trade-history',
  initialState,
  reducers: {
    setLastPrice: (state, action: PayloadAction<number>) => {
      state.lastPrice = action.payload;
    },
  },
});

export const { setLastPrice } = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
