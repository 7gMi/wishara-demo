import { cn } from "@/lib/utils";
import type { Tier } from "@/lib/types";
import { Star, Diamond, Crown, Gem } from "lucide-react";
import type { ComponentType } from "react";

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

const tierConfig: Record<
  Tier,
  {
    label: string;
    icon: ComponentType<{ className?: string }>;
    bg: string;
    text: string;
    shimmer: boolean;
  }
> = {
  bronze: {
    label: "Bronze",
    icon: Star,
    bg: "bg-[#CD7F32]/15",
    text: "text-[#CD7F32]",
    shimmer: false,
  },
  silver: {
    label: "Silver",
    icon: Diamond,
    bg: "bg-[#A8B5C4]/20",
    text: "text-[#6B7A8D]",
    shimmer: false,
  },
  gold: {
    label: "Gold",
    icon: Crown,
    bg: "bg-[#FFC527]/15",
    text: "text-[#B8860B]",
    shimmer: true,
  },
  platinum: {
    label: "Platinum",
    icon: Gem,
    bg: "bg-[#7C5FCF]/15",
    text: "text-[#7C5FCF]",
    shimmer: true,
  },
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold overflow-hidden backdrop-blur-sm",
        config.bg,
        config.text,
        className,
      )}
    >
      {config.shimmer && (
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none"
          aria-hidden="true"
        />
      )}
      <Icon className="w-3.5 h-3.5 relative" aria-hidden="true" />
      <span className="relative">{config.label}</span>
    </span>
  );
}
