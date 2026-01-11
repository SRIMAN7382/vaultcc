import LuxButton from '@/components/ui/LuxButton';
import LuxCard from '@/components/ui/LuxCard';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top Bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/5 border border-line shadow-glow grid place-items-center">
            <span className="text-sm font-bold">V</span>
          </div>
          <div>
            <div className="text-sm font-semibold">VaultCC</div>
            <div className="text-xs text-muted">Ultra-Luxury Credit Intelligence</div>
          </div>
        </div>

        <div className="flex gap-3">
          <LuxButton variant="ghost">Compare</LuxButton>
          <LuxButton>Get Started</LuxButton>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-20 pt-10 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Smart Credit.{' '}
            <span className="bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent">
              Locked-in Rewards.
            </span>
          </h1>

          <p className="mt-6 text-muted text-lg">
            VaultCC is your premium command center for credit cards — track bills,
            optimize utilization and extract maximum rewards with luxury-grade experience.
          </p>

          <div className="mt-10 flex gap-4">
            <LuxButton>Continue with Mobile</LuxButton>
            <LuxButton variant="ghost">See Cards</LuxButton>
          </div>
        </div>

        {/* Preview Card */}
        <div className="relative">
          <div className="absolute -top-10 right-10 h-64 w-64 bg-vault/20 blur-3xl rounded-full" />
          <LuxCard className="p-6 relative z-10">
            <div className="text-sm font-semibold mb-4">VaultCC Dashboard</div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-line">
                <div className="text-xs text-muted">Next Due</div>
                <div className="text-xl font-semibold mt-1">₹12,840</div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-line">
                <div className="text-xs text-muted">Utilization</div>
                <div className="text-xl font-semibold mt-1">23%</div>
              </div>

              <div className="col-span-2 bg-white/5 p-4 rounded-xl border border-line">
                <div className="text-xs text-muted">Rewards this month</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-vault to-cyan bg-clip-text text-transparent mt-2">
                  ₹2,460
                </div>
              </div>
            </div>
          </LuxCard>
        </div>
      </section>
    </main>
  );
}
