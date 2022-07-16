interface IQuote {
  price: number;
  size: number;
  total?: number;
}

interface IOrderBookResponse {
  topic: string;
  data: {
    bids: number[][];
    asks: number[][];
    seqNum: number;
    prevSeqNum: number;
    type: string;
    timestamp: number;
    symbol: string;
  };
}
