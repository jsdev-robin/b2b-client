export interface Category {
  id: string;
  level: string;
  full_name: string;
  name: string;
  children: string[];
  attributes: string[];
  return_reasons: string[];
  isRoot: boolean;
  isLeaf: boolean;
}

export interface FindCategoryResponse {
  payload: {
    categories: Category[];
  };
}

export interface Attribute {
  _id: string;
  id: number;
  name: string;
  description: string;
  friendly_id: string;
  handle: string;
  values: string[];
}

export interface FindAttributeResponse {
  payload: {
    attributes: Attribute[];
  };
}

export interface Value {
  id: number;
  name: string;
  friendly_id: string;
  handle: string;
}

export interface FindValueResponse {
  payload: {
    values: Value[];
  };
}

export interface FindHSCodeResponse {
  status: string;
  message: string;
  payload: {
    hscodes: {
      section: string;
      hscode: string;
      description: string;
      parent: string;
      level: number;
      createdAt: string;
      updatedAt: string;
    }[];
    pagination: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  };
}
