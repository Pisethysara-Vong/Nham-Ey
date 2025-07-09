// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nham Ey?',
  description: 'Find nearby restaurants, bars, and more around you using Google Maps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
