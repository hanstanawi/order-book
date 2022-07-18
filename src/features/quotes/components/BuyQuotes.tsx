import { useAppSelector } from 'hooks/use-app-selector';
import QuotesList from './QuotesList';

const BuyQuotes = () => {
  const buyQuotes = useAppSelector((state) => state.quotes.buyQuotes);

  return (
    <>
      <QuotesList quotes={buyQuotes} type='BUY' />
    </>
  );
};

export default BuyQuotes;
