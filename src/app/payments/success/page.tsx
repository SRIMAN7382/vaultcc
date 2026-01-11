'use client';

import LuxCard from '@/components/ui/LuxCard';
import LuxButton from '@/components/ui/LuxButton';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <LuxCard className="p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-vault">Payment Successful</h1>
        <p className="mt-4 text-muted">Your credit card bill has been paid.</p>

        <div className="mt-6">
          <LuxButton onClick={() => router.push('/bills')}>
            Back to Bills
          </LuxButton>
        </div>
      </LuxCard>
    </main>
  );
}
