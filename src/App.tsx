import useWebSocket from 'react-use-websocket';
import { useCallback } from 'react';

import LastPrice from 'features/trade-history/components/LastPrice';
import SellQuotes from 'features/quotes/components/SellQuotes';
import BuyQuotes from 'features/quotes/components/BuyQuotes';
import Container from 'components/layout/Container';
import AppTitle from 'components/layout/AppTitle';
import TableHeader from 'components/layout/TableHeader';

import { QUOTES_WS_URL } from 'features/quotes/constants';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import {
  setBuyQuotesHandler,
  setSellQuotesHandler,
} from 'features/quotes/slices/quotes.slice';

/**
 * TODO:
 * - Fix table css (implement css grid)
 * - Add flash css animation
 * - Implement quote row flash animation when new quote appears (detect prev state)
 * - Implement quote size color change
 */

function App() {
  const dispatch = useAppDispatch();

  const { sendJsonMessage } = useWebSocket(QUOTES_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processQuotes(event),
  });

  const processQuotes = (event: { data: string }): void => {
    const response = JSON.parse(event.data) as IOrderBookResponse;
    dispatch(setBuyQuotesHandler(response.data.bids));
    dispatch(setSellQuotesHandler(response.data.asks));
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
          <SellQuotes />
          <LastPrice />
          <BuyQuotes />
        </div>
      </Container>
    </div>
  );
}

export default App;
