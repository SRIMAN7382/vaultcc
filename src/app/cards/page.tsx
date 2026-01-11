'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import type { VaultCard } from '@/lib/cardsStore';
import { addCard, deleteCard, getCards } from '@/lib/cardsStore';

const BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'SBI Card',
  'IDFC FIRST',
  'Kotak',
  'IndusInd',
  'RBL',
  'Yes Bank',
  'HSBC',
  'AmEx',
  'AU Small Finance',
  'Standard Chartered',
];

function uid() {
  return Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
}

export default function CardsPage() {
  const router = useRouter();

  const [items, setItems] = useState<VaultCard[]>([]);
  const [open, setOpen] = useState(false);

  // form
  const [bank, setBank] = useState(BANKS[0]);
  const [cardName, setCardName] = useState('');
  const [last4, setLast4] = useState('');
  const [limit, setLimit] = useState('');
  const [billingDay, setBillingDay] = useState('');

  useEffect(() => {
    setItems(getCards());
  }, []);

  const canSave = useMemo(() => {
    const l4 = last4.replace(/\D/g, '');
    const lim = limit.trim();
    const bd = billingDay.trim();

    const billingOk = bd === '' || (Number(bd) >= 1 && Number(bd) <= 28);
    const limitOk = lim === '' || Number(lim) > 0;

    return (
      bank.length > 0 &&
      cardName.trim().length >= 2 &&
      l4.length === 4 &&
      billingOk &&
      limitOk
    );
  }, [bank, cardName, last4, limit, billingDay]);

  const onAdd = () => {
    if (!canSave) return;

    const card: VaultCard = {
      id: uid(),
      bank,
      cardName: cardName.trim(),
      last4: last4.replace(/\D/g, '').slice(0, 4),
      limit: limit.trim() ? Number(limit) : undefined,
      billingDay: billingDay.trim() ? Number(billingDay) : undefined,
      createdAt: new Date().toISOString(),
    };

    addCard(card);
    setItems(getCards());

    // reset
    setCardName('');
    setLast4('');
    setLimit('');
    setBillingDay('');
    setOpen(false);
  };

  const onDelete = (id: string) => {
    const ok = confirm('Remove this card from VaultCC?');
    if (!ok) return;
    deleteCard(id);
    setItems(getCards());
  };

  return (
    <div className="min-h-screen">
      <Navigation showBackToDashboard title="Cards" subtitle="Manage your credit cards" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-3">Your Cards</h1>
            <p className="text-white/60 text-lg">
              Add and manage your credit cards securely. We only store last 4 digits.
            </p>
          </div>

          <LuxButton onClick={() => setOpen(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Card
          </LuxButton>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center">
                <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Total Cards</div>
            <div className="text-4xl font-bold">{items.length}</div>
          </LuxCard>

          <LuxCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 grid place-items-center">
                <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Next Step</div>
            <div className="text-lg font-semibold mb-2">Track Bills</div>
            <div className="text-xs text-white/50">
              After adding cards, enable bill tracking & payments.
            </div>
          </LuxCard>

          <LuxCard className="p-8 bg-gradient-to-br from-vault/5 via-transparent to-transparent">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-vault/10 border border-vault/20 grid place-items-center">
                <svg className="w-6 h-6 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted/60 mb-2">Security</div>
            <div className="text-lg font-semibold mb-2">Last 4 Only</div>
            <div className="text-xs text-white/50">
              Never store full card number or CVV.
            </div>
          </LuxCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 ? (
            <LuxCard className="p-12 md:col-span-2 lg:col-span-3 text-center">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-3xl bg-vault/10 border border-vault/20 grid place-items-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-vault" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">No cards yet</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Add your first card to start tracking bills and maximizing rewards.
                </p>
                <LuxButton onClick={() => setOpen(true)}>Add Your First Card</LuxButton>
              </div>
            </LuxCard>
          ) : (
            items.map((c) => (
              <LuxCard key={c.id} className="p-6 group hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-muted/60 mb-1">{c.bank}</div>
                    <div className="text-xl font-bold mb-2">{c.cardName}</div>
                    <div className="text-sm text-white/50 font-mono tracking-wider">•••• {c.last4}</div>
                  </div>

                  <button
                    onClick={() => onDelete(c.id)}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    title="Remove card"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="text-xs uppercase tracking-wide text-muted/70 mb-2">Limit</div>
                    <div className="text-base font-semibold">
                      {typeof c.limit === 'number' ? `₹${c.limit.toLocaleString('en-IN')}` : '—'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="text-xs uppercase tracking-wide text-muted/70 mb-2">Billing Day</div>
                    <div className="text-base font-semibold">
                      {typeof c.billingDay === 'number' ? `${c.billingDay}th` : '—'}
                    </div>
                  </div>
                </div>
              </LuxCard>
            ))
          )}
        </div>

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
                    <div className="text-xs uppercase tracking-wider text-muted/60 mb-1">New Card</div>
                    <h2 className="text-2xl font-bold">Add Credit Card</h2>
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

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Bank</label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm"
                    >
                      {BANKS.map((b) => (
                        <option key={b} value={b} className="bg-obsidian">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Card Name</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Eg: Regalia, Amazon Pay, Magnus"
                      className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm placeholder:text-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Last 4 Digits</label>
                      <input
                        value={last4}
                        onChange={(e) => setLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        inputMode="numeric"
                        placeholder="1234"
                        className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm tracking-widest font-mono placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Billing Day</label>
                      <input
                        value={billingDay}
                        onChange={(e) => setBillingDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        inputMode="numeric"
                        placeholder="12"
                        className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/80 uppercase tracking-wide mb-2 block">Credit Limit (Optional)</label>
                    <input
                      value={limit}
                      onChange={(e) => setLimit(e.target.value.replace(/[^\d]/g, ''))}
                      inputMode="numeric"
                      placeholder="200000"
                      className="w-full rounded-2xl glass-input px-5 py-3.5 outline-none text-sm placeholder:text-white/30"
                    />
                  </div>

                  <div className="pt-4 space-y-4">
                    <LuxButton onClick={onAdd} disabled={!canSave} className="w-full">
                      Add to Vault
                    </LuxButton>
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                      <svg className="w-5 h-5 text-vault flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <div className="text-xs text-white/60 leading-relaxed">
                        We never store full card numbers or CVV. Only bank name, card name, and last 4 digits are saved locally.
                      </div>
                    </div>
                  </div>
                </div>
              </LuxCard>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
