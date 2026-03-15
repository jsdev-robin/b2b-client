import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';

class SessionManager {
  cookieName: string;
  maxAge: number;
  rememberMe: boolean;

  constructor(
    cookieName: string = 'session',
    maxAgeDays: number = 7,
    rememberMe: boolean = true,
  ) {
    this.cookieName = cookieName;
    this.maxAge = maxAgeDays * 24 * 60 * 60 * 1000;
    this.rememberMe = rememberMe;
  }

  encrypt = async (
    payload: JWTPayload,
    key: string | undefined,
    expiresAt: Date,
  ) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(key));
  };

  decrypt = async (
    session: string | undefined = '',
    key: string | undefined,
  ) => {
    try {
      const { payload } = await jwtVerify(
        session,
        new TextEncoder().encode(key),
        {
          algorithms: ['HS256'],
        },
      );
      return payload;
    } catch {
      console.log('Failed to verify session');
    }
  };

  deleteSession = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  };
}

export default SessionManager;
