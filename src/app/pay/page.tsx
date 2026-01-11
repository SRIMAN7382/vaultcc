'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { getBills, markPaid } from '@/lib/billsStore';
import { addPayment } from '@/lib/paymentsStore';

export default function PayPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const billId = sp.get('bill');

  const [bill, setBill] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const b = getBills().find((x) => x.id === billId);
    if (!b) router.replace('/bills');
    else setBill(b);
  }, [billId]);

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
    <main className="min-h-screen flex items-center justify-center px-6">
      <LuxCard className="p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold">Confirm Payment</h1>

        <div className="mt-6 space-y-3">
          <div className="text-muted">Amount</div>
          <div className="text-3xl font-bold">₹ {bill.amount}</div>

          <div className="text-muted mt-4">Due Date</div>
          <div>{bill.dueDate}</div>
        </div>

        <div className="mt-8 flex gap-3">
          <LuxButton onClick={payNow} disabled={loading}>
            {loading ? 'Processing…' : 'Pay Now'}
          </LuxButton>
          <LuxButton variant="ghost" onClick={() => router.push('/bills')}>
            Cancel
          </LuxButton>
        </div>
      </LuxCard>
    </main>
  );
}
