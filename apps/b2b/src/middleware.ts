import { ROLE_COOKIES } from '@repo/ui/constants/cookie';
import { ROLE } from '@repo/ui/constants/role';
import SessionManager from '@repo/ui/lib/SessionManager';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const route = {
  path: {
    protected: {
      user: ['/account'],
    },
    public: [
      '/sign-in',
      '/sign-in/verify-2fa',
      '/sign-up',
      '/verify',
      '/forgot-password',
      '/reset-password',
    ],
  },
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const utils = new SessionManager();

  const isProtectedRoute = route.path.protected.user.some((p) =>
    path.startsWith(p),
  );
  const isPublicRoute = route.path.public.includes(`${path}`);

  const cookie = (await cookies()).get(ROLE_COOKIES.SUPER_ADMIN.REFRESH)?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  if (isProtectedRoute && (!session || session.role !== ROLE.SUPER_ADMIN)) {
    await utils.deleteSession(ROLE_COOKIES.SUPER_ADMIN.ACCESS);
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (isPublicRoute && session && session.role === ROLE.SUPER_ADMIN) {
    return NextResponse.redirect(
      new URL('/account/dashboard/overview', req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
