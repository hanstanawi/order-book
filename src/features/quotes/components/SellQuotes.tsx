import { useAppSelector } from 'hooks/use-app-selector';
import QuotesList from './QuotesList';

const SellQuotes = () => {
  const sellQuotes = useAppSelector((state) => state.quotes.sellQuotes);
  const maxQuotes = sellQuotes.slice(-8);

  return (
    <>
      <QuotesList quotes={maxQuotes} type='SELL' />
    </>
  );
};

export default SellQuotes;
