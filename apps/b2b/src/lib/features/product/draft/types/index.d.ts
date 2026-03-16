import { SuccessResponse } from '../../types';

export interface ProductMedia {
  src: string;
  alt: string;
  contentType: 'image' | 'video' | string;
  mediaId: string;
}

export interface ProductDraft {
  _id: string;
  status: 'DRAFT';
  adminId: string;
  category: {
    id: string;
    name: string;
  };
  __v: number;
  tags: string[];
  media: ProductMedia[];
}

export interface DraftResponse extends SuccessResponse {
  payload: {
    draft: ProductDraft;
  };
}

export interface Option {
  _id: string;
  storeId: string;
  productId: string;
  options: {
    name: string;
    values: {
      name: string;
    }[];
  }[];
  variantStrategy: string;
  createdAt: string;
  updatedAt: string;
}

export interface OptionResponse extends SuccessResponse {
  payload: {
    option: Option;
  };
}

// Product Media
interface OneMediaRequest {
  productId?: string | undefined;
  mediaId: string;
}

interface ManyMediaRequest {
  productId?: string | undefined;
  ids: string[];
}
