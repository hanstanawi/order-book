import { useState, useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

import { QUOTES_WS_URL } from 'constants/websockets.constants';
import { modifyQuotes } from 'helpers/quotes.helpers';

import QuotesList from 'components/quotes/QuotesList';
import LastPrice from 'components/LastPrice';
import Container from 'components/layout/Container';
import AppTitle from 'components/layout/AppTitle';
import TableHeader from 'components/layout/TableHeader';

/**
 * TODO:
 * - Implement total quote logic (using array.reduce)
 * - Migrate state to redux (regular redux or redux toolkit) to avoid props drilling and unnecessary component re-rendering
 * - Implement accumulative total size percentage bar
 * - Implement quote row flash animation when new quote appears (detect prev state)
 * - Fix table css (implement css grid)
 */

function App() {
  const [sellQuotes, setSellQuotes] = useState<IQuote[]>([]);
  const [buyQuotes, setBuyQuotes] = useState<IQuote[]>([]);

  const { sendJsonMessage } = useWebSocket(QUOTES_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processQuotes(event),
  });

  const processQuotes = (event: { data: string }): void => {
    const response = JSON.parse(event.data) as IOrderBookResponse;

    const sellQuotes = modifyQuotes(response.data.asks);
    const buyQuotes = modifyQuotes(response.data.bids);

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
        <hr className='bg-gray opacity-20 my-2' />
        <TableHeader />
        <div className='flex flex-col justify-center gap-y-4'>
          <QuotesList type='SELL' quotes={sellQuotes} />
          <LastPrice />
          <QuotesList type='BUY' quotes={buyQuotes} />
        </div>
      </Container>
    </div>
  );
}

export default App;
