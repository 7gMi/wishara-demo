import Image from "next/image";
import { CheckCircle, Users, Gift } from "lucide-react";
import { cn, formatCount } from "@/lib/utils";
import type { Creator } from "@/lib/types";

interface CreatorHeroProps {
  creator: Creator;
}

export function CreatorHero({ creator }: CreatorHeroProps) {
  return (
    <section aria-label={`${creator.name}'s profile`}>
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-2xl bg-neutral-200">
        <Image
          src={creator.banner}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Profile info */}
      <div className="relative bg-white px-6 pb-6 pt-14 md:px-8 md:pb-8 rounded-b-2xl border border-t-0 border-neutral-200">
        {/* Avatar — overlaps banner */}
        <div className="absolute -top-12 left-6 md:left-8">
          <div className="relative w-24 h-24">
            <Image
              src={creator.avatar}
              alt={`${creator.name}'s profile photo`}
              width={96}
              height={96}
                  className="rounded-full ring-4 ring-white object-cover w-24 h-24"
            />
          </div>
        </div>

        {/* Name + handle + verified */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1
              className={cn(
                "font-heading text-2xl font-bold text-neutral-900"
              )}
            >
              {creator.name}
            </h1>
            {creator.verified && (
              <CheckCircle
                className="w-5 h-5 text-primary-500 shrink-0"
                aria-label="Verified creator"
              />
            )}
          </div>
          <p className="text-sm text-neutral-400">@{creator.slug}</p>
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3 max-w-2xl">
          {creator.bio}
        </p>

        {/* Stats */}
        <div
          className="mt-5 flex items-center gap-6"
          aria-label="Creator statistics"
        >
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            <span className="font-semibold text-neutral-900">
              {formatCount(creator.followerCount)}
            </span>
            <span className="text-neutral-500">followers</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gift className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            <span className="font-semibold text-neutral-900">
              {formatCount(creator.giftCount)}
            </span>
            <span className="text-neutral-500">gifts sent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
