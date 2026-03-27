"use client";

import { Gift as GiftIcon } from "lucide-react";
import type { Gift } from "@/lib/types";
import { GiftCard } from "./GiftCard";

interface GiftGridProps {
  gifts: Gift[];
  onSelectGift?: (gift: Gift) => void;
}

export function GiftGrid({ gifts, onSelectGift }: GiftGridProps) {
  if (gifts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 mb-4">
          <GiftIcon className="w-8 h-8 text-neutral-400" aria-hidden="true" />
        </div>
        <p className="font-heading text-lg font-semibold text-neutral-700">
          No gifts found
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gifts.map((gift, index) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          index={index}
          onSelect={onSelectGift}
        />
      ))}
    </div>
  );
}
