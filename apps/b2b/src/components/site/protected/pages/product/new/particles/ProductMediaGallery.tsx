'use client';

import {
  useCreateOneMediaMutation,
  useDeleteOneMediaMutation,
} from '@/lib/features/product/draft/productMediaApi';
import { useFindMediaQuery } from '@/lib/features/product/media/mediaApi';
import { RootState } from '@/lib/store';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { AspectRatio } from '@repo/ui/components/aspect-ratio';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import { Spinner } from '@repo/ui/components/spinner';
import { ERROR_MESSAGE } from '@repo/ui/constants/defaultMessage';
import { AlertCircleIcon, Grid, SearchIcon, SortAsc } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useProductMedia } from '../contexts/ProductMediaContext';
import ProductMediaUpload from './ProductMediaUpload';

const ProductMediaGallery = () => {
  const { data, isError, isLoading } = useFindMediaQuery();
  const { length, query, onQuery } = useProductMedia();

  console.log(query);

  return (
    <React.Fragment>
      <DialogHeader>
        <DialogTitle>Select file</DialogTitle>
        <DialogDescription />
        <div className="grid grid-cols-2">
          <InputGroup className="justify-self-start">
            <InputGroupInput
              placeholder="Search..."
              onChange={(e) => onQuery({ title: e.target.value })}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <ButtonGroup className="justify-self-end">
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={() => onQuery({ sort: 'price' })}
              >
                <SortAsc />
                Sort
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">
                <Grid />
                Grid
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </DialogHeader>
      <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4 flex flex-col gap-4">
        <ProductMediaUpload />
        <ItemGroup className="grid gap-6 grid-cols-6">
          {length &&
            Array.from({ length: length }).map((_, i: number) => (
              <Item key={i}>
                <ItemHeader>
                  <Skeleton key={i} className="size-full aspect-square" />
                </ItemHeader>
                <ItemContent>
                  <div className="space-y-2">
                    <Skeleton className="h-2 w-10" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </ItemContent>
              </Item>
            ))}
          {isError ? (
            <Alert variant="destructive" className="col-span-full">
              <AlertCircleIcon />
              <AlertTitle>Failed to Load Media</AlertTitle>
              <AlertDescription>
                We couldn&apos;t retrieve your media files at the moment. Please
                refresh the page or try again later.
              </AlertDescription>
            </Alert>
          ) : isLoading ? (
            <React.Fragment>
              {Array.from({ length: 12 }).map((_, i) => (
                <Item key={i}>
                  <ItemHeader>
                    <Skeleton
                      key={i}
                      className="aspect-square w-full rounded-sm"
                    />
                  </ItemHeader>
                  <ItemContent>
                    <div className="space-y-2">
                      <Skeleton className="h-2 w-10" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </ItemContent>
                </Item>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {data?.payload.media?.map((item, i) => (
                <Item key={i} className="relative hover:bg-muted group">
                  <ItemHeader className="relative">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="aspect-square w-full rounded-sm object-cover"
                      />
                    </AspectRatio>
                    <MediaAction isSelected={item.isSelected} id={item._id} />
                  </ItemHeader>
                  <ItemContent>
                    <ItemDescription>{item.format}</ItemDescription>
                    <ItemTitle className="line-clamp-1">{item.alt}</ItemTitle>
                  </ItemContent>
                  <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100" />
                </Item>
              ))}
            </React.Fragment>
          )}
        </ItemGroup>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </React.Fragment>
  );
};

const MediaAction = ({
  isSelected,
  id,
}: {
  isSelected: boolean;
  id: string;
}) => {
  const payload = useSelector((store: RootState) => store.draft.payload);

  const [createOneMedia, { isLoading: isLoading1 }] =
    useCreateOneMediaMutation();
  const [deleteOneMedia, { isLoading: isLoading2 }] =
    useDeleteOneMediaMutation();

  const request = {
    productId: payload?._id,
    mediaId: id,
  };

  const toggle = async (value: boolean) => {
    await toast.promise(
      value
        ? createOneMedia(request).unwrap()
        : deleteOneMedia(request).unwrap(),
      { error: (err) => err?.data?.message || ERROR_MESSAGE },
    );
  };

  return (
    <div className="absolute top-2 left-2 z-20">
      {isLoading1 || isLoading2 ? (
        <Spinner />
      ) : (
        <Checkbox
          checked={isSelected}
          onCheckedChange={toggle}
          disabled={isLoading1 || isLoading2}
        />
      )}
    </div>
  );
};

export default ProductMediaGallery;
