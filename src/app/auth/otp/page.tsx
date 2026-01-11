'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';

export default function OtpPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const mobile = sp.get('m') ?? '';
  const masked = mobile
    ? `${mobile.slice(0, 2)}******${mobile.slice(-2)}`
    : 'your number';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!mobile || mobile.length !== 10) {
      alert('Mobile number missing. Please go back and try again.');
      router.push('/auth');
      return;
    }

    if (otp.length !== 6) {
      alert('Enter 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // ✅ MOCK OTP for now
      if (otp !== '123456') {
        alert('Invalid OTP (Try 123456)');
        return;
      }

      // ✅ call login API to SET httpOnly cookie
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Login API failed: ${res.status} ${text}`);
      }

      // ✅ important: replace so user can't go back to OTP easily
      router.replace('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 right-6 h-64 w-64 rounded-full bg-vault/20 blur-3xl" />
        <div className="absolute -bottom-20 left-6 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

        <LuxCard className="p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted">OTP Verification</div>
              <h1 className="mt-1 text-2xl font-semibold">Enter OTP</h1>
            </div>
            <div className="text-xs text-muted">{masked}</div>
          </div>

          <p className="mt-4 text-sm text-muted leading-relaxed">
            We sent a 6-digit OTP to {masked}. Enter it to unlock VaultCC.
          </p>

          <div className="mt-6">
            <label className="text-xs text-muted">6-digit OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              placeholder="••••••"
              className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm tracking-[0.35em]"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <LuxButton onClick={verify} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify & Continue'}
            </LuxButton>

            <LuxButton variant="ghost" onClick={() => router.push('/auth')} disabled={loading}>
              Change Number
            </LuxButton>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-muted">
            <button
              className="hover:text-white transition disabled:opacity-60"
              onClick={() => alert('Resend OTP (backend next)')}
              disabled={loading}
            >
              Resend OTP
            </button>
            <span>Tip: OTP is 123456</span>
          </div>
        </LuxCard>
      </div>
    </main>
  );
}
