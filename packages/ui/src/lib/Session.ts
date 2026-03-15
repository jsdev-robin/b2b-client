import { cookies } from 'next/headers';
import 'server-only';
import SessionManager from './SessionManager';

const session = new SessionManager();

interface SessionProps {
  cookieName: string;
  key: string | undefined;
}

const Session = async ({ cookieName, key }: SessionProps) => {
  const cookie = (await cookies()).get(cookieName)?.value;
  return session.decrypt(cookie, key);
};

export default Session;
