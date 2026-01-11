'use client';

import { useRouter } from 'next/navigation';
import LuxButton from '@/components/ui/LuxButton';
import LuxCard from '@/components/ui/LuxCard';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-obsidian/80 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-vault/20 to-cyan/20 border border-vault/30 shadow-[0_0_24px_rgba(0,229,168,0.15)] grid place-items-center transition-all group-hover:shadow-[0_0_32px_rgba(0,229,168,0.25)] group-hover:scale-105">
                <span className="text-base font-bold bg-gradient-to-br from-vault to-cyan bg-clip-text text-transparent">
                  V
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">VaultCC</div>
                <div className="text-xs text-muted/80">Smart Credit Intelligence</div>
              </div>
            </div>

            <div className="flex gap-3">
              <LuxButton variant="ghost" className="hidden sm:inline-flex">
                Compare
              </LuxButton>
              <LuxButton onClick={() => router.push('/auth')}>Get Started</LuxButton>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-vault/30 bg-vault/5">
              <div className="h-2 w-2 rounded-full bg-vault animate-pulse" />
              <span className="text-xs font-medium text-vault">Premium Credit Intelligence</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Smart Credit.{' '}
              <span className="bg-gradient-to-r from-vault via-cyan to-vault bg-clip-text text-transparent">
                Locked-in Rewards.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
              VaultCC is your premium command center for credit cards. Track bills, optimize utilization, and extract maximum rewards with a luxury-grade experience.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <LuxButton onClick={() => router.push('/auth')} className="text-base px-8 py-4">
                Continue with Mobile
              </LuxButton>
              <LuxButton variant="ghost" className="text-base px-8 py-4">
                Explore Features
              </LuxButton>
            </div>

            <div className="flex items-center gap-8 pt-6 text-sm">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-white/50">Active Users</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold">₹50Cr+</div>
                <div className="text-white/50">Bills Tracked</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-white/50">App Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 h-80 w-80 bg-vault/15 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 bg-cyan/10 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <LuxCard className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted/60">Dashboard Preview</div>
                  <div className="text-lg font-semibold mt-1">VaultCC Control Center</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-vault animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-vault/30 transition-all hover:bg-white/[0.05]">
                    <div className="text-xs uppercase tracking-wide text-muted/70 mb-2">Next Due</div>
                    <div className="text-2xl font-bold">₹12,840</div>
                    <div className="text-xs text-vault mt-1">in 3 days</div>
                  </div>

                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-cyan/30 transition-all hover:bg-white/[0.05]">
                    <div className="text-xs uppercase tracking-wide text-muted/70 mb-2">Utilization</div>
                    <div className="text-2xl font-bold">23%</div>
                    <div className="text-xs text-cyan mt-1">Optimal</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-vault/10 via-transparent to-cyan/10 p-6 rounded-2xl border border-vault/20">
                  <div className="text-xs uppercase tracking-wide text-muted/70 mb-3">Rewards This Month</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
                    ₹2,460
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-vault to-cyan rounded-full" />
                    </div>
                    <span className="text-xs text-vault">+12%</span>
                  </div>
                </div>
              </div>
            </LuxCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LuxCard className="p-8">
            <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center mb-6">
              <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Bank-Grade Security</h3>
            <p className="text-white/60 leading-relaxed">256-bit encryption with secure data handling. Never store full card numbers.</p>
          </LuxCard>

          <LuxCard className="p-8">
            <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 grid place-items-center mb-6">
              <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Notifications</h3>
            <p className="text-white/60 leading-relaxed">Never miss a due date with smart reminders and payment alerts.</p>
          </LuxCard>

          <LuxCard className="p-8">
            <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center mb-6">
              <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
            <p className="text-white/60 leading-relaxed">Track spending patterns and maximize reward potential automatically.</p>
          </LuxCard>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-12 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/40">
            © 2026 VaultCC. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <button className="hover:text-white transition">Privacy</button>
            <button className="hover:text-white transition">Terms</button>
            <button className="hover:text-white transition">Contact</button>
          </div>
        </div>
      </footer>
    </main>
  );
}
