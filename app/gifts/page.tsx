"use client";

import { useState, useMemo, useCallback } from "react";
import { Gift as GiftIcon } from "lucide-react";
import { gifts as allGifts } from "@/lib/data";
import type { Gift, Tier } from "@/lib/types";
import { GiftFilters } from "@/components/gifts/GiftFilters";
import { GiftGrid } from "@/components/gifts/GiftGrid";
import { GiftDetailModal } from "@/components/gifts/GiftDetailModal";

type TierFilter = Tier | "all";

export default function GiftsPage() {
  const [activeTier, setActiveTier] = useState<TierFilter>("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const filteredGifts = useMemo(() => {
    return allGifts.filter((gift) => {
      const tierMatch = activeTier === "all" || gift.tier === activeTier;
      const categoryMatch =
        activeCategory === "all" || gift.category === activeCategory;
      return tierMatch && categoryMatch;
    });
  }, [activeTier, activeCategory]);

  const handleSelectGift = useCallback((gift: Gift) => {
    setSelectedGift(gift);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedGift(null);
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50">
              <GiftIcon
                className="w-5 h-5 text-primary-500"
                aria-hidden="true"
              />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
              Gift Gallery
            </h1>
          </div>
          <p className="text-neutral-600 text-lg max-w-2xl">
            Explore curated gifts across every tier. Find the perfect gift for
            your favorite creator.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <GiftFilters
            activeTier={activeTier}
            activeCategory={activeCategory}
            onTierChange={setActiveTier}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <p className="text-sm text-neutral-500">
          Showing{" "}
          <span className="font-semibold text-neutral-700">
            {filteredGifts.length}
          </span>{" "}
          {filteredGifts.length === 1 ? "gift" : "gifts"}
        </p>
      </div>

      {/* Gift grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <GiftGrid gifts={filteredGifts} onSelectGift={handleSelectGift} />
      </div>

      {/* Detail modal */}
      {selectedGift && (
        <GiftDetailModal gift={selectedGift} onClose={handleCloseModal} />
      )}
    </div>
  );
}
