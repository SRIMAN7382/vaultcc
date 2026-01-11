'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-muted">VaultCC</div>
            <h1 className="mt-1 text-3xl font-semibold">Your Cards</h1>
            <p className="mt-2 text-muted">
              Add your credit cards securely (we store only last 4 digits).
            </p>
          </div>

          <div className="flex gap-3">
            <LuxButton variant="ghost" onClick={() => router.push('/dashboard')}>
              Back
            </LuxButton>
            <LuxButton onClick={() => setOpen(true)}>Add Card</LuxButton>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LuxCard className="p-6">
            <div className="text-xs text-muted">Total Cards</div>
            <div className="mt-2 text-2xl font-semibold">{items.length}</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Next Step</div>
            <div className="mt-2 text-sm font-semibold">Bills + Due dates</div>
            <div className="mt-2 text-xs text-muted">
              After adding cards, we enable bill tracking & BBPS pay.
            </div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Security</div>
            <div className="mt-2 text-sm font-semibold">Last4 only</div>
            <div className="mt-2 text-xs text-muted">
              Never store full card number or CVV.
            </div>
          </LuxCard>
        </div>

        {/* Cards list */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.length === 0 ? (
            <LuxCard className="p-8 md:col-span-2">
              <div className="text-lg font-semibold">No cards yet</div>
              <p className="mt-2 text-muted">
                Add your first card to start tracking bills and rewards.
              </p>
              <div className="mt-6">
                <LuxButton onClick={() => setOpen(true)}>Add your first card</LuxButton>
              </div>
            </LuxCard>
          ) : (
            items.map((c) => (
              <LuxCard key={c.id} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted">{c.bank}</div>
                    <div className="mt-1 text-lg font-semibold">{c.cardName}</div>
                    <div className="mt-2 text-sm text-muted">•••• {c.last4}</div>
                  </div>

                  <button
                    onClick={() => onDelete(c.id)}
                    className="text-xs text-muted hover:text-white transition"
                    title="Remove card"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-line bg-white/5 p-4">
                    <div className="text-xs text-muted">Limit</div>
                    <div className="mt-1 text-sm font-semibold">
                      {typeof c.limit === 'number' ? `₹ ${c.limit.toLocaleString('en-IN')}` : '—'}
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-white/5 p-4">
                    <div className="text-xs text-muted">Billing Day</div>
                    <div className="mt-1 text-sm font-semibold">
                      {typeof c.billingDay === 'number' ? c.billingDay : '—'}
                    </div>
                  </div>
                </div>
              </LuxCard>
            ))
          )}
        </div>

        {/* Modal */}
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
                    <div className="text-xs text-muted">Add Credit Card</div>
                    <div className="mt-1 text-xl font-semibold">Secure details</div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted hover:text-white transition"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs text-muted">Bank</label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                    >
                      {BANKS.map((b) => (
                        <option key={b} value={b} className="bg-obsidian">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-muted">Card Name</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Eg: Regalia, Amazon Pay, Magnus…"
                      className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted">Last 4 digits</label>
                      <input
                        value={last4}
                        onChange={(e) => setLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        inputMode="numeric"
                        placeholder="1234"
                        className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm tracking-widest"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted">Billing Day (1–28)</label>
                      <input
                        value={billingDay}
                        onChange={(e) =>
                          setBillingDay(e.target.value.replace(/\D/g, '').slice(0, 2))
                        }
                        inputMode="numeric"
                        placeholder="Eg: 12"
                        className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted">Credit Limit (optional)</label>
                    <input
                      value={limit}
                      onChange={(e) => setLimit(e.target.value.replace(/[^\d]/g, ''))}
                      inputMode="numeric"
                      placeholder="Eg: 200000"
                      className="mt-2 w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none text-sm"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <LuxButton onClick={onAdd} disabled={!canSave}>
                      Add to Vault
                    </LuxButton>
                    <div className="text-xs text-muted">
                      We never store full card number or CVV. Only bank + card name + last4.
                    </div>
                  </div>
                </div>
              </LuxCard>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
