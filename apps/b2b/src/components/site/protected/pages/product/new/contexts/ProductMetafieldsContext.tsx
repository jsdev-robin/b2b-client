'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface Metafields {
  name: string;
  values: string[];
}

interface ProductMetafieldsContextInterface {
  values: Metafields[];
  addMetaField: (field: Metafields) => void;
}

const ProductMetafieldsContext = createContext<
  ProductMetafieldsContextInterface | undefined
>(undefined);

export const ProductMetafieldsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [values, setValues] = useState<Metafields[]>([]);

  const addMetaField = (field: Metafields) => {
    setValues((prev) => {
      if (field.values.length === 0) {
        return prev.filter((v) => v.name !== field.name);
      }
      const index = prev.findIndex((v) => v.name === field.name);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = field;
        return updated;
      }

      return [...prev, field];
    });
  };

  console.log(values);

  return (
    <ProductMetafieldsContext.Provider value={{ values, addMetaField }}>
      {children}
    </ProductMetafieldsContext.Provider>
  );
};

export const useProductMetafields = () => {
  const context = useContext(ProductMetafieldsContext);
  if (!context)
    throw new Error(
      'useProductMetafields must be used within ProductMetafieldsProvider',
    );
  return context;
};
