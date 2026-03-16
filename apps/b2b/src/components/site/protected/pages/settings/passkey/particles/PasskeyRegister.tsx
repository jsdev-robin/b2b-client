'use client';

import {
  useGenerateRegistrationOptionsMutation,
  useVerifyRegistrationResponseMutation,
} from '@/lib/features/auth/authApi';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { Spinner } from '@repo/ui/components/spinner';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { startRegistration } from '@simplewebauthn/browser';
import { Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { deviceDetect } from 'react-device-detect';
import { toast } from 'sonner';

const PasskeyRegister = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const deviceInfo = deviceDetect(navigator.userAgent);
  const [generateRegistrationOptions, { data, isLoading }] =
    useGenerateRegistrationOptionsMutation();
  const [verifyRegistrationResponse] = useVerifyRegistrationResponseMutation();

  const handleStart = async () => {
    await toast.promise(
      generateRegistrationOptions()
        .unwrap()
        .then((res) => res),
      {
        loading: 'Please wait...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  };

  useEffect(() => {
    if (data?.payload) {
      (async () => {
        try {
          const attestationResponse = await startRegistration({
            optionsJSON: data.payload,
          });

          await toast.promise(
            verifyRegistrationResponse({
              credential: attestationResponse,
            }).unwrap(),
            {
              loading: 'Completing registration...',
              success: (res) => {
                setStep(2);
                return res?.message || SUCCESS_MESSAGE;
              },
              error: (err) => err?.data?.message || ERROR_MESSAGE,
            },
          );
        } catch (error) {
          if (error instanceof DOMException) {
            if (error.name === 'NotAllowedError') return;
            if (error.name === 'SecurityError') {
              toast.error(
                'Passkey setup was cancelled or the domain is invalid',
              );
              return;
            }
          }

          toast.warning('Passkey setup was cancelled');
        }
      })();
    }
  }, [data?.payload, verifyRegistrationResponse, setStep]);

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <Heading as="h5">Register Your Passkey</Heading>
        <p>Follow your device&lsquo;s prompts to complete setup</p>
      </div>
      <div className="space-y-4">
        <Item variant="muted">
          <ItemHeader className="justify-center">
            <ItemMedia variant="icon" className="size-16 rounded-full">
              <Fingerprint className="size-8" />
            </ItemMedia>
          </ItemHeader>
          <ItemContent>
            <ItemTitle className="text-center block w-full">
              {deviceInfo.deviceType === 'mobile'
                ? 'Mobile'
                : deviceInfo.deviceType === 'tablet'
                  ? 'Tablet'
                  : `${deviceInfo.osName} ${deviceInfo.osVersion}`}
            </ItemTitle>
            <ItemDescription className="text-center">
              Click the button below and follow your device&apos;s
              authentication prompt
            </ItemDescription>
          </ItemContent>
          <ItemFooter className="flex-col">
            <Button
              className="w-full"
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              <Fingerprint />
              Register Passkey
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </ItemFooter>
        </Item>
        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Your device will prompt you to authenticate</li>
              <li>Use your fingerprint, face, or PIN</li>
              <li>Your passkey will be securely stored</li>
              <li>You can use it to sign in instantly</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasskeyRegister;
