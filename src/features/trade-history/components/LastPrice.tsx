import { useEffect } from 'react';
import cx from 'classnames';
import useWebSocket from 'react-use-websocket';

import ArrowIcon from 'components/icons/ArrowIcon';
import { formatNumber } from 'helpers/number.helpers';
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
    <div
      className={cx(
        'font-semibold py-1 w-full flex justify-center items-center gap-x-1',
        priceState === 'HIGHER' ? 'text-buy-green bg-dark-green' : '',
        priceState === 'LOWER' ? 'text-sell-red bg-dark-red' : '',
        priceState === 'EQUAL' ? 'text-default-white bg-dark-grey' : ''
      )}
    >
      <p>{formatNumber(lastPrice)}</p>
      <div
        className={cx(
          priceState === 'HIGHER' ? 'rotate-180 block' : '',
          priceState === 'LOWER' ? 'block' : '',
          priceState === 'EQUAL' ? 'hidden' : ''
        )}
      >
        <ArrowIcon />
      </div>
    </div>
  );
};

export default LastPrice;
