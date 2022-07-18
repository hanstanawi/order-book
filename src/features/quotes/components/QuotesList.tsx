import QuoteRow from './table/QuoteRow';

type QuotesListProps = {
  quotes: IQuote[];
  type: 'BUY' | 'SELL';
};

const QuotesList = ({ quotes, type }: QuotesListProps) => {
  return (
    <table className='table-auto'>
      <tbody>
        {quotes.map((quote, i) => (
          <QuoteRow key={i} quote={quote} type={type} />
        ))}
      </tbody>
    </table>
  );
};

export default QuotesList;
