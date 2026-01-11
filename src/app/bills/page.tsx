'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
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
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Bills" subtitle="Track your due dates" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-3">Bill Tracker</h1>
            <p className="text-white/60 text-lg">
              Track due dates and amounts. Never miss a payment.
            </p>
          </div>

          <LuxButton onClick={() => setOpen(true)} disabled={!cards.length}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bill
          </LuxButton>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 grid place-items-center">
                <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Total Bills</div>
            <div className="text-4xl font-bold">{bills.length}</div>
          </LuxCard>

          <LuxCard className="p-8 bg-gradient-to-br from-vault/5 via-transparent to-transparent">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center">
                <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Next Due</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent mb-2">
              {nextDue ? `₹${formatINR(nextDue.amount)}` : '—'}
            </div>
            <div className="text-xs text-white/50">
              {nextDue ? `${nextDue.dueDate}` : 'No unpaid bills'}
            </div>
          </LuxCard>

          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Status</div>
            <div className="text-lg font-semibold mb-2">
              {cards.length ? 'Ready' : 'Setup Required'}
            </div>
            <div className="text-xs text-white/50">
              {cards.length ? 'Start adding bills' : 'Add cards first'}
            </div>
          </LuxCard>
        </div>

        {/* Bills list */}
        <div className="grid gap-6">
          {bills.length === 0 ? (
            <LuxCard className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-3xl bg-cyan/10 border border-cyan/20 grid place-items-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">No bills yet</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Add your first bill to start tracking due dates and enable seamless BBPS payments.
                </p>
                <div className="flex gap-3 justify-center">
                  <LuxButton onClick={() => router.push('/cards')}>Go to Cards</LuxButton>
                  <LuxButton variant="ghost" onClick={() => setOpen(true)} disabled={!cards.length}>
                    Add Bill
                  </LuxButton>
                </div>
              </div>
            </LuxCard>
          ) : (
            bills
              .slice()
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map((b) => (
                <LuxCard key={b.id} className="p-6 group hover:scale-[1.01] transition-transform">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-white/40 mb-2">{cardLabel(b.cardId)}</div>
                      <div className="flex items-baseline gap-3 mb-3">
                        <div className="text-3xl font-bold">₹{formatINR(b.amount)}</div>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {b.dueDate}
                        </div>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                            b.status === 'paid'
                              ? 'border-vault/30 bg-vault/10 text-vault'
                              : 'border-white/20 bg-white/5 text-white/70'
                          }`}
                        >
                          {b.status === 'paid' && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {b.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {b.status !== 'paid' && (
                        <LuxButton onClick={() => router.push(`/pay?bill=${b.id}`)}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Pay Now
                        </LuxButton>
                      )}
                      <button
                        onClick={() => onDelete(b.id)}
                        className="p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        title="Delete bill"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </LuxCard>
              ))
          )}
        </div>

        {/* Add Bill Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12 overflow-y-auto">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-lg my-8">
              <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-vault/20 blur-3xl animate-pulse" />
              <LuxCard className="p-8 relative">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted/60 mb-1">New Bill</div>
                    <h2 className="text-2xl font-bold">Add Credit Card Bill</h2>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {!cards.length ? (
                  <div className="text-center py-6">
                    <div className="h-14 w-14 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-white/60 mb-6">Add a card first to attach bills.</p>
                    <LuxButton onClick={() => router.push('/cards')} className="w-full">
                      Go to Cards
                    </LuxButton>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Select Card</label>
                      <select
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                        className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm"
                      >
                        {cards.map((c) => (
                          <option key={c.id} value={c.id} className="bg-obsidian">
                            {c.bank} • {c.cardName} •••• {c.last4}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Bill Amount</label>
                      <div className="flex items-center gap-3 rounded-2xl glass-input px-5 py-3.5">
                        <span className="text-sm font-medium text-muted select-none">₹</span>
                        <input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                          inputMode="numeric"
                          placeholder="Enter amount"
                          className="flex-1 bg-transparent outline-none text-base placeholder:text-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Due Date</label>
                      <input
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm"
                      />
                    </div>

                    <div className="pt-4 space-y-4">
                      <LuxButton onClick={onAdd} disabled={!canSave} className="w-full">
                        Save Bill
                      </LuxButton>
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <svg className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-xs text-white/60 leading-relaxed">
                          Track due dates and enable seamless BBPS payments for your credit card bills.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </LuxCard>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
