'use client';

import { useUploadSingleMutation } from '@/lib/features/product/media/mediaApi';
import { Button } from '@repo/ui/components/button';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { obj2Form } from '@repo/ui/utils/obj2Form';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useProductMedia } from '../contexts/ProductMediaContext';

const ProductMediaUpload = () => {
  const [uploadSingle] = useUploadSingleMutation();
  const { setLength } = useProductMedia();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setLength(acceptedFiles.length);
        const promise = acceptedFiles.map((file) =>
          toast.promise(
            uploadSingle(
              obj2Form({
                img: file,
              }),
            )
              .unwrap()
              .then((res) => {
                setLength(undefined);
                return res;
              }),
            {
              loading: `Uploading ${file.name}...`,
              success: (res) => res?.message || SUCCESS_MESSAGE,
              error: (err) => err?.data?.message || ERROR_MESSAGE,
            },
          ),
        );

        await Promise.all(promise);
      }
    },
    [setLength, uploadSingle],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      // 'video/*': [],
    },
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div
        className="h-40 border border-dashed bg-card rounded-xl text-center flex flex-col items-center justify-center gap-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Button size="xs" variant="secondary">
          Upload new
        </Button>
        <span className="text-xs text-muted-foregorund">
          Accepts images, videos, or 3D models
        </span>
      </div>
    </div>
  );
};

export default ProductMediaUpload;
