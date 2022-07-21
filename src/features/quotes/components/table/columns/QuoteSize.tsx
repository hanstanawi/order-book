import cx from 'classnames';
import { useEffect, useState, useRef } from 'react';

import { formatNumber } from 'helpers/number.helpers';

type QuoteSizeProps = {
  quote: IQuote;
};

const QuoteSize = ({ quote }: QuoteSizeProps) => {
  const prevQuote = useRef<IQuote>();
  const [sizeState, setSizeState] = useState<'HIGHER' | 'LOWER' | null>(null);

  useEffect(() => {
    // Compare quote size change for a single price
    if (prevQuote?.current?.price === quote.price) {
      if (quote.size > prevQuote.current.size) {
        setSizeState('HIGHER');
      } else if (quote.size < prevQuote.current.size) {
        setSizeState('LOWER');
      } else {
        setSizeState(null);
      }
    }
    prevQuote.current = quote;
  }, [quote]);

  return (
    <td
      className={cx(
        'text-default-white text-end',
        sizeState === 'LOWER' ? 'bg-flash-red' : '',
        sizeState === 'HIGHER' ? 'bg-flash-green' : ''
      )}
    >
      <p>{formatNumber(quote.size)}</p>
    </td>
  );
};

export default QuoteSize;
