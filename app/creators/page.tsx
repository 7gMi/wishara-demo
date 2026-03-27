import { Users } from "lucide-react";
import { creators } from "@/lib/data";
import { CreatorCard } from "@/components/creator/CreatorCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creators",
  description:
    "Discover and support your favorite creators. Browse wishlists and send meaningful gifts.",
  openGraph: {
    title: "Creators | Wishara",
    description:
      "Discover the most-loved creators on Wishara. Browse their wishlists and send gifts they actually want.",
  },
  alternates: {
    canonical: "/creators",
  },
};

export default function CreatorsPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-50">
              <Users
                className="w-5 h-5 text-secondary-500"
                aria-hidden="true"
              />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
              Creators
            </h1>
          </div>
          <p className="text-neutral-600 text-lg max-w-2xl">
            Discover the most-loved creators on Wishara. Browse their wishlists
            and send gifts they actually want.
          </p>
        </div>
      </div>

      {/* Creators grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
