import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { mobile } = await req.json();

  if (!mobile || String(mobile).length !== 10) {
    return NextResponse.json({ ok: false, error: 'Invalid mobile' }, { status: 400 });
  }

  const token = `sess_${mobile}_${Date.now()}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set('vaultcc_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
