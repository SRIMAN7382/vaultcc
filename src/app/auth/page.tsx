'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';

export default function AuthPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [focused, setFocused] = useState(false);

  const goNext = () => {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      alert('Enter a valid 10-digit mobile number');
      return;
    }
    router.push(`/auth/otp?m=${encodeURIComponent(cleaned)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      goNext();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-vault/15 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 mb-8 text-center">
          <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-br from-vault/20 to-cyan/20 border border-vault/30 shadow-[0_0_40px_rgba(0,229,168,0.2)] grid place-items-center mb-4">
            <span className="text-2xl font-bold bg-gradient-to-br from-vault to-cyan bg-clip-text text-transparent">
              V
            </span>
          </div>
          <h1 className="text-3xl font-bold">Welcome to VaultCC</h1>
          <p className="mt-2 text-white/60">Your premium credit card command center</p>
        </div>

        <LuxCard className="p-8 relative z-10">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-1">Secure Authentication</div>
            <h2 className="text-xl font-semibold">Continue with Mobile</h2>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-8">
            Enter your mobile number to receive a secure OTP. We use bank-grade encryption for your safety.
          </p>

          <div className="space-y-2 mb-8">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wide">
              Mobile Number
            </label>
            <div className={`flex items-center gap-3 rounded-2xl glass-input px-5 py-4 transition-all ${
              focused ? 'ring-2 ring-vault/40 border-vault/40' : ''
            }`}>
              <span className="text-sm font-medium text-muted select-none">+91</span>
              <div className="h-6 w-px bg-white/10" />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyPress={handleKeyPress}
                inputMode="numeric"
                placeholder="Enter 10-digit number"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-white/30"
                autoFocus
              />
            </div>
            <div className="text-xs text-white/40 pl-1">
              We'll send you a 6-digit OTP for verification
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <LuxButton onClick={goNext} className="w-full">
              Send OTP
            </LuxButton>
            <LuxButton variant="ghost" onClick={() => router.push('/')} className="w-full">
              Back to Home
            </LuxButton>
          </div>

          <div className="pt-6 border-t border-white/[0.06] text-center">
            <p className="text-xs text-white/40">
              By continuing, you agree to our{' '}
              <button className="text-vault hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-vault hover:underline">Privacy Policy</button>
            </p>
          </div>
        </LuxCard>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06]">
            <svg className="w-4 h-4 text-vault" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-white/60">Secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </main>
  );
}
