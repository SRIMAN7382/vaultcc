'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { getBills, markPaid } from '@/lib/billsStore';
import { getCards } from '@/lib/cardsStore';
import { addPayment } from '@/lib/paymentsStore';

function PayPageContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const billId = sp.get('bill');

  const [bill, setBill] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const b = getBills().find((x) => x.id === billId);
    if (!b) {
      router.replace('/bills');
      return;
    }
    setBill(b);

    const c = getCards().find((x) => x.id === b.cardId);
    setCard(c);
  }, [billId, router]);

  const payNow = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const paymentId = Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);

    addPayment({
      id: paymentId,
      billId: bill.id,
      amount: bill.amount,
      status: 'success',
      createdAt: new Date().toISOString(),
    });

    markPaid(bill.id);
    router.replace(`/payments/receipt?id=${paymentId}`);
  };

  if (!bill) return null;

  return (
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Payment" subtitle="Secure bill payment" />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-vault/15 blur-3xl animate-pulse" />

          <div className="relative z-10 mb-8 text-center">
            <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-br from-vault/20 to-cyan/20 border border-vault/30 shadow-[0_0_40px_rgba(0,229,168,0.2)] grid place-items-center mb-4">
              <svg className="w-8 h-8 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Confirm Payment</h1>
            <p className="text-white/60">Review your bill payment details</p>
          </div>

          <LuxCard className="p-8 relative z-10 mb-6">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-wider text-muted/60 mb-3">Payment Amount</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
                ₹{bill.amount.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="grid gap-6 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/20 grid place-items-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-white/50 mb-1">Due Date</div>
                    <div className="text-lg font-semibold">{bill.dueDate}</div>
                  </div>
                </div>
              </div>

              {card && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-vault/10 border border-vault/20 grid place-items-center flex-shrink-0">
                      <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-white/50 mb-1">Payment Card</div>
                      <div className="text-base font-semibold mb-1">{card.bank} • {card.cardName}</div>
                      <div className="text-sm text-white/50 font-mono tracking-wider">•••• {card.last4}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <LuxButton onClick={payNow} disabled={loading} className="w-full">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm & Pay ₹{bill.amount.toLocaleString('en-IN')}
                  </span>
                )}
              </LuxButton>
              <LuxButton variant="ghost" onClick={() => router.push('/bills')} disabled={loading} className="w-full">
                Cancel Payment
              </LuxButton>
            </div>
          </LuxCard>

          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06]">
              <svg className="w-4 h-4 text-vault" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/60">Secured with bank-grade encryption</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <PayPageContent />
    </Suspense>
  );
}
