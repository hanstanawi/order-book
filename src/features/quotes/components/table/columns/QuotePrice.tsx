import cx from 'classnames';

import { formatPrice } from 'helpers/number.helpers';

type QuotePriceProps = {
  price: number;
  type: QuoteType;
};

const QuotePrice = ({ price, type }: QuotePriceProps) => {
  return (
    <td
      className={cx(
        type === 'SELL' ? 'text-sell-red' : 'text-buy-green',
        'text-start px-3'
      )}
    >
      <p className='text-sm'>{formatPrice(price)}</p>
    </td>
  );
};

export default QuotePrice;
