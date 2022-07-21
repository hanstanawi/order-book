import useWebSocket from 'react-use-websocket';
import { useEffect } from 'react';

import LastPrice from 'features/trade-history/components/LastPrice';
import SellQuotes from 'features/quotes/components/SellQuotes';
import BuyQuotes from 'features/quotes/components/BuyQuotes';
import Container from 'components/layout/Container';
import AppTitle from 'components/layout/AppTitle';
import TableHeader from 'components/layout/TableHeader';
import Table from 'components/layout/Table';

import { QUOTES_WS_URL } from 'features/quotes/constants';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import {
  addDeltaBuyQuotes,
  addDeltaSellQuotes,
  setQuotesSnapshot,
} from 'features/quotes/slices/quotes.slice';

function App() {
  const dispatch = useAppDispatch();

  const { sendJsonMessage } = useWebSocket(QUOTES_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processQuotes(event),
  });

  const processQuotes = (event: { data: string }): void => {
    const response = JSON.parse(event.data) as IOrderBookResponse;
    if (response.data.type === 'snapshot') {
      dispatch(setQuotesSnapshot(response));
    } else {
      dispatch(addDeltaBuyQuotes(response.data.bids));
      dispatch(addDeltaSellQuotes(response.data.asks));
    }
  };

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      // @ts-ignore
      args: ['update:BTCPFC'],
    });
  }, [sendJsonMessage]);

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gray-800'>
      <Container>
        <AppTitle />
        <hr className='bg-gray opacity-20 my-2' />
        <Table>
          <TableHeader />
          <tbody>
            <SellQuotes />
            <LastPrice />
            <BuyQuotes />
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
