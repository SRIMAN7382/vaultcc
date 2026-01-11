'use client';

import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/auth');
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted">VaultCC</div>
            <h1 className="mt-1 text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-muted">
              Next we build: Cards → Bills → Rewards → BBPS Pay.
            </p>
          </div>

          <LuxButton variant="ghost" onClick={logout}>
            Logout
          </LuxButton>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LuxCard className="p-6">
            <div className="text-xs text-muted">Cards</div>
            <div className="mt-2 text-2xl font-semibold">0</div>
            <div className="mt-2 text-xs text-muted">Add your first card</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Next Due</div>
            <div className="mt-2 text-2xl font-semibold">—</div>
            <div className="mt-2 text-xs text-muted">Connect bills</div>
          </LuxCard>

          <LuxCard className="p-6">
            <div className="text-xs text-muted">Rewards Value</div>
            <div className="mt-2 text-2xl font-semibold">—</div>
            <div className="mt-2 text-xs text-muted">Start tracking rewards</div>
          </LuxCard>
        </div>

        <div className="mt-6">
          <LuxButton onClick={() => router.push('/cards')}>Add Credit Card</LuxButton>
        </div>
      </div>
    </main>
  );
}
