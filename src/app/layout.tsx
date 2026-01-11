import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VaultCC',
  description: 'Smart Credit. Locked-in Rewards.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-white antialiased">{children}</body>
    </html>
  );
}
