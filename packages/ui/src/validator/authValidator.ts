import { z } from 'zod';

const signin = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().nonempty('Password is required'),
  remember: z.boolean().default(false).optional(),
});

const signup = z
  .object({
    familyName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' })
      .max(32, { message: 'First name cannot exceed 32 characters' }),
    givenName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' })
      .max(32, { message: 'Last name cannot exceed 32 characters' }),
    email: z.email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

const verify = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

const email = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
});

const finishPasswordReset = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

const verify2FASignIn = z.object({
  totp: z
    .string()
    .min(6, { message: 'Code must be 6 digits' })
    .max(6, { message: 'Code must be 6 digits' })
    .regex(/^\d{6}$/, { message: 'Invalid verification code' }),
});

const verify2FARecovery = z.object({
  code: z.string(),
});

const startEmailChange = z
  .object({
    newEmail: z.email('Enter a valid email address'),
    confirmEmail: z.email('Enter a valid email address'),
    password: z.string().nonempty('Password is required'),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Emails do not match',
  });

const finishEmailChange = z.object({
  code: z.string(),
});

const changePassword = z
  .object({
    currentPassword: z.string().nonempty('Current password is required'),
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

const finish2FASetup = z.object({
  totp: z
    .string()
    .length(6, { message: 'Code must be exactly 6 digits' })
    .regex(/^\d{6}$/, { message: 'Invalid code format. Must be 6 digits.' }),
});

const profile = z.object({
  profile: z.object({
    familyName: z.string().nonempty('Family name is required'),
    givenName: z.string().nonempty('Given name is required'),
  }),
});

const avatar = z.object({
  img: z
    .custom<File>()
    .refine((file) => file instanceof File, 'File is required')
    .refine(
      (file) => file.type.startsWith('image/'),
      'Only image files are allowed (jpg, png, etc.)',
    ),
});

export const authValidator = {
  signin,
  signup,
  verify,
  email,
  finishPasswordReset,
  verify2FARecovery,
  startEmailChange,
  finishEmailChange,
  changePassword,
  finish2FASetup,
  verify2FASignIn,
  profile,
  avatar,
} as const;
