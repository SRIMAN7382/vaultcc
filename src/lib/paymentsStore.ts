export type VaultPayment = {
  id: string;
  billId: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  createdAt: string;
};

const KEY = 'vaultcc_payments_v1';

export function getPayments(): VaultPayment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as VaultPayment[]) : [];
  } catch {
    return [];
  }
}

export function addPayment(p: VaultPayment) {
  const payments = getPayments();
  localStorage.setItem(KEY, JSON.stringify([p, ...payments]));
}

/** ✅ THIS WAS MISSING */
export function getPaymentById(id: string): VaultPayment | null {
  return getPayments().find((p) => p.id === id) ?? null;
}
