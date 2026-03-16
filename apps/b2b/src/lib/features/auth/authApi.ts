// guides: https://redux-toolkit.js.org/rtk-query/overview

import { gatewayApi } from '../api/gatewayApi';
import { SuccessResponse } from '../types';
import { signup } from './authSlice';
import {
  ChangePasswordRequest,
  DisconnectOauthRequest,
  EmailRequest,
  FindBackupCodes2FAResponse,
  FindPasskeysResponse,
  FindProfileResponse,
  FindSessionsResponse,
  Finish2FASetupRequestRequest,
  FinishEmailChangeRequest,
  FinishPasswordResetRequest,
  GenerateAuthenticationOptionsResponse,
  GenerateRegistrationOptionsResponse,
  Handshake2FARequest,
  HandshakeBackupCode2FARequest,
  SignupResponse,
  SinginRequest,
  SinginResponse,
  SingupRequest,
  StartEmailChangeRequest,
  StartEnabled2FAResponse,
  StartPasswordResetRequest,
  UpdateProfileRequest,
  VerifyAuthenticationResponseRquest,
  VerifyRegistrationResponseRequest,
  VerifyRequest,
} from './types';

export const userAuthApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SingupRequest>({
      query: (body) => ({
        url: '/auth/store/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signup({ token: data.payload.token }));
        } catch (error) {
          console.log('Signup error:', error);
        }
      },
    }),

    verify: builder.mutation<SuccessResponse, VerifyRequest>({
      query: ({ token, otp }) => ({
        url: '/auth/store/signup/verify',
        method: 'POST',
        body: { token, otp },
      }),
    }),

    signin: builder.mutation<SinginResponse, SinginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/auth/store/signin',
        method: 'POST',
        body: { email, password, remember },
      }),
    }),

    signout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/store/signout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    signoutSession: builder.mutation<SuccessResponse, string>({
      query: (token) => ({
        url: `/auth/store/signout/${token}`,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    signoutAllSession: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/store/signout-all',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    refreshToken: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/store/refresh-token',
        method: 'POST',
      }),
    }),

    findProfile: builder.query<FindProfileResponse, void>({
      query: () => '/auth/store/profile',
      providesTags: ['User'],
    }),

    findSessions: builder.query<FindSessionsResponse, void>({
      query: () => ({
        url: '/auth/store/sessions',
        method: 'GET',
      }),
      providesTags: ['Sessions'],
    }),

    updateProfile: builder.mutation<SuccessResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: '/auth/store/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateAavatar: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: '/storage/avatar',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    generateAuthenticationOptions: builder.mutation<
      GenerateAuthenticationOptionsResponse,
      EmailRequest
    >({
      query: ({ email }) => ({
        url: '/auth/store/passkey/authentication/start',
        method: 'POST',
        body: { email },
      }),
    }),

    verifyAuthenticationResponse: builder.mutation<
      SuccessResponse,
      VerifyAuthenticationResponseRquest
    >({
      query: ({ credential, email }) => ({
        url: '/auth/store/passkey/authentication/finish',
        method: 'POST',
        body: { credential, email },
      }),
    }),

    generateRegistrationOptions: builder.mutation<
      GenerateRegistrationOptionsResponse,
      void
    >({
      query: () => ({
        url: '/auth/store/passkey/registration/start',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    verifyRegistrationResponse: builder.mutation<
      SuccessResponse,
      VerifyRegistrationResponseRequest
    >({
      query: ({ credential }) => ({
        url: '/auth/store/passkey/registration/finish',
        method: 'POST',
        body: { credential },
      }),
      invalidatesTags: ['User', 'Passkeys'],
    }),

    findPasskeys: builder.query<FindPasskeysResponse, void>({
      query: () => '/auth/store/passkeys',
      providesTags: ['Passkeys'],
    }),

    unregisterPasskey: builder.mutation<void, string>({
      query: (id) => ({
        url: `/auth/store/passkeys/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Passkeys', 'User'],
    }),

    startPasswordReset: builder.mutation<
      SinginResponse,
      StartPasswordResetRequest
    >({
      query: ({ email }) => ({
        url: '/auth/store/password/reset/start',
        method: 'POST',
        body: { email },
      }),
    }),

    finishPasswordReset: builder.mutation<
      SinginResponse,
      FinishPasswordResetRequest
    >({
      query: ({ newPassword, confirmNewPassword, token }) => ({
        url: `/auth/store/password/reset/finish/${token}`,
        method: 'PATCH',
        body: { newPassword, confirmNewPassword },
      }),
    }),

    changePassword: builder.mutation<SinginResponse, ChangePasswordRequest>({
      query: ({ currentPassword, newPassword, confirmNewPassword }) => ({
        url: '/auth/store/password/change',
        method: 'PATCH',
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),

    startEmailChange: builder.mutation<SinginResponse, StartEmailChangeRequest>(
      {
        query: ({ newEmail, confirmEmail, password }) => ({
          url: '/auth/store/email/change/start',
          method: 'POST',
          body: { newEmail, confirmEmail, password },
        }),
      },
    ),

    finishEmailChange: builder.mutation<
      SinginResponse,
      FinishEmailChangeRequest
    >({
      query: ({ code, token }) => ({
        url: `/auth/store/email/change/finish/${token}`,
        method: 'PATCH',
        body: { code },
      }),
      invalidatesTags: ['User'],
    }),

    disconnectOauth: builder.mutation<SinginResponse, DisconnectOauthRequest>({
      query: ({ email, provider }) => ({
        url: '/auth/store/disconnect/oauth',
        method: 'PATCH',
        body: { email, provider },
      }),
      invalidatesTags: ['User'],
    }),

    startEnabled2FA: builder.query<StartEnabled2FAResponse, void>({
      query: () => ({
        url: '/auth/store/2fa/enabled/start',
        method: 'GET',
      }),
    }),

    finishEnabled2FA: builder.mutation<
      SinginResponse,
      Finish2FASetupRequestRequest
    >({
      query: ({ totp, secret }) => ({
        url: '/auth/store/2fa/enabled/finish',
        method: 'PATCH',
        body: { totp, secret },
      }),
      invalidatesTags: ['User', 'BackupCodes'],
    }),

    handshake2FA: builder.mutation<SuccessResponse, Handshake2FARequest>({
      query: ({ totp }) => ({
        url: '/auth/store/2fa/handshake/app',
        method: 'POST',
        body: { totp },
      }),
    }),

    generateBackupCodes2FA: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/store/2fa/backup-codes',
        method: 'PATCH',
      }),
      invalidatesTags: ['BackupCodes'],
    }),

    findBackupCodes2FA: builder.query<FindBackupCodes2FAResponse, void>({
      query: () => ({
        url: '/auth/store/2fa/backup-codes',
        method: 'GET',
      }),

      providesTags: ['BackupCodes'],
    }),

    handshakeBackupCode2FA: builder.mutation<
      SuccessResponse,
      HandshakeBackupCode2FARequest
    >({
      query: (data) => ({
        url: '/auth/store/2fa/handshake/recovery',
        method: 'POST',
        body: data,
      }),
    }),

    disabled2FA: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: `/auth/store/2fa/disabled`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User', 'BackupCodes'],
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyMutation,
  useSigninMutation,
  useSignoutMutation,
  useSignoutSessionMutation,
  useSignoutAllSessionMutation,
  useRefreshTokenMutation,
  useFindProfileQuery,
  useFindSessionsQuery,
  useUpdateProfileMutation,
  useUpdateAavatarMutation,
  useGenerateAuthenticationOptionsMutation,
  useVerifyAuthenticationResponseMutation,
  useGenerateRegistrationOptionsMutation,
  useVerifyRegistrationResponseMutation,
  useFindPasskeysQuery,
  useUnregisterPasskeyMutation,
  useStartPasswordResetMutation,
  useFinishPasswordResetMutation,
  useChangePasswordMutation,
  useStartEmailChangeMutation,
  useFinishEmailChangeMutation,
  useDisconnectOauthMutation,
  useStartEnabled2FAQuery,
  useFinishEnabled2FAMutation,
  useHandshake2FAMutation,
  useGenerateBackupCodes2FAMutation,
  useFindBackupCodes2FAQuery,
  useHandshakeBackupCode2FAMutation,
  useDisabled2FAMutation,
} = userAuthApi;
