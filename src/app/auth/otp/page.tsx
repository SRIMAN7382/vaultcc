'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';

function OtpPageContent() {
  const router = useRouter();
  const sp = useSearchParams();

  const mobile = sp.get('m') ?? '';
  const masked = mobile
    ? `+91 ${mobile.slice(0, 2)}******${mobile.slice(-2)}`
    : 'your number';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      verify();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-vault/15 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 mb-8 text-center">
          <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-br from-vault/20 to-cyan/20 border border-vault/30 shadow-[0_0_40px_rgba(0,229,168,0.2)] grid place-items-center mb-4">
            <svg className="w-8 h-8 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Verify OTP</h1>
          <p className="mt-2 text-white/60">Sent to {masked}</p>
        </div>

        <LuxCard className="p-8 relative z-10">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-1">Step 2 of 2</div>
            <h2 className="text-xl font-semibold">Enter Verification Code</h2>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-8">
            We've sent a 6-digit OTP to your mobile number. Enter it below to access your VaultCC dashboard.
          </p>

          <div className="space-y-2 mb-8">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wide">
              6-Digit OTP
            </label>
            <div className={`rounded-2xl glass-input px-5 py-4 transition-all ${
              focused ? 'ring-2 ring-vault/40 border-vault/40' : ''
            }`}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyPress={handleKeyPress}
                inputMode="numeric"
                placeholder="• • • • • •"
                className="w-full bg-transparent outline-none text-2xl font-semibold tracking-[0.5em] text-center placeholder:text-white/20"
                autoFocus
                disabled={loading}
              />
            </div>
            <div className="text-xs text-center">
              <span className="text-white/40">Development tip: </span>
              <span className="text-vault font-medium">Use 123456</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <LuxButton onClick={verify} disabled={loading} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify & Continue'
              )}
            </LuxButton>
            <LuxButton variant="ghost" onClick={() => router.push('/auth')} disabled={loading} className="w-full">
              Change Number
            </LuxButton>
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <button
              className="text-vault hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
              onClick={() => alert('Resend OTP (backend next)')}
              disabled={loading}
            >
              Resend OTP
            </button>
            <div className="flex items-center gap-1.5 text-white/40">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Code expires in 10:00</span>
            </div>
          </div>
        </LuxCard>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06]">
            <svg className="w-4 h-4 text-vault" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-white/60">Secure authentication in progress</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <OtpPageContent />
    </Suspense>
  );
}
