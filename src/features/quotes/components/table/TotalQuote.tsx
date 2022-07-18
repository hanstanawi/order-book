import { formatNumber } from 'helpers/number.helpers';
import { useAppSelector } from 'hooks/use-app-selector';

type TotalQuoteProps = {
  quoteTotal: number;
  type: 'BUY' | 'SELL';
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

  const widthPercentage = (100 * quoteTotal) / (totalQuote || 0);

  return (
    <td className='text-default-white flex justify-end'>
      {formatNumber(quoteTotal || 0)}
    </td>
  );
};

export default TotalQuote;
