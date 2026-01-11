'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';

export default function AuthPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');

  const goNext = () => {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      alert('Enter a valid 10-digit mobile number');
      return;
    }
    router.push(`/auth/otp?m=${encodeURIComponent(cleaned)}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 right-6 h-64 w-64 rounded-full bg-vault/20 blur-3xl" />
        <div className="absolute -bottom-20 left-6 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

        <LuxCard className="p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted">VaultCC Secure Entry</div>
              <h1 className="mt-1 text-2xl font-semibold">Continue with Mobile</h1>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-line grid place-items-center shadow-glow">
              <span className="text-sm font-bold">V</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted leading-relaxed">
            Your mobile number is your VaultCC identity. We use OTP for maximum security.
          </p>

          <div className="mt-6">
            <label className="text-xs text-muted">Mobile Number</label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-line bg-white/5 px-4 py-3">
              <span className="text-sm text-muted">+91</span>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                inputMode="numeric"
                placeholder="Enter 10-digit number"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <LuxButton onClick={goNext}>Send OTP</LuxButton>
            <LuxButton variant="ghost" onClick={() => router.push('/')}>
              Back to Home
            </LuxButton>
          </div>

          <div className="mt-6 text-xs text-muted">By continuing, you agree to Terms & Privacy.</div>
        </LuxCard>
      </div>
    </main>
  );
}
