'use client';

import { Attribute } from '@/lib/features/taxonomy/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

interface ProductAttributesContextInterface {
  values: Attribute[];
  handleRemove: (id: string) => void;
  isActive: (id: string) => boolean;
  clear: () => void;
  setValues: Dispatch<SetStateAction<Attribute[]>>;
}

const ProductAttributesContext = createContext<
  ProductAttributesContextInterface | undefined
>(undefined);

export const ProductAttributesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [values, setValues] = useState<Attribute[]>([]);

  const handleRemove = useCallback((id: string) => {
    setValues((prev) => prev.filter((item) => item._id !== id));
  }, []);

  const isActive = useCallback(
    (id: string) => {
      return values.some((item) => item._id === id);
    },
    [values],
  );

  const clear = useCallback(() => {
    setValues([]);
  }, []);

  return (
    <ProductAttributesContext.Provider
      value={{ values, handleRemove, isActive, clear, setValues }}
    >
      {children}
    </ProductAttributesContext.Provider>
  );
};

export const useProductAttributes = () => {
  const context = useContext(ProductAttributesContext);
  if (!context)
    throw new Error(
      'useProductAttributes must be used within ProductAttributesProvider',
    );
  return context;
};
