import { useMarkets } from "./useMarket";

export function useMarketCheck() {
  const { data: markets, isLoading } = useMarkets();
  const hasMarket = markets && markets.length > 0;
  const myMarket = hasMarket ? markets[0] : null;

  return { hasMarket, myMarket, isLoading };
}
