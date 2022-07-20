import { formatNumber } from 'helpers/number.helpers';
import { useAppSelector } from 'hooks/use-app-selector';

type QuoteTotalProps = {
  quoteTotal: number;
  type: QuoteType;
};

const QuoteTotal = ({ quoteTotal, type }: QuoteTotalProps) => {
  const buyTotal = useAppSelector((state) => {
    const buyQuotesList = state.quotes.buyQuotes;
    return buyQuotesList[buyQuotesList.length - 1].total;
  });

  const sellTotal = useAppSelector((state) => {
    const sellQuotesList = state.quotes.sellQuotes;
    return sellQuotesList[0].total;
  });

  const totalQuote = type === 'BUY' ? buyTotal : sellTotal;
  const widthPercentage = (100 * quoteTotal) / totalQuote;

  return (
    <td className='text-default-white w-full px-3 relative inline-block overflow-hidden'>
      <div
        style={{
          backgroundColor: `${
            type === 'BUY'
              ? 'rgba(16, 186, 104, 0.12)'
              : 'rgba(255, 90, 90, 0.12)'
          }`,
          width: `${widthPercentage}%`,
        }}
        className=' absolute top-0 right-0 h-full my-0.5'
      />
      <p className='text-end'>{formatNumber(quoteTotal)}</p>
    </td>
  );
};

export default QuoteTotal;
