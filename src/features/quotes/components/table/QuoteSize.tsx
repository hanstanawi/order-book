import cx from 'classnames';
import { useEffect, useState, useRef } from 'react';

import usePrevious from 'features/quotes/hooks/use-previous';
import { formatNumber } from 'helpers/number.helpers';

type QuoteSizeProps = {
  quoteSize: number;
};

const QuoteSize = ({ quoteSize }: QuoteSizeProps) => {
  const prevQuoteSize = usePrevious<number>(quoteSize);
  const prevQuote = useRef(0);
  const [sizeState, setSizeState] = useState<'HIGHER' | 'LOWER' | null>(null);

  useEffect(() => {
    prevQuote.current = quoteSize;
    if (quoteSize > prevQuote.current) {
      setSizeState('LOWER');
    } else if (quoteSize < prevQuote.current) {
      setSizeState('HIGHER');
    } else {
      setSizeState(null);
    }
  }, [quoteSize]);

  return (
    <td
      className={cx(
        'text-default-white',
        sizeState === 'LOWER' ? 'bg-flash-red' : '',
        sizeState === 'HIGHER' ? 'bg-flash-green' : ''
      )}
    >
      <div>{formatNumber(quoteSize)}</div>
      {/* {prevQuote.current} */}
    </td>
  );
};

export default QuoteSize;
