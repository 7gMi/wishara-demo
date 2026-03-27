"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Heart, Gift as GiftIcon, CheckCircle } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Gift } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { useWishlist } from "@/components/wishlist/WishlistContext";

interface GiftCardProps {
  gift: Gift;
  index: number;
  onSelect?: (gift: Gift) => void;
}

export function GiftCard({ gift, index, onSelect }: GiftCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const inWishlist = isInWishlist(gift.id);

  const handleWishlistToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inWishlist) {
        removeItem(gift.id);
      } else {
        addItem(gift);
      }
    },
    [inWishlist, gift, addItem, removeItem],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(gift);
      }
    },
    [gift, onSelect],
  );

  const staggerDelay = Math.min(index * 60, 600);

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        "opacity-0 animate-fade-up",
      )}
      style={{ animationDelay: `${staggerDelay}ms` }}
      onClick={() => onSelect?.(gift)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${gift.name}, ${formatPrice(gift.price)}, ${gift.tier} tier${gift.gifted ? ", already gifted" : ""}`}
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={gift.imageUrl}
          alt={gift.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-out",
            "group-hover:scale-105",
            gift.gifted && "saturate-[0.7]",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-primary-500/20 backdrop-blur-[2px]",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
          )}
          aria-hidden="true"
        >
          <span className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full text-sm font-semibold text-primary-600 shadow-lg">
            <GiftIcon className="w-4 h-4" />
            Gift This
          </span>
        </div>

        {/* Tier badge top-right */}
        <div className="absolute top-3 right-3 z-10">
          <TierBadge tier={gift.tier} />
        </div>

        {/* Gifted badge top-left */}
        {gift.gifted && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
              <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Gifted
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-neutral-900 truncate flex-1">
            {gift.name}
          </h3>
          <span className="text-sm font-bold text-primary-600 shrink-0">
            {formatPrice(gift.price)}
          </span>
        </div>

        {gift.giftedCount > 0 && (
          <p className="text-xs text-neutral-500">
            Gifted {gift.giftedCount} {gift.giftedCount === 1 ? "time" : "times"}
          </p>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={cn(
            "mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium",
            "transition-all duration-200 ease-out",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
            inWishlist
              ? "bg-primary-50 text-primary-600 hover:bg-primary-100"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
          )}
          aria-label={inWishlist ? `Remove ${gift.name} from wishlist` : `Add ${gift.name} to wishlist`}
          aria-pressed={inWishlist}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-200",
              inWishlist && "fill-primary-500 text-primary-500",
            )}
            aria-hidden="true"
          />
          {inWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </article>
  );
}
