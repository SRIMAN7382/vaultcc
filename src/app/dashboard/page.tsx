'use client';

import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Navigation showLogout title="Dashboard" subtitle="Your credit command center" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
          <p className="text-white/60 text-lg">
            Manage your cards, track bills, and maximize rewards.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <button onClick={() => router.push('/cards')} className="text-left group">
            <LuxCard className="p-8 group-hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center group-hover:bg-vault/15 transition-colors">
                  <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-white/60">Active</span>
                </div>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Total Cards</div>
              <div className="text-4xl font-bold mb-4">0</div>
              <div className="text-sm text-white/50">Add your first credit card</div>
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-vault">Get started →</span>
              </div>
            </LuxCard>
          </button>

          <button onClick={() => router.push('/bills')} className="text-left group">
            <LuxCard className="p-8 group-hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 grid place-items-center group-hover:bg-cyan/15 transition-colors">
                  <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-white/60">Tracking</span>
                </div>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Next Due</div>
              <div className="text-4xl font-bold mb-4">—</div>
              <div className="text-sm text-white/50">No bills added yet</div>
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-cyan">View bills →</span>
              </div>
            </LuxCard>
          </button>

          <LuxCard className="p-8 bg-gradient-to-br from-vault/5 via-transparent to-cyan/5 border-vault/20">
            <div className="flex items-start justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-vault/15 border border-vault/30 grid place-items-center">
                <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="px-3 py-1 rounded-full bg-vault/10 border border-vault/20">
                <span className="text-xs text-vault">Premium</span>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Rewards Value</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent mb-4">—</div>
            <div className="text-sm text-white/50">Start tracking rewards</div>
            <div className="mt-4 pt-4 border-t border-vault/10 flex items-center justify-between">
              <span className="text-xs text-vault">Coming soon</span>
            </div>
          </LuxCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <div className="h-2 w-2 rounded-full bg-vault animate-pulse" />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/cards')}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-vault/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-vault/10 border border-vault/20 grid place-items-center">
                  <svg className="w-5 h-5 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold">Add Credit Card</div>
                  <div className="text-xs text-white/50">Start tracking your cards</div>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-vault transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => router.push('/bills')}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-cyan/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-cyan/10 border border-cyan/20 grid place-items-center">
                  <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold">Track Bills</div>
                  <div className="text-xs text-white/50">Never miss a due date</div>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => router.push('/payments')}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold">Payment History</div>
                  <div className="text-xs text-white/50">View all transactions</div>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </LuxCard>

          <LuxCard className="p-8 bg-gradient-to-br from-vault/5 via-transparent to-transparent">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
              <p className="text-sm text-white/60">Complete these steps to unlock all features</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-vault/10 border border-vault/30 grid place-items-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-vault">1</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">Add your credit cards</div>
                  <div className="text-xs text-white/50 leading-relaxed">
                    Securely store your card details. We only keep last 4 digits.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-white/40">2</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 text-white/60">Connect bills</div>
                  <div className="text-xs text-white/40 leading-relaxed">
                    Link bills to cards and track due dates automatically.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-white/40">3</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 text-white/60">Start paying bills</div>
                  <div className="text-xs text-white/40 leading-relaxed">
                    Pay your bills seamlessly and earn rewards effortlessly.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <LuxButton onClick={() => router.push('/cards')} className="w-full">
                Get Started
              </LuxButton>
            </div>
          </LuxCard>
        </div>
      </main>
    </div>
  );
}
