'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-muted">VaultCC</div>
            <h1 className="mt-1 text-3xl font-semibold">Payments</h1>
            <p className="mt-2 text-muted">Your bill payment history and receipts.</p>
          </div>

          <div className="flex gap-3">
            <LuxButton variant="ghost" onClick={() => router.push('/dashboard')}>
              Back
            </LuxButton>
            <LuxButton onClick={() => router.push('/bills')}>Go to Bills</LuxButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LuxCard className="p-6">
            <div className="text-xs text-muted">Transactions</div>
            <div className="mt-2 text-2xl font-semibold">{payments.length}</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Total Paid</div>
            <div className="mt-2 text-2xl font-semibold">₹ {formatINR(totalPaid)}</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Receipts</div>
            <div className="mt-2 text-sm font-semibold">Tap any payment</div>
            <div className="mt-2 text-xs text-muted">We generate a premium receipt view.</div>
          </LuxCard>
        </div>

        <div className="mt-6 grid gap-4">
          {payments.length === 0 ? (
            <LuxCard className="p-8">
              <div className="text-lg font-semibold">No payments yet</div>
              <p className="mt-2 text-muted">Pay a bill to generate your first receipt.</p>
              <div className="mt-6">
                <LuxButton onClick={() => router.push('/bills')}>Pay a Bill</LuxButton>
              </div>
            </LuxCard>
          ) : (
            payments.map((p) => (
              <button
                key={p.id}
                onClick={() => router.push(`/payments/receipt?id=${p.id}`)}
                className="text-left"
              >
                <LuxCard className="p-6 hover:bg-white/7 transition">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted">
                        {new Date(p.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-1 text-sm font-semibold break-all">{p.id}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-muted">{p.status.toUpperCase()}</div>
                      <div className="mt-1 text-xl font-semibold">₹ {formatINR(p.amount)}</div>
                    </div>
                  </div>
                </LuxCard>
              </button>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
