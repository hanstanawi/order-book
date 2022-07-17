import { useAppSelector } from 'hooks/use-app-selector';
import QuotesList from './QuotesList';

const BuyQuotes = () => {
  const buyQuotes = useAppSelector((state) => state.quotes.buyQuotes);
  const maxQuotes = buyQuotes.slice(0, 8);

  return (
    <>
      <QuotesList quotes={maxQuotes} type='BUY' />
    </>
  );
};

export default BuyQuotes;
