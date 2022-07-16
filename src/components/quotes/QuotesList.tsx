import cx from 'classnames';

type QuotesListProps = {
  quotes: IQuote[];
  type: 'BUY' | 'SELL';
};

const QuotesList = ({ quotes, type }: QuotesListProps) => {
  const shownQuotes = quotes.slice(0, 8);
  return (
    <ul className='h-full px-3 flex flex-col justify-center'>
      {shownQuotes.map((quote) => (
        <li className='w-full flex justify-between font-semibold text-sm'>
          <div
            className={cx(type === 'SELL' ? 'text-sell-red' : 'text-buy-green')}
          >
            {quote.price.toLocaleString()}
          </div>
          <div className='text-default-white'>{quote.size}</div>
        </li>
      ))}
    </ul>
  );
};

export default QuotesList;
