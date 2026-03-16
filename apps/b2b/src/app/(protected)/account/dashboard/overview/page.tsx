'use client';

import React from 'react';

type OptionValue = {
  name: string;
  optionId: string;
};

type Variant = {
  price: number;
  compareAtPrice: number;
  optionValues: OptionValue[];
};

const variants: Variant[] = [
  {
    price: 15.99,
    compareAtPrice: 19.99,
    optionValues: [{ name: 'Golden', optionId: 'color' }],
  },
  {
    price: 16.99,
    compareAtPrice: 21.99,
    optionValues: [{ name: 'Silver', optionId: 'color' }],
  },
  {
    price: 17.49,
    compareAtPrice: 22.99,
    optionValues: [{ name: 'Black', optionId: 'color' }],
  },
  {
    price: 15.99,
    compareAtPrice: 19.99,
    optionValues: [
      { name: 'Golden', optionId: 'color' },
      { name: 'Small', optionId: 'size' },
    ],
  },
  {
    price: 18.99,
    compareAtPrice: 24.99,
    optionValues: [
      { name: 'Silver', optionId: 'color' },
      { name: 'Medium', optionId: 'size' },
    ],
  },
  {
    price: 20.99,
    compareAtPrice: 26.99,
    optionValues: [
      { name: 'Black', optionId: 'color' },
      { name: 'Large', optionId: 'size' },
    ],
  },
  {
    price: 16.49,
    compareAtPrice: 20.99,
    optionValues: [
      { name: 'Golden', optionId: 'color' },
      { name: 'Medium', optionId: 'size' },
    ],
  },
  {
    price: 17.99,
    compareAtPrice: 23.49,
    optionValues: [
      { name: 'Silver', optionId: 'color' },
      { name: 'Small', optionId: 'size' },
    ],
  },
  {
    price: 21.49,
    compareAtPrice: 27.99,
    optionValues: [
      { name: 'Black', optionId: 'color' },
      { name: 'Medium', optionId: 'size' },
    ],
  },
  {
    price: 22.99,
    compareAtPrice: 29.99,
    optionValues: [
      { name: 'Black', optionId: 'color' },
      { name: 'Small', optionId: 'size' },
    ],
  },
];
function groupByOption<T extends { optionValues: OptionValue[] }>(
  variants: T[],
  optionId: string,
): Record<string, T[]> {
  return variants.reduce(
    (acc, variant) => {
      const option = variant.optionValues.find((o) => o.optionId === optionId);
      if (!option) return acc;
      acc[option.name] = acc[option.name] || [];
      acc[option.name].push(variant);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

const Home: React.FC = () => {
  const grouped = groupByOption(variants, 'color');
  console.log(grouped);

  return <div>Home</div>;
};

export default Home;
