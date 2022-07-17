import QuoteRow from './table/QuoteRow';
import {
  calculateQuotesTotal,
  sortQuotesPrice,
} from '../helpers/quotes.helpers';

type QuotesListProps = {
  quotes: IQuote[];
  type: 'BUY' | 'SELL';
};

const QuotesList = ({ quotes, type }: QuotesListProps) => {
  const shownQuotes = quotes.slice(0, 8);
  const sortedQuotes = sortQuotesPrice(
    shownQuotes,
    type === 'SELL' ? 'DESC' : 'ASC'
  );
  const quotesWithTotal = calculateQuotesTotal(sortedQuotes);

  return (
    <ul className='h-full flex flex-col justify-center'>
      {quotesWithTotal.map((quote, i) => (
        <QuoteRow key={i} quote={quote} type={type} />
      ))}
    </ul>
  );
};

export default QuotesList;
