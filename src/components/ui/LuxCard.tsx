'use client';

export default function LuxCard({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)_inset] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.14] ${className}`}
    >
      {children}
    </div>
  );
}
