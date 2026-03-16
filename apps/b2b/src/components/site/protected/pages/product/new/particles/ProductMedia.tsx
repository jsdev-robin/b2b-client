'use client';

import { RootState } from '@/lib/store';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';

import { useProductForm } from '../contexts/ProductFormContext';
import ProductMediaGallery from './ProductMediaGallery';
import ProductMediaItem from './ProductMediaItem';

const ProductMedia = () => {
  const media = useSelector((store: RootState) => store.draft.payload?.media);
  const { form } = useProductForm();

  return (
    <div className="grid gap-4 grid-cols-6">
      {Array.isArray(media) && (
        <DragDropProvider
          key={media.map((m) => m.mediaId).join('-') || 'empty'}
          onDragStart={() => {
            form.setValue('media', media);
          }}
          onDragEnd={(event) => {
            form.setValue(
              'media',
              move(
                media.map((m) => m.mediaId),
                event,
              ).map(
                (id) =>
                  media.find((m) => m.mediaId === id) as (typeof media)[number],
              ),
            );
          }}
        >
          {media.map((item, i) => (
            <ProductMediaItem key={item.mediaId} media={item} index={i} />
          ))}
        </DragDropProvider>
      )}
      <Dialog>
        <DialogTrigger asChild>
          {Array.isArray(media) && media.length > 0 && media.length < 10 ? (
            <div className="rounded-lg aspect-square flex items-center justify-center border border-dashed">
              <Button size="icon" variant="ghost">
                <Plus />
              </Button>
            </div>
          ) : media?.length === 0 ? (
            <div className="h-40 w-full border border-dashed rounded-xl flex items-center justify-center col-span-full">
              <div className="text-center flex flex-col items-center justify-center h-full gap-2">
                <Button size="xs" variant="secondary">
                  Select existing
                </Button>
                <span className="text-xs text-muted-foreground">
                  Accepts images, videos, or 3D models
                </span>
              </div>
            </div>
          ) : null}
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <ProductMediaGallery />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductMedia;
