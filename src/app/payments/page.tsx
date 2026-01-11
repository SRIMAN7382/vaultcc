'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { getPayments, type VaultPayment } from '@/lib/paymentsStore';

function formatINR(n: number) {
  return Number(n).toLocaleString('en-IN');
}

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<VaultPayment[]>([]);

  useEffect(() => {
    setPayments(getPayments());
  }, []);

  const totalPaid = useMemo(() => {
    return payments
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  }, [payments]);

  return (
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Payments" subtitle="Your payment history" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-3">Payment History</h1>
            <p className="text-white/60 text-lg">
              View all transactions and download receipts.
            </p>
          </div>

          <LuxButton onClick={() => router.push('/bills')}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Go to Bills
          </LuxButton>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 grid place-items-center">
                <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Total Transactions</div>
            <div className="text-4xl font-bold">{payments.length}</div>
          </LuxCard>

          <LuxCard className="p-8 bg-gradient-to-br from-vault/5 via-transparent to-transparent">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center">
                <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Total Paid</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
              ₹{formatINR(totalPaid)}
            </div>
          </LuxCard>

          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Receipts</div>
            <div className="text-lg font-semibold mb-2">Instant Access</div>
            <div className="text-xs text-white/50">
              Tap any payment to view
            </div>
          </LuxCard>
        </div>

        <div className="grid gap-6">
          {payments.length === 0 ? (
            <LuxCard className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-3xl bg-vault/10 border border-vault/20 grid place-items-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">No payments yet</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Pay your first bill to start building your payment history.
                </p>
                <LuxButton onClick={() => router.push('/bills')}>Pay a Bill</LuxButton>
              </div>
            </LuxCard>
          ) : (
            payments
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/payments/receipt?id=${p.id}`)}
                  className="text-left group"
                >
                  <LuxCard className="p-6 group-hover:scale-[1.01] transition-transform">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-xl bg-vault/10 border border-vault/20 grid place-items-center flex-shrink-0">
                          <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wide text-white/40 mb-1">
                            {new Date(p.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="text-base font-semibold mb-2">Payment #{p.id.slice(0, 12)}...</div>
                          <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-vault/30 bg-vault/10 px-3 py-1 text-xs font-medium text-vault">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {p.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold">₹{formatINR(p.amount)}</div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Receipt
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </LuxCard>
                </button>
              ))
          )}
        </div>
      </main>
    </div>
  );
}
