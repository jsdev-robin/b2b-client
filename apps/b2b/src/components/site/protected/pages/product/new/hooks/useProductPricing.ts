import { useMemo } from 'react';

const unitFactors: Record<string, { base: string; factor: number }> = {
  MG: { base: 'G', factor: 0.001 },
  G: { base: 'G', factor: 1 },
  KG: { base: 'G', factor: 1000 },
  OZ: { base: 'G', factor: 28.3495 },
  LB: { base: 'G', factor: 453.592 },

  ML: { base: 'ML', factor: 1 },
  CL: { base: 'ML', factor: 10 },
  L: { base: 'ML', factor: 1000 },
  FLOZ: { base: 'ML', factor: 29.5735 },
  PT: { base: 'ML', factor: 473.176 },
  QT: { base: 'ML', factor: 946.353 },
  GAL: { base: 'ML', factor: 3785.41 },

  MM: { base: 'MM', factor: 1 },
  CM: { base: 'MM', factor: 10 },
  M: { base: 'MM', factor: 1000 },
  IN: { base: 'MM', factor: 25.4 },
  FT: { base: 'MM', factor: 304.8 },
  YD: { base: 'MM', factor: 914.4 },

  M2: { base: 'M2', factor: 1 },
  FT2: { base: 'M2', factor: 0.092903 },
  M3: { base: 'M3', factor: 1 },

  ITEM: { base: 'ITEM', factor: 1 },
  UNKNOWN: { base: 'UNKNOWN', factor: 1 },
};

type Params = {
  price: number;
  cost: number;
  quantityValue: number;
  quantityUnit: string;
  referenceValue: number;
  referenceUnit: string;
};

export function useProductPricing({
  price,
  cost,
  quantityValue,
  quantityUnit,
  referenceValue,
  referenceUnit,
}: Params) {
  return useMemo(() => {
    const q = unitFactors[quantityUnit];
    const r = unitFactors[referenceUnit];

    let unitPrice = 0;

    if (q && r && q.base === r.base) {
      const quantityBase = quantityValue * q.factor;
      const referenceBase = referenceValue * r.factor;

      if (quantityBase > 0 && referenceBase > 0) {
        unitPrice = (price / quantityBase) * referenceBase;
      }
    }

    unitPrice = Number(unitPrice.toFixed(2));

    const totalPrice = price;
    const totalCost = cost;

    const profit = totalPrice - totalCost;

    const margin =
      totalPrice > 0 ? Number(((profit / totalPrice) * 100).toFixed(2)) : 0;

    return {
      totalPrice,
      totalCost,
      profit,
      margin,
      unitPrice,
    };
  }, [price, cost, quantityValue, quantityUnit, referenceValue, referenceUnit]);
}
