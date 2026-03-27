import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Gallery",
  description:
    "Explore curated gifts across every tier. Find the perfect gift for your favorite creator on Wishara.",
  openGraph: {
    title: "Gift Gallery | Wishara",
    description:
      "Explore curated gifts across every tier. Find the perfect gift for your favorite creator.",
  },
  alternates: {
    canonical: "/gifts",
  },
};

export default function GiftsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
