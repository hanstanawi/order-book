import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PriceState = 'HIGHER' | 'LOWER' | 'EQUAL';
interface ITradeHistoryState {
  lastPrice: number;
  lastPriceState: PriceState;
}

const initialState: ITradeHistoryState = {
  lastPrice: 0,
  lastPriceState: 'EQUAL',
};

const setPriceState = (prevPrice: number, newPrice: number): PriceState => {
  if (newPrice > prevPrice) {
    return 'HIGHER';
  }
  if (newPrice < prevPrice) {
    return 'LOWER';
  }
  return 'EQUAL';
};

export const tradeHistorySlice = createSlice({
  name: 'trade-history',
  initialState,
  reducers: {
    setLastPrice: (state, action: PayloadAction<number>) => {
      const prevPrice = current(state).lastPrice;
      const newPrice = action.payload;
      state.lastPrice = newPrice;
      state.lastPriceState = setPriceState(prevPrice, newPrice);
    },
  },
});

export const { setLastPrice } = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
