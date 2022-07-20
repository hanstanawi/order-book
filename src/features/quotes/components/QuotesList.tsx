import QuoteRow from './table/QuoteRow';

type QuotesListProps = {
  quotes: IQuoteWithTotal[];
  type: QuoteType;
};

const QuotesList = ({ quotes, type }: QuotesListProps) => {
  return (
    <>
      {quotes.map((quote, i) => (
        <QuoteRow key={i} quote={quote} type={type} />
      ))}
    </>
  );
};

export default QuotesList;
