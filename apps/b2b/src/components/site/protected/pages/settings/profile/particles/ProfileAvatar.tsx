'use client';

import useMe from '@/cache/useMe';
import { useUpdateAavatarMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import { Form } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';
import { Spinner } from '@repo/ui/components/spinner';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { obj2Form } from '@repo/ui/utils/obj2Form';
import { authValidator } from '@repo/ui/validator/authValidator';
import { useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useForm, useWatch } from 'react-hook-form';
import { useMuntahaDrop } from 'react-muntaha-uploader';
import { toast } from 'sonner';
import z from 'zod';

const ProfileAvatar = () => {
  const me = useMe();
  const [updateAvatar, { isLoading }] = useUpdateAavatarMutation();
  const cropperRef = useRef<ReactCropperElement>(null);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  const form = useForm<z.infer<typeof authValidator.avatar>>({
    resolver: zodResolver(authValidator.avatar),
    mode: 'onChange',
    defaultValues: {
      img: undefined,
    },
  });

  const { getRootProps, getInputProps, error, utils } = useMuntahaDrop({
    accept: ['image/jpeg', 'image/jpg', 'image/png'],
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (file: File | null) => {
      if (file) {
        setSrc(URL.createObjectURL(file));
        setOpen(true);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.avatar>) {
    await toast.promise(updateAvatar(obj2Form(data)).unwrap(), {
      loading: 'Updating your avatar...',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  }

  const onSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas({ width: 300, height: 400 }).toBlob((blob) => {
        if (blob) {
          form.setValue(
            'img',
            new File([blob], 'avatar.png', { type: 'image/png' }),
            {
              shouldDirty: true,
              shouldValidate: true,
            },
          );
          utils.reset();
          form.handleSubmit(onSubmit)();
        }
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setOpen(false);
        setSrc(null);
      });
    }
  }, [isLoading]);

  const [file] = useWatch({
    control: form.control,
    name: ['img'],
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardAction>
              <Avatar
                className="size-20 cursor-pointer"
                onClick={() => getRootProps().onClick()}
              >
                <AvatarImage
                  src={
                    file ? URL.createObjectURL(file) : me?.profile.avatar?.url
                  }
                  className="object-cover"
                />
                <AvatarFallback>
                  {me?.profile.displayName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Input {...getInputProps()} />
            </CardAction>
            <ItemGroup>
              <Item className="p-0">
                <ItemContent>
                  <ItemTitle>This is your avatar.</ItemTitle>
                  <ItemContent>
                    Click on the avatar to upload a custom one from your files.
                  </ItemContent>
                </ItemContent>
              </Item>
            </ItemGroup>
            <CardDescription>
              An avatar is optional but strongly recommended.
            </CardDescription>
          </CardHeader>
          {error && (
            <CardFooter>
              <CardDescription className="text-destructive">
                {error}
              </CardDescription>
            </CardFooter>
          )}
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-xs">
            <DialogHeader>
              <DialogTitle>Crop avatar</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            {src && (
              <Cropper
                ref={cropperRef}
                src={src}
                style={{ height: 300, width: '100%' }}
                initialAspectRatio={3 / 4}
                guides={false}
                viewMode={1}
                autoCropArea={1}
                background={false}
                responsive
              />
            )}
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSrc(null);
                  utils.reset();
                }}
              >
                Cancel
              </Button>
              <Button onClick={onSave}>
                {isLoading && <Spinner />}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default ProfileAvatar;
