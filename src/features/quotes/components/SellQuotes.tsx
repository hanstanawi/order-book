import { useAppSelector } from 'hooks/use-app-selector';
import QuotesList from './QuotesList';

const SellQuotes = () => {
  const sellQuotes = useAppSelector((state) => state.quotes.sellQuotes);

  return <QuotesList quotes={sellQuotes} type='SELL' />;
};

export default SellQuotes;
