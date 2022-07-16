import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import useWebSocket from 'react-use-websocket';

import { formatNumber } from 'helpers/number.helpers';
import { LAST_PRICE_WS_URL } from 'constants/websockets.constants';

const LastPrice = () => {
  const [lastPrice, setLastPrice] = useState(0);
  const [priceState, setPriceState] = useState<'HIGHER' | 'LOWER' | 'EQUAL'>(
    'EQUAL'
  );

  const { sendJsonMessage } = useWebSocket(LAST_PRICE_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onMessage: (event) => processLastPrice(event),
  });

  const processLastPrice = (event: { data: string }) => {
    const response = JSON.parse(event.data) as ITradeHistoryResponse;

    if (response.data && response.data.length) {
      setLastPrice((prevState) => {
        const currentPrice = response.data[0].price;
        // TODO: separate function
        if (currentPrice > prevState) {
          setPriceState('HIGHER');
        } else if (currentPrice < prevState) {
          setPriceState('LOWER');
        } else {
          setPriceState('EQUAL');
        }
        return currentPrice;
      });
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
        'font-semibold py-1 w-full flex justify-center items-center',
        priceState === 'HIGHER' ? 'text-buy-green bg-dark-green' : '',
        priceState === 'LOWER' ? 'text-sell-red bg-dark-red' : '',
        priceState === 'EQUAL' ? 'text-default-white bg-dark-grey' : ''
      )}
    >
      {formatNumber(lastPrice)}
      {/* <ArrowIcon fill='red' /> */}
    </div>
  );
};

export default LastPrice;
