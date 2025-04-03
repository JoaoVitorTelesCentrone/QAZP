import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QAZP',
  description: 'Sua página de criação de eventos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RedirectIfLoggedIn />
        <main>{children}</main>
        <Toaster richColors /> 
      </body>
    </html>
  );
}
