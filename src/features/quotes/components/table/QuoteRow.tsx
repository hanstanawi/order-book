import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import QuoteSize from './columns/QuoteSize';
import QuoteTotal from './columns/QuoteTotal';
import QuotePrice from './columns/QuotePrice';
import { useAppSelector } from 'hooks/use-app-selector';

type QuoteRowProps = {
  quote: IQuoteWithTotal;
  type: QuoteType;
};

const QuoteRow = ({ quote, type }: QuoteRowProps) => {
  const [flash, setFlash] = useState<boolean>(false);
  const buyQuotes = useAppSelector((state) => state.quotes.buyQuotes);
  const sellQuotes = useAppSelector((state) => state.quotes.sellQuotes);
  const prevQuotes = useRef<IQuoteWithTotal[]>();

  const currentQuotesList = type === 'BUY' ? buyQuotes : sellQuotes;

  useEffect(() => {
    const foundQuote = prevQuotes?.current?.find((q) => {
      return q.price === quote.price;
    });
    if (!foundQuote) {
      setFlash(true);
    } else {
      setFlash(false);
    }
    prevQuotes.current = currentQuotesList;
  }, [quote, currentQuotesList]);

  const bgClass = type === 'BUY' ? 'bg-flash-green' : 'bg-flash-red';

  return (
    <tr
      className={cx(
        'px-3 font-medium text-sm hover:bg-navy-blue py-0.5',
        flash ? bgClass : ''
      )}
    >
      <QuotePrice price={quote.price} type={type} />
      <QuoteSize quote={quote} />
      <QuoteTotal quoteTotal={quote.total} type={type} />
    </tr>
  );
};

export default QuoteRow;
