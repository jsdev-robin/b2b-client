'use client';

import ProductNew from '@/components/site/protected/pages/product/new';
import { productDraftApi } from '@/lib/features/product/draft/productDraftApi';
import { useAppStore } from '@/lib/hooks';
import { useEffect, useRef } from 'react';

const ProductNewPage = () => {
  const store = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(productDraftApi.endpoints.createDraft.initiate());
      store.dispatch(productDraftApi.endpoints.findDraft.initiate());
      initialized.current = true;
    }
  }, [store]);

  return <ProductNew />;
};

export default ProductNewPage;
