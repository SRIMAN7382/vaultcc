'use client';

import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Success" subtitle="Payment complete" />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-vault/15 blur-3xl animate-pulse" />

          <div className="relative z-10 mb-8 text-center">
            <div className="inline-flex h-24 w-24 rounded-full bg-gradient-to-br from-vault/20 to-cyan/20 border-2 border-vault/40 shadow-[0_0_60px_rgba(0,229,168,0.3)] grid place-items-center mb-6 animate-bounce">
              <svg className="w-12 h-12 text-vault" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-3">Payment Successful!</h1>
            <p className="text-white/60 text-lg">Your credit card bill has been paid successfully</p>
          </div>

          <LuxCard className="p-8 relative z-10 mb-6 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vault/10 border border-vault/20 mb-4">
                <svg className="w-4 h-4 text-vault animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-vault">Transaction Complete</span>
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-white/70 leading-relaxed mb-6">
                  Your payment has been processed successfully. A receipt has been generated and is available in your payment history.
                </p>

                <div className="grid gap-4 text-left mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <svg className="w-5 h-5 text-vault flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-white/80">Bill marked as paid</div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <svg className="w-5 h-5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-sm text-white/80">Receipt generated</div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-white/80">Transaction history updated</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <LuxButton onClick={() => router.push('/payments')} className="w-full">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Payment History
              </LuxButton>

              <div className="grid grid-cols-2 gap-3">
                <LuxButton variant="ghost" onClick={() => router.push('/bills')} className="w-full">
                  Back to Bills
                </LuxButton>
                <LuxButton variant="ghost" onClick={() => router.push('/dashboard')} className="w-full">
                  Dashboard
                </LuxButton>
              </div>
            </div>
          </LuxCard>

          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06]">
              <svg className="w-4 h-4 text-vault" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/60">Secure payment processing</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
