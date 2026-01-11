export type VaultCard = {
  id: string;
  bank: string;
  cardName: string;
  last4: string;
  limit?: number; // optional
  billingDay?: number; // 1-28 optional
  createdAt: string;
};

const KEY = 'vaultcc_cards_v1';

export function getCards(): VaultCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as VaultCard[]) : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: VaultCard[]) {
  localStorage.setItem(KEY, JSON.stringify(cards));
}

export function addCard(card: VaultCard) {
  const cards = getCards();
  saveCards([card, ...cards]);
}

export function deleteCard(id: string) {
  const cards = getCards().filter((c) => c.id !== id);
  saveCards(cards);
}
