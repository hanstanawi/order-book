import { formatNumber } from 'helpers/number.helpers';
import { useAppSelector } from 'hooks/use-app-selector';

type TotalQuoteProps = {
  quoteTotal: number;
  type: QuoteType;
};

const TotalQuote = ({ quoteTotal, type }: TotalQuoteProps) => {
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
    <td className='text-default-white flex justify-end'>
      <div
        style={{
          backgroundColor: `${
            type === 'BUY'
              ? 'rgba(16, 186, 104, 0.12)'
              : 'rgba(255, 90, 90, 0.12)'
          }`,
          width: `${widthPercentage}%`,
        }}
        className='flex justify-end'
      >
        {formatNumber(quoteTotal)}
      </div>
    </td>
  );
};

export default TotalQuote;
