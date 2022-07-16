import { useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import QuotesList from './components/quotes/QuotesList';
import LastPrice from './components/LastPrice';
import Container from './components/layout/Container';
import AppTitle from './components/layout/AppTitle';

/**
 * TODO:
 * - Implement sorting based on total quote on each buy and sell quotes
 * - Implement total quote logic (using array.reduce)
 * - Implement number format (thousand commas)
 * - Separate each quote row and cell as separate component
 * - Migrate state to redux (regular redux or redux toolkit) to avoid props drilling and unnecessary component re-rendering
 * - Implement accumulative total size percentage bar
 */

function App() {
  const QUOTES_WS_URL = 'wss://ws.btse.com/ws/oss/futures';

  const [sellQuotes, setSellQuotes] = useState<IQuote[]>([]);
  const [buyQuotes, setBuyQuotes] = useState<IQuote[]>([]);

  const { sendJsonMessage } = useWebSocket(QUOTES_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processQuotes(event),
  });

  const processQuotes = (event: { data: string }): void => {
    const response = JSON.parse(event.data) as IOrderBookResponse;

    const sellQuotes = response.data.asks.map((quotes) => {
      const [price, size] = quotes;
      return {
        price,
        size,
      };
    });

    const buyQuotes = response.data.bids.map((quotes) => {
      const [price, size] = quotes;
      return {
        price,
        size,
      };
    });

    setSellQuotes((prevState) => {
      return [...sellQuotes, ...prevState];
    });
    setBuyQuotes((prevState) => {
      return [...buyQuotes, ...prevState];
    });
  };

  const subscribeHandler = useCallback(() => {
    sendJsonMessage({
      op: 'subscribe',
      // @ts-ignore
      args: ['update:BTCPFC'],
    });
  }, [sendJsonMessage]);

  const unsubscribeHandler = useCallback(() => {
    sendJsonMessage({
      op: 'unsubscribe',
      // @ts-ignore
      args: ['update:BTCPFC'],
    });
  }, [sendJsonMessage]);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <button onClick={subscribeHandler}>Subscribe</button>
      <button onClick={unsubscribeHandler}>Unsubscribe</button>
      <Container>
        <AppTitle />
        <hr className='bg-gray opacity-20' />
        <div className='flex flex-col justify-center h-5/6'>
          <QuotesList type='SELL' quotes={sellQuotes} />
          <LastPrice />
          <QuotesList type='BUY' quotes={buyQuotes} />
        </div>
      </Container>
    </div>
  );
}

export default App;
