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
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-vault/40 disabled:opacity-60 disabled:cursor-not-allowed';

  const primary =
    'bg-gradient-to-r from-vault to-cyan text-black shadow-glow hover:shadow-glow2 hover:-translate-y-[1px] active:translate-y-0';

  const ghost = 'border border-line bg-white/0 text-white hover:bg-white/5';

  return (
    <button
      className={`${base} ${variant === 'primary' ? primary : ghost} ${className}`}
      {...props}
    />
  );
}
