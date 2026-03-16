import debounce from 'lodash.debounce';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface Query {
  [field: string]: string;
}

interface ProductMediaContext {
  length: number | undefined;
  setLength: Dispatch<SetStateAction<number | undefined>>;
  ids: string[];
  toggleId: (id: string) => void;
  clear: () => void;
  query: Query;
  onQuery: ReturnType<typeof debounce>;
}

const ProductMediaContext = createContext<ProductMediaContext | undefined>(
  undefined,
);

interface ProductMediaProviderProps {
  children: ReactNode;
}

export const ProductMediaProvider = ({
  children,
}: ProductMediaProviderProps) => {
  const [length, setLength] = useState<number | undefined>(undefined);
  const [ids, setIds] = useState<string[]>([]);
  const [query, setQuery] = useState<Query>({});
  const toggleId = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  const onQuery = useMemo(
    () =>
      debounce((updates: Partial<Query>) => {
        setQuery((prev) => ({ ...prev, ...updates }) as Query);
      }, 500),
    [setQuery],
  );

  return (
    <ProductMediaContext.Provider
      value={{
        length,
        setLength,
        ids,
        toggleId,
        clear,
        query,
        onQuery,
      }}
    >
      {children}
    </ProductMediaContext.Provider>
  );
};

export const useProductMedia = (): ProductMediaContext => {
  const context = useContext(ProductMediaContext);
  if (!context)
    throw new Error('useProductMedia must be used within ProductMediaProvider');
  return context;
};
