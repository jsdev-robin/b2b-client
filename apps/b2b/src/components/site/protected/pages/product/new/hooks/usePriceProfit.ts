import { useMemo } from 'react';

export function usePriceProfit(cost: number, price?: number) {
  return useMemo(() => {
    if (cost === 0) {
      return {
        cost,
        price,
        profit: 0,
        margin: 0,
      };
    }

    const p = price ?? 0;

    const profit = p - cost;
    const margin = p !== 0 ? (profit / p) * 100 : 0;

    return {
      cost,
      price: p,
      profit,
      margin,
    };
  }, [cost, price]);
}
