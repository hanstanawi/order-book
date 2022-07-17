import cx from 'classnames';

import QuoteSize from './QuoteSize';
import { formatNumber } from 'helpers/number.helpers';

type QuoteRowProps = {
  quote: IQuote;
  type: 'SELL' | 'BUY';
};

const QuoteRow = ({ quote, type }: QuoteRowProps) => {
  return (
    <li className='w-full font-medium text-sm hover:bg-navy-blue py-0.5'>
      <div className='flex justify-between px-3'>
        <div
          className={cx(
            type === 'SELL' ? 'text-sell-red' : 'text-buy-green',
            'justify-center'
          )}
        >
          {formatNumber(quote.price)}
        </div>
        <QuoteSize quoteSize={quote.size} />
        <div className='text-default-white'>
          {formatNumber(quote.total || 0)}
        </div>
      </div>
    </li>
  );
};

export default QuoteRow;
