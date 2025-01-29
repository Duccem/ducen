import '@/assets/globals.css';
import icon from '@/assets/lumen-dark.png';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lumen code',
  description: 'Make your ideas come to life',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" href={icon.src} sizes="any" />
      <body
        className={`${nunito.className} antialiased box-border`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}

