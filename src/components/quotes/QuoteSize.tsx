import cx from 'classnames';
import { useEffect, useState } from 'react';

import usePrevious from 'hooks/use-previous';

type QuoteSizeProps = {
  quoteSize: number;
};

const QuoteSize = ({ quoteSize }: QuoteSizeProps) => {
  const prevQuoteSize = usePrevious<number>(quoteSize);
  const [sizeState, setSizeState] = useState<'HIGHER' | 'LOWER' | null>(null);
  console.log(sizeState);

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
    <div
      className={cx(
        'text-default-white',
        sizeState && sizeState === 'HIGHER' ? 'bg-flash-red' : '',
        sizeState && sizeState === 'LOWER' ? 'bg-flash-green' : ''
      )}
    >
      {quoteSize}
    </div>
  );
};

export default QuoteSize;
