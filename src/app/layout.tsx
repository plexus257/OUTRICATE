import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OUTRICATE — Revenue Infrastructure for B2B",
  description:
    "OUTRICATE finds qualified leads, contacts them, and books meetings on your calendar — so you only show up to close. Revenue infrastructure that replaces your SDR team.",
  keywords: [
    "revenue infrastructure",
    "lead generation",
    "sales automation",
    "meeting booking",
    "B2B pipeline",
    "outbound sales",
    "SDR replacement",
    "sales automation platform",
  ],
  openGraph: {
    title: "OUTRICATE — Revenue Infrastructure for B2B",
    description:
      "We find leads, contact them, and book meetings on your calendar — automatically.",
    type: "website",
    locale: "en_US",
    siteName: "OUTRICATE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
