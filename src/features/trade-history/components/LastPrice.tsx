import { useEffect } from 'react';
import cx from 'classnames';
import useWebSocket from 'react-use-websocket';

import ArrowIcon from 'components/icons/ArrowIcon';
import { formatPrice } from 'helpers/number.helpers';
import { LAST_PRICE_WS_URL } from '../constants';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { useAppSelector } from 'hooks/use-app-selector';
import { setLastPrice } from '../slices/trade-history.slice';

const LastPrice = () => {
  const dispatch = useAppDispatch();
  const { lastPrice, lastPriceState: priceState } = useAppSelector(
    (state) => state.tradeHistory
  );

  const { sendJsonMessage } = useWebSocket(LAST_PRICE_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processLastPrice(event),
  });

  const processLastPrice = (event: { data: string }) => {
    const response = JSON.parse(event.data) as ITradeHistoryResponse;

    if (response.data && response.data.length) {
      dispatch(setLastPrice(response.data[0].price));
    }
  };

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      // @ts-ignore
      args: ['tradeHistoryApi:BTCPFC'],
    });
  }, [sendJsonMessage]);

  return (
    <tr
      className={cx(
        'font-semibold w-full my-2',
        priceState === 'HIGHER' ? 'text-buy-green bg-dark-green' : '',
        priceState === 'LOWER' ? 'text-sell-red bg-dark-red' : '',
        priceState === 'EQUAL' ? 'text-default-white bg-dark-grey' : ''
      )}
    >
      <td colSpan={3}>
        <div className='flex justify-center items-center py-1 gap-x-1'>
          <p>{formatPrice(lastPrice)}</p>
          <div
            className={cx(
              priceState === 'HIGHER' ? 'rotate-180 block' : '',
              priceState === 'LOWER' ? 'block' : '',
              priceState === 'EQUAL' ? 'hidden' : '',
              'flex'
            )}
          >
            <ArrowIcon />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default LastPrice;
