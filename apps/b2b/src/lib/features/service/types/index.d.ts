import { PaginationState } from '@tanstack/react-table';

export interface ServicesRequest {
  title: string;
  price: string;
  category: string;
  description: string;
  confirmed?: boolean | undefined;
}

export interface Service {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  confirmed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse extends SuccessResponse {
  payload: {
    data: Service[];
    total: number;
  };
}

export interface ServicesQueryParams {
  search?: string;
  pagination: PaginationState;
  sort: string;
  category: string;
}
