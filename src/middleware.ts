import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  res.headers.set('x-vaultcc-mw', 'ON');

  // ✅ Protect app areas
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/cards') ||
    pathname.startsWith('/bills') ||
    pathname.startsWith('/payments') ||
    pathname.startsWith('/rewards') ||
    pathname.startsWith('/pay')
  ) {
    const session = req.cookies.get('vaultcc_session')?.value;

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth';
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
