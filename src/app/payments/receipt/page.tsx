'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { getPaymentById, type VaultPayment } from '@/lib/paymentsStore';
import { getBills } from '@/lib/billsStore';
import { getCards } from '@/lib/cardsStore';

function formatINR(n: number) {
  return Number(n).toLocaleString('en-IN');
}

function ReceiptPageContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const id = sp.get('id') ?? '';

  const [payment, setPayment] = useState<VaultPayment | null>(null);

  useEffect(() => {
    const p = getPaymentById(id);
    if (!p) router.replace('/payments');
    else setPayment(p);
  }, [id, router]);

  const details = useMemo(() => {
    if (!payment) return null;

    const bill = getBills().find((b) => b.id === payment.billId);
    const card = bill ? getCards().find((c) => c.id === bill.cardId) : null;

    return { bill, card };
  }, [payment]);

  if (!payment) return null;

  const date = new Date(payment.createdAt);
  const dateStr = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeStr = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Receipt" subtitle="Payment confirmation" />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-vault/15 blur-3xl animate-pulse" />

          <div className="relative z-10 mb-8 text-center">
            <div className="inline-flex h-20 w-20 rounded-3xl bg-gradient-to-br from-vault/20 to-cyan/20 border-2 border-vault/40 shadow-[0_0_60px_rgba(0,229,168,0.3)] grid place-items-center mb-4">
              <svg className="w-10 h-10 text-vault" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
            <p className="text-white/60">Your transaction was completed successfully</p>
          </div>

          <LuxCard className="p-8 relative z-10 mb-6">
            <div className="mb-8 text-center pb-8 border-b border-white/[0.06]">
              <div className="text-xs uppercase tracking-wider text-muted/60 mb-3">Amount Paid</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
                ₹{formatINR(payment.amount)}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-vault/10 border border-vault/20 grid place-items-center flex-shrink-0">
                    <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Transaction ID</div>
                    <div className="text-sm font-mono text-white/90 break-all">{payment.id}</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/20 grid place-items-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Date & Time</div>
                      <div className="text-base font-semibold">{dateStr}</div>
                      <div className="text-sm text-white/60 mt-1">{timeStr}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-vault/10 border border-vault/20 grid place-items-center flex-shrink-0">
                      <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Status</div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-vault/30 bg-vault/10 px-3 py-1.5 text-sm font-medium text-vault">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {payment.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {details?.card && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 grid place-items-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-1 grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Payment Card</div>
                        <div className="text-base font-semibold mb-1">{details.card.bank} • {details.card.cardName}</div>
                        <div className="text-sm text-white/50 font-mono tracking-wider">•••• {details.card.last4}</div>
                      </div>
                      {details?.bill?.dueDate && (
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Bill Due Date</div>
                          <div className="text-base font-semibold">{details.bill.dueDate}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-4">
              <div className="flex gap-3">
                <LuxButton onClick={() => router.push('/payments')} className="flex-1">
                  View All Payments
                </LuxButton>
                <LuxButton variant="ghost" onClick={() => router.push('/bills')} className="flex-1">
                  Back to Bills
                </LuxButton>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <svg className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-xs text-white/60 leading-relaxed">
                  This receipt confirms your payment transaction. Save this for your records. Future updates will include BBPS integration with official transaction references.
                </div>
              </div>
            </div>
          </LuxCard>

          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06]">
              <svg className="w-4 h-4 text-vault" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/60">Secured payment confirmation</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <ReceiptPageContent />
    </Suspense>
  );
}
