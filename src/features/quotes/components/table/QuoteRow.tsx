import cx from 'classnames';

import QuoteSize from './QuoteSize';
import { formatNumber } from 'helpers/number.helpers';

type QuoteRowProps = {
  quote: IQuote;
  type: 'SELL' | 'BUY';
};

const QuoteRow = ({ quote, type }: QuoteRowProps) => {
  return (
    <tr className='px-3 w-full font-medium text-sm hover:bg-navy-blue py-0.5'>
      <td
        className={cx(
          type === 'SELL' ? 'text-sell-red' : 'text-buy-green',
          'justify-center'
        )}
      >
        {formatNumber(quote.price)}
      </td>
      <QuoteSize quoteSize={quote.size} />
      <td className='text-default-white flex justify-end'>
        {formatNumber(quote.total || 0)}
      </td>
    </tr>
  );
};

export default QuoteRow;
