'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import type { VaultCard } from '@/lib/cardsStore';
import { getCards } from '@/lib/cardsStore';
import type { VaultBill } from '@/lib/billsStore';
import { addBill, deleteBill, getBills, markPaid } from '@/lib/billsStore';

function uid() {
  return Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
}

function formatINR(n: number) {
  try {
    return n.toLocaleString('en-IN');
  } catch {
    return String(n);
  }
}

export default function BillsPage() {
  const router = useRouter();

  const [cards, setCards] = useState<VaultCard[]>([]);
  const [bills, setBills] = useState<VaultBill[]>([]);
  const [open, setOpen] = useState(false);

  // form
  const [cardId, setCardId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const c = getCards();
    setCards(c);
    setBills(getBills());

    if (c.length) setCardId(c[0].id);
  }, []);

  const nextDue = useMemo(() => {
    const upcoming = bills
      .filter((b) => b.status === 'unpaid')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return upcoming[0];
  }, [bills]);

  const canSave = useMemo(() => {
    const amt = Number(amount);
    return cardId && Number.isFinite(amt) && amt > 0 && dueDate.length === 10;
  }, [cardId, amount, dueDate]);

  const onAdd = () => {
    if (!canSave) return;

    const bill: VaultBill = {
      id: uid(),
      cardId,
      amount: Number(amount),
      dueDate,
      status: 'unpaid',
      createdAt: new Date().toISOString(),
    };

    addBill(bill);
    setBills(getBills());

    setAmount('');
    setDueDate('');
    setOpen(false);
  };

  const cardLabel = (id: string) => {
    const c = cards.find((x) => x.id === id);
    if (!c) return 'Unknown card';
    return `${c.bank} • ${c.cardName} •••• ${c.last4}`;
  };

  const onPaid = (id: string) => {
    markPaid(id);
    setBills(getBills());
  };

  const onDelete = (id: string) => {
    const ok = confirm('Delete this bill entry?');
    if (!ok) return;
    deleteBill(id);
    setBills(getBills());
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-muted">VaultCC</div>
            <h1 className="mt-1 text-3xl font-semibold">Bills</h1>
            <p className="mt-2 text-muted">
              Track due dates and bill amounts. (Email auto-fetch comes later.)
            </p>
          </div>

          <div className="flex gap-3">
            <LuxButton variant="ghost" onClick={() => router.push('/dashboard')}>
              Back
            </LuxButton>
            <LuxButton onClick={() => setOpen(true)} disabled={!cards.length}>
              Add Bill
            </LuxButton>
          </div>
        </div>

        {/* Top tiles */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LuxCard className="p-6">
            <div className="text-xs text-muted">Total Bills</div>
            <div className="mt-2 text-2xl font-semibold">{bills.length}</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Next Due</div>
            <div className="mt-2 text-2xl font-semibold">
              {nextDue ? `₹ ${formatINR(nextDue.amount)}` : '—'}
            </div>
            <div className="mt-2 text-xs text-muted">
              {nextDue ? `${nextDue.dueDate} • ${cardLabel(nextDue.cardId)}` : 'No unpaid bills'}
            </div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Status</div>
            <div className="mt-2 text-sm font-semibold">
              {cards.length ? 'Ready' : 'Add cards first'}
            </div>
            <div className="mt-2 text-xs text-muted">
              {cards.length ? 'You can now add bills per card.' : 'Go to Cards and add one card.'}
            </div>
          </LuxCard>
        </div>

        {/* Bills list */}
        <div className="mt-6 grid gap-4">
          {bills.length === 0 ? (
            <LuxCard className="p-8">
              <div className="text-lg font-semibold">No bills added</div>
              <p className="mt-2 text-muted">
                Add your first bill to start reminders and BBPS payment flow.
              </p>
              <div className="mt-6 flex gap-3">
                <LuxButton onClick={() => router.push('/cards')}>Go to Cards</LuxButton>
                <LuxButton variant="ghost" onClick={() => setOpen(true)} disabled={!cards.length}>
                  Add Bill
                </LuxButton>
              </div>
            </LuxCard>
          ) : (
            bills
              .slice()
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map((b) => (
                <LuxCard key={b.id} className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted">{cardLabel(b.cardId)}</div>
                      <div className="mt-2 text-xl font-semibold">
                        ₹ {formatINR(b.amount)}
                        <span className="ml-3 text-xs text-muted">
                          Due: {b.dueDate}
                        </span>
                      </div>
                      <div className="mt-2 text-xs">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 ${
                            b.status === 'paid'
                              ? 'border-vault/30 bg-vault/10 text-white'
                              : 'border-line bg-white/5 text-muted'
                          }`}
                        >
                          {b.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {b.status !== 'paid' && (
  <LuxButton onClick={() => router.push(`/pay?bill=${b.id}`)}>
    Pay Now
  </LuxButton>
)}

                      <LuxButton variant="ghost" onClick={() => onDelete(b.id)}>
                        Delete
                      </LuxButton>
                    </div>
                  </div>
                </LuxCard>
              ))
          )}
        </div>

        {/* Add Bill Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-md">
              <div className="absolute -top-16 right-8 h-56 w-56 rounded-full bg-vault/20 blur-3xl" />
              <LuxCard className="p-7 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-muted">Add Bill</div>
                    <div className="mt-1 text-xl font-semibold">Due tracker</div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted hover:text-white transition"
                  >
                    Close
                  </button>
                </div>

                {!cards.length ? (
                  <div className="mt-6">
                    <p className="text-muted">Add a card first to attach bills.</p>
                    <div className="mt-4">
                      <LuxButton onClick={() => router.push('/cards')}>Go to Cards</LuxButton>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs text-muted">Card</label>
                      <select
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                      >
                        {cards.map((c) => (
                          <option key={c.id} value={c.id} className="bg-obsidian">
                            {c.bank} • {c.cardName} •••• {c.last4}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-muted">Bill Amount</label>
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                        inputMode="numeric"
                        placeholder="Eg: 12840"
                        className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted">Due Date</label>
                      <input
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                      <LuxButton onClick={onAdd} disabled={!canSave}>
                        Save Bill
                      </LuxButton>
                      <div className="text-xs text-muted">
                        Next: we’ll add reminders + BBPS Pay button here.
                      </div>
                    </div>
                  </div>
                )}
              </LuxCard>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
