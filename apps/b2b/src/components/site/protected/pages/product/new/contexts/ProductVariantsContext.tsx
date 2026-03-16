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

interface ProductVariantsContextInterface {
  values: Attribute[];
  setValues: Dispatch<SetStateAction<Attribute[]>>;
  onValueChange: (id: number, values: string[]) => void;
}

const ProductVariantsContext = createContext<
  ProductVariantsContextInterface | undefined
>(undefined);

interface ProductVariantsProps {
  children: ReactNode;
}

export const ProductVariantsProvider = ({ children }: ProductVariantsProps) => {
  const [values, setValues] = useState<Attribute[]>([]);

  const onValueChange = useCallback((id: number, newValues: string[]) => {
    setValues((prev) =>
      prev.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              selectedValues: newValues,
            }
          : attr,
      ),
    );
  }, []);

  return (
    <ProductVariantsContext.Provider
      value={{ values, setValues, onValueChange }}
    >
      {children}
    </ProductVariantsContext.Provider>
  );
};

export const useProductVariants = () => {
  const context = useContext(ProductVariantsContext);
  if (!context)
    throw new Error('useVariant must be used within  ProductVariants');
  return context;
};
