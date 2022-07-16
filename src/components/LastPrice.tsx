import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import useWebSocket from 'react-use-websocket';

const LastPrice = () => {
  const LAST_PRICE_WS_URL = 'wss://ws.btse.com/ws/futures';
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
    const response = JSON.parse(event.data);

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
        'mx-auto text-default-white font-semibold py-2',
        priceState === 'HIGHER' ? 'text-buy-green' : '',
        priceState === 'LOWER' ? 'text-sell-red' : ''
      )}
    >
      {lastPrice}
    </div>
  );
};

export default LastPrice;
