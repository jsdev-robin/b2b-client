'use client';

import { ProductMedia } from '@/lib/features/product/draft/types';
import { useSortable } from '@dnd-kit/react/sortable';
import { AspectRatio } from '@repo/ui/components/aspect-ratio';
import { Checkbox } from '@repo/ui/components/checkbox';
import { GripVertical } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useProductMedia } from '../contexts/ProductMediaContext';

interface ProductMediaItemProps {
  media: ProductMedia;
  index: number;
}

const ProductMediaItem: React.FC<ProductMediaItemProps> = ({
  media,
  index,
}) => {
  const { ref } = useSortable({
    id: media.mediaId,
    index,
  });

  const { ids, toggleId } = useProductMedia();

  return (
    <div
      className="relative first:col-span-2 first:row-span-2 z-10 group select-none"
      ref={ref}
    >
      <AspectRatio ratio={1 / 1}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          className="aspect-square w-full rounded-sm object-cover"
        />
      </AspectRatio>
      <Checkbox
        className="absolute top-2 left-2 z-20"
        checked={ids.includes(media.mediaId)}
        onCheckedChange={() => toggleId(media.mediaId)}
      />
      <div className="absolute inset-0 bg-black/50 rounded-sm opacity-0 group-hover:opacity-100" />
      <GripVertical className="absolute top-2 right-2 size-4 opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default ProductMediaItem;
