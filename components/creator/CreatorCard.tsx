import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users } from "lucide-react";
import { cn, formatCount } from "@/lib/utils";
import type { Creator } from "@/lib/types";

const categoryLabels: Record<Creator["category"], string> = {
  gaming: "Gaming",
  art: "Art & Design",
  music: "Music",
  tech: "Tech",
  lifestyle: "Lifestyle",
  cooking: "Cooking",
};

interface CreatorCardProps {
  creator: Creator;
  className?: string;
}

export function CreatorCard({ creator, className }: CreatorCardProps) {
  return (
    <Link
      href={`/creator/${creator.slug}`}
      className={cn(
        "group block rounded-2xl overflow-hidden",
        "bg-white border border-neutral-200",
        "shadow-sm hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className
      )}
      aria-label={`View ${creator.name}'s profile`}
    >
      {/* Gradient banner */}
      <div
        className="h-20 bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="relative px-4 pb-4 pt-10">
        {/* Avatar */}
        <div className="absolute -top-8 left-4">
          <Image
            src={creator.avatar}
            alt={`${creator.name}'s profile photo`}
            width={64}
            height={64}
            className="rounded-full ring-3 ring-white object-cover w-16 h-16"
          />
        </div>

        {/* Name + verified */}
        <div className="flex items-center gap-1.5">
          <h3 className="font-heading font-bold text-neutral-900 text-sm truncate">
            {creator.name}
          </h3>
          {creator.verified && (
            <CheckCircle
              className="w-4 h-4 text-primary-500 shrink-0"
              aria-label="Verified creator"
            />
          )}
        </div>

        {/* Category */}
        <p className="text-xs text-neutral-500 mt-0.5">
          {categoryLabels[creator.category]}
        </p>

        {/* Followers */}
        <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-500">
          <Users className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            <span className="font-semibold text-neutral-700">
              {formatCount(creator.followerCount)}
            </span>{" "}
            followers
          </span>
        </div>
      </div>
    </Link>
  );
}
