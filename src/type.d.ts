interface IQuote {
  price: number;
  size: number;
  total?: number;
}

interface IOrderBookResponse {
  topic: string;
  data: {
    bids: string[][];
    asks: string[][];
    seqNum: number;
    prevSeqNum: number;
    type: string;
    timestamp: number;
    symbol: string;
  };
}

interface ITradeHistory {
  symbol: string;
  side: string;
  size: number;
  price: number;
  tradeId: number;
  timestamp: number;
}

interface ITradeHistoryResponse {
  topic: string;
  data: ITradeHistory[];
}
