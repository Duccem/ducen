import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/assets/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ducen labs",
  description: "Make your ideas come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${nunito.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
