import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Standard Model — Modular Physics Framework",
    template: "%s | YonedaAI Research",
  },
  description:
    "A four-paper research series presenting the Standard Model of particle physics through the lens of modular composition — matter, anti-matter, gauge synthesis, and unified structure.",
  metadataBase: new URL("https://standard-model.yonedaai.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "YonedaAI Research",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
