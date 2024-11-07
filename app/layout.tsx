import type { Metadata } from "next";
import type { Viewport } from 'next';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "User List",
  description: "A small assignment",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-cover bg-gradient-to-br from-slate-50 via-rose-50 via-85% to-rose-100">{children}</div>
      </body>
    </html>
  );
}
