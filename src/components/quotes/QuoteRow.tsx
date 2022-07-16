import cx from 'classnames';
import { formatNumber } from 'helpers/number.helpers';
import QuoteSize from './QuoteSize';

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
        <div className='text-default-white'>0</div>
      </div>
    </li>
  );
};

export default QuoteRow;
