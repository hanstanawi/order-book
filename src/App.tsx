import { useCallback, useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import { QUOTES_WS_URL } from 'features/quotes/constants';

import LastPrice from 'features/trade-history/components/LastPrice';
import SellQuotes from 'features/quotes/components/SellQuotes';
import BuyQuotes from 'features/quotes/components/BuyQuotes';
import Container from 'components/layout/Container';
import AppTitle from 'components/layout/AppTitle';
import TableHeader from 'components/layout/TableHeader';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import {
  setBuyQuotesHandler,
  setSellQuotesHandler,
} from 'features/quotes/slices/quotes.slice';
import { modifyQuotes } from 'features/quotes/helpers/quotes.helpers';

/**
 * TODO:
 * - Add arrow svg icon
 * - Add flash css animation
 * - Implement total quote logic (using array.reduce)
 * - Implement accumulative total size percentage bar
 * - Implement quote row flash animation when new quote appears (detect prev state)
 * - Fix table css (implement css grid)
 */

// Reducer
/**
 * 1. Modify quotes transform to be Array<{ price: number, size: number }>
 * 2. Sort quotes based on price
 * 3. Slice quotes to be 8 items
 * 4. Count total of each item in quotes array
 */

function App() {
  const dispatch = useAppDispatch();
  const [sellQuotes, setSellQuotes] = useState<IQuote[]>([]);
  const [buyQuotes, setBuyQuotes] = useState<IQuote[]>([]);

  const { sendJsonMessage } = useWebSocket(QUOTES_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processQuotes(event),
  });

  const processQuotes = (event: { data: string }): void => {
    const response = JSON.parse(event.data) as IOrderBookResponse;
    dispatch(setBuyQuotesHandler(response.data.bids));
    dispatch(setSellQuotesHandler(response.data.asks));

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
          <SellQuotes />
          <LastPrice />
          <BuyQuotes />
        </div>
      </Container>
    </div>
  );
}

export default App;
