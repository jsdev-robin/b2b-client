import {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/browser';
import { SuccessResponse } from '../../types';
import { Session, User } from './user';

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface EmailRequest {
  email: string;
}

export interface SignupResponse extends SuccessResponse {
  payload: {
    token: string;
  };
}

export interface SingupRequest {
  familyName: string;
  givenName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface FindProfileResponse extends SuccessResponse {
  payload: {
    user: User;
  };
}

export interface FindSessionsResponse extends SuccessResponse {
  payload: {
    sessions: Session[];
  };
}

export interface UpdateProfileRequest {
  profile: {
    familyName: string;
    givenName: string;
  };
}

export interface VerifyRequest {
  token: string;
  otp: number;
}

export interface SinginResponse extends SuccessResponse {
  payload: {
    role: Role;
    enable2fa: boolean;
  };
}

export interface SinginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface GenerateAuthenticationOptionsResponse extends SuccessResponse {
  payload: {
    options: PublicKeyCredentialRequestOptionsJSON;
    email: string;
  };
}

export interface VerifyAuthenticationResponseRquest {
  credential: AuthenticationResponseJSON;
  email: string;
}

export interface GenerateRegistrationOptionsResponse extends SuccessResponse {
  payload: PublicKeyCredentialCreationOptionsJSON;
}

export interface VerifyRegistrationResponseRequest {
  credential: RegistrationResponseJSON;
}

export interface FindPasskeysResponse extends SuccessResponse {
  payload: {
    passkeys: {
      _id: string;
      device: string;
      browser: string;
      formFactor: string;
      createdAt: string;
    }[];
  };
}

export interface StartPasswordResetRequest {
  email: string;
}

export interface FinishPasswordResetRequest {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface StartEmailChangeRequest {
  newEmail: string;
  confirmEmail: string;
  password: string;
}

export interface FinishEmailChangeRequest {
  code: string;
  token: string;
}

export interface DisconnectOauthRequest {
  provider: string;
  email: string;
}

export interface StartEnabled2FAResponse extends SuccessResponse {
  payload: {
    secret: string;
    otpauth_url: string;
    qrcode: string;
  };
}

export interface Finish2FASetupRequestRequest {
  totp: string;
  secret?: string;
}

export interface Handshake2FARequest {
  totp: string;
}

export interface FindBackupCodes2FAResponse extends SuccessResponse {
  payload: {
    codes: string[];
  };
}

export interface HandshakeBackupCode2FARequest {
  code: string;
}
