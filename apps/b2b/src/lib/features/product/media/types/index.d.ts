import { SuccessResponse } from '../../../types/api-response';

interface Cloudinary {
  signature: string;
  timeout: string;
  timestamp: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  notification_url: string;
}

export interface SignatureResponse extends SuccessResponse {
  payload: {
    cloudinary: Cloudinary;
  };
}

export interface Media {
  _id: string;
  alt: string;
  width: number;
  height: number;
  src: string;
  format: string;
  publicId: string;
  contentType: string;
  duplicateResolutionMode: string;
  adminId: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  isSelected: boolean;
}

export interface MediaResponse extends SuccessResponse {
  payload: {
    media: Media[];
  };
}
