'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { getPaymentById, type VaultPayment } from '@/lib/paymentsStore';
import { getBills } from '@/lib/billsStore';
import { getCards } from '@/lib/cardsStore';

function formatINR(n: number) {
  return Number(n).toLocaleString('en-IN');
}

export default function ReceiptPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const id = sp.get('id') ?? '';

  const [payment, setPayment] = useState<VaultPayment | null>(null);

  useEffect(() => {
    const p = getPaymentById(id);
    if (!p) router.replace('/payments');
    else setPayment(p);
  }, [id]);

  const details = useMemo(() => {
    if (!payment) return null;

    const bill = getBills().find((b) => b.id === payment.billId);
    const card = bill ? getCards().find((c) => c.id === bill.cardId) : null;

    return { bill, card };
  }, [payment]);

  if (!payment) return null;

  const dateStr = new Date(payment.createdAt).toLocaleString();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl relative">
        <div className="absolute -top-20 right-6 h-64 w-64 rounded-full bg-vault/20 blur-3xl" />
        <div className="absolute -bottom-20 left-6 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

        <LuxCard className="p-8 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-muted">VaultCC Receipt</div>
              <h1 className="mt-1 text-2xl font-semibold">Payment {payment.status.toUpperCase()}</h1>
              <p className="mt-2 text-muted text-sm">{dateStr}</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-muted">Amount</div>
              <div className="mt-1 text-3xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
                ₹ {formatINR(payment.amount)}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <div className="rounded-xl border border-line bg-white/5 p-4">
              <div className="text-xs text-muted">Payment ID</div>
              <div className="mt-1 text-sm font-semibold break-all">{payment.id}</div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-white/5 p-4">
                <div className="text-xs text-muted">Card</div>
                <div className="mt-1 text-sm font-semibold">
                  {details?.card
                    ? `${details.card.bank} • ${details.card.cardName} •••• ${details.card.last4}`
                    : '—'}
                </div>
              </div>

              <div className="rounded-xl border border-line bg-white/5 p-4">
                <div className="text-xs text-muted">Bill Due Date</div>
                <div className="mt-1 text-sm font-semibold">{details?.bill?.dueDate ?? '—'}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <LuxButton onClick={() => router.push('/payments')}>View Payments</LuxButton>
            <LuxButton variant="ghost" onClick={() => router.push('/bills')}>
              Back to Bills
            </LuxButton>
          </div>

          <p className="mt-6 text-xs text-muted">
            Note: This is an MVP receipt. Next we’ll integrate BBPS partner gateway and real transaction references.
          </p>
        </LuxCard>
      </div>
    </main>
  );
}
