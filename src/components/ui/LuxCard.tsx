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
      className={`rounded-xl2 border border-line bg-panel backdrop-blur-xl shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
