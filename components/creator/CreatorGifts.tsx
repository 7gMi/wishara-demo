"use client";

import Image from "next/image";
import { Gift as GiftIcon, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { TierBadge } from "@/components/gifts/TierBadge";
import type { Gift } from "@/lib/types";

interface CreatorGiftsProps {
  gifts: Gift[];
  creatorName: string;
}

function GiftCard({ gift }: { gift: Gift }) {
  return (
    <article
      className={cn(
        "group bg-white rounded-2xl border border-neutral-200 overflow-hidden",
        "shadow-sm hover:shadow-lg transition-all duration-300 ease-out",
        "hover:-translate-y-1 flex flex-col"
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={gift.imageUrl}
          alt={gift.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {gift.gifted && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            <Heart className="w-3 h-3 fill-current" aria-hidden="true" />
            Gifted
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">
            {gift.name}
          </h3>
          <TierBadge tier={gift.tier} className="shrink-0" />
        </div>

        <p className="text-xs text-neutral-500 line-clamp-2 mt-1 mb-3 flex-1">
          {gift.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-heading font-bold text-lg text-neutral-900">
            {formatPrice(gift.price)}
          </span>
          <button
            type="button"
            onClick={() => alert("Checkout coming soon! This is a demo.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors duration-200"
            aria-label={`Gift ${gift.name}`}
          >
            <GiftIcon className="w-4 h-4" aria-hidden="true" />
            Gift This
          </button>
        </div>

        {gift.giftedCount > 0 && (
          <p className="text-xs text-neutral-400 mt-2">
            Gifted {gift.giftedCount} {gift.giftedCount === 1 ? "time" : "times"}
          </p>
        )}
      </div>
    </article>
  );
}

export function CreatorGifts({ gifts, creatorName }: CreatorGiftsProps) {
  if (gifts.length === 0) {
    return (
      <section aria-label="Wishlist" className="mt-10">
        <h2 className="font-heading text-xl font-bold text-neutral-900">
          Wishlist
        </h2>
        <p className="mt-4 text-neutral-500 text-sm">
          {creatorName} hasn&apos;t added any gifts yet.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Wishlist" className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-heading text-xl font-bold text-neutral-900">
          Wishlist
        </h2>
        <span className="inline-flex items-center justify-center bg-primary-100 text-primary-700 text-xs font-semibold rounded-full px-2.5 py-0.5">
          {gifts.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}
