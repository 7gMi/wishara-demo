"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Tier } from "@/lib/types";
import { categories } from "@/lib/data";

type TierFilter = Tier | "all";

interface GiftFiltersProps {
  activeTier: TierFilter;
  activeCategory: string;
  onTierChange: (tier: TierFilter) => void;
  onCategoryChange: (category: string) => void;
}

const tierFilters: { value: TierFilter; label: string; color: string }[] = [
  { value: "all", label: "All Tiers", color: "bg-primary-500 text-white" },
  { value: "bronze", label: "Bronze", color: "bg-[#CD7F32] text-white" },
  { value: "silver", label: "Silver", color: "bg-[#A8B5C4] text-white" },
  { value: "gold", label: "Gold", color: "bg-[#FFC527] text-neutral-900" },
  { value: "platinum", label: "Platinum", color: "bg-[#7C5FCF] text-white" },
];

export function GiftFilters({
  activeTier,
  activeCategory,
  onTierChange,
  onCategoryChange,
}: GiftFiltersProps) {
  const tierScrollRef = useRef<HTMLDivElement>(null);
  const catScrollRef = useRef<HTMLDivElement>(null);
  const [tierOverflow, setTierOverflow] = useState(false);
  const [catOverflow, setCatOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    if (tierScrollRef.current) {
      setTierOverflow(
        tierScrollRef.current.scrollWidth > tierScrollRef.current.clientWidth,
      );
    }
    if (catScrollRef.current) {
      setCatOverflow(
        catScrollRef.current.scrollWidth > catScrollRef.current.clientWidth,
      );
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  return (
    <div className="space-y-4" role="search" aria-label="Gift filters">
      {/* Tier filters */}
      <div>
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
          Tier
        </p>
        <div
          ref={tierScrollRef}
          className={cn(
            "flex gap-2 overflow-x-auto pb-1",
            tierOverflow && "scrollbar-hide",
          )}
          role="radiogroup"
          aria-label="Filter by tier"
        >
          {tierFilters.map((filter) => {
            const isActive = activeTier === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => onTierChange(filter.value)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                  isActive
                    ? filter.color
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category filters */}
      <div>
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
          Category
        </p>
        <div
          ref={catScrollRef}
          className={cn(
            "flex gap-2 overflow-x-auto pb-1",
            catOverflow && "scrollbar-hide",
          )}
          role="radiogroup"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                  isActive
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                )}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
