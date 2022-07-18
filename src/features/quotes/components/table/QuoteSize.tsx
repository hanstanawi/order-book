import cx from 'classnames';
import { useEffect, useState } from 'react';

import usePrevious from 'features/quotes/hooks/use-previous';
import { formatNumber } from 'helpers/number.helpers';

type QuoteSizeProps = {
  quoteSize: number;
};

const QuoteSize = ({ quoteSize }: QuoteSizeProps) => {
  const prevQuoteSize = usePrevious<number>(quoteSize);
  const [sizeState, setSizeState] = useState<'HIGHER' | 'LOWER' | null>(null);

  useEffect(() => {
    if (prevQuoteSize) {
      if (prevQuoteSize > quoteSize) {
        setSizeState('LOWER');
      } else {
        setSizeState('HIGHER');
      }
    }
  }, [quoteSize, prevQuoteSize]);

  return (
    <td
      className={cx(
        'text-default-white',
        sizeState && sizeState === 'HIGHER' ? 'bg-flash-red' : '',
        sizeState && sizeState === 'LOWER' ? 'bg-flash-green' : ''
      )}
    >
      {formatNumber(quoteSize)}
    </td>
  );
};

export default QuoteSize;
