import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://wishara-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Wishara — Creator Gifting Platform",
    template: "%s | Wishara",
  },
  description:
    "Discover and gift your favorite creators. Browse curated wishlists, send meaningful gifts, and support the creators you love.",
  openGraph: {
    type: "website",
    siteName: "Wishara",
    title: "Wishara — Creator Gifting Platform",
    description:
      "Discover and gift your favorite creators. Browse curated wishlists, send meaningful gifts, and support the creators you love.",
    url: BASE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wishara — Creator Gifting Platform",
    description:
      "Discover and gift your favorite creators. Browse curated wishlists, send meaningful gifts, and support the creators you love.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <WishlistProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-xl focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
