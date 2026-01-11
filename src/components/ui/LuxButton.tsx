'use client';

import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function LuxButton({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-vault/40 focus:ring-offset-2 focus:ring-offset-obsidian disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none';

  const primary =
    'bg-gradient-to-r from-vault via-vault to-cyan text-black shadow-[0_0_40px_rgba(0,229,168,0.35),0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(0,229,168,0.5),0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_30px_rgba(0,229,168,0.3)]';

  const ghost = 'border border-white/15 bg-white/0 text-white hover:bg-white/[0.07] hover:border-white/25 active:bg-white/[0.05]';

  return (
    <button
      className={`${base} ${variant === 'primary' ? primary : ghost} ${className}`}
      {...props}
    />
  );
}
