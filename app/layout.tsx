import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CO-Grow Machinery Co.,Ltd",
  description: "CO-Grow Machinery Co.,Ltd",
  icons: {
    icon: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
    shortcut: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
    apple: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
  },
};

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
        {children}
      </body>
    </html>
  );
}
