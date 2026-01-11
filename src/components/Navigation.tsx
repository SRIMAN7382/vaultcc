'use client';

import { useRouter } from 'next/navigation';
import LuxButton from './ui/LuxButton';

type NavigationProps = {
  showBackToDashboard?: boolean;
  showLogout?: boolean;
  title?: string;
  subtitle?: string;
};

export default function Navigation({
  showBackToDashboard = false,
  showLogout = false,
  title,
  subtitle,
}: NavigationProps) {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/auth');
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-obsidian/80 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => router.push(showBackToDashboard ? '/dashboard' : '/')}
            className="flex items-center gap-3 group"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-vault/20 to-cyan/20 border border-vault/30 shadow-[0_0_24px_rgba(0,229,168,0.15)] grid place-items-center transition-all group-hover:shadow-[0_0_32px_rgba(0,229,168,0.25)] group-hover:scale-105">
              <span className="text-base font-bold bg-gradient-to-br from-vault to-cyan bg-clip-text text-transparent">
                V
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">VaultCC</div>
              <div className="text-xs text-muted/80">Smart Credit Intelligence</div>
            </div>
          </button>

          {(title || subtitle) && (
            <div className="flex-1 text-center hidden md:block">
              {title && <div className="text-lg font-semibold">{title}</div>}
              {subtitle && <div className="text-xs text-muted mt-0.5">{subtitle}</div>}
            </div>
          )}

          <div className="flex items-center gap-3">
            {showBackToDashboard && (
              <LuxButton variant="ghost" onClick={() => router.push('/dashboard')}>
                Dashboard
              </LuxButton>
            )}
            {showLogout && (
              <LuxButton variant="ghost" onClick={logout}>
                Logout
              </LuxButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
