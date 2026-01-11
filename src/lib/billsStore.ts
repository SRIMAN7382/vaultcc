export type VaultBill = {
  id: string;
  cardId: string;
  amount: number;
  dueDate: string; // ISO date (yyyy-mm-dd)
  status: 'unpaid' | 'paid';
  createdAt: string;
};

const KEY = 'vaultcc_bills_v1';

export function getBills(): VaultBill[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as VaultBill[]) : [];
  } catch {
    return [];
  }
}

export function saveBills(bills: VaultBill[]) {
  localStorage.setItem(KEY, JSON.stringify(bills));
}

export function addBill(bill: VaultBill) {
  const bills = getBills();
  saveBills([bill, ...bills]);
}

export function deleteBill(id: string) {
  const bills = getBills().filter((b) => b.id !== id);
  saveBills(bills);
}

export function markPaid(id: string) {
  const bills = getBills().map((b) => (b.id === id ? { ...b, status: 'paid' as const } : b));
  saveBills(bills);
}
