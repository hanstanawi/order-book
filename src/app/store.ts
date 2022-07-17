import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from 'features/quotes/slices/quotes.slice';
import tradeHistoryReducer from 'features/trade-history/slices/trade-history.slice';

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    tradeHistory: tradeHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
