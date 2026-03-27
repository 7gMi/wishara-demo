import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { creators } from "@/lib/data";
import { formatCount } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  art: "bg-pink-100 text-pink-700",
  tech: "bg-blue-100 text-blue-700",
  music: "bg-purple-100 text-purple-700",
  gaming: "bg-green-100 text-green-700",
  lifestyle: "bg-amber-100 text-amber-700",
  cooking: "bg-orange-100 text-orange-700",
};

export function FeaturedCreators() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              id="featured-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              Featured Creators
            </h2>
            <p className="mt-2 text-neutral-500 text-lg">
              Discover the most-loved creators on Wishara
            </p>
          </div>
          <Link
            href="/creators"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
          >
            View all
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Scroll container */}
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          role="list"
          style={{ scrollbarWidth: "none" }}
        >
          {creators.map((creator) => (
            <article
              key={creator.id}
              role="listitem"
              className="flex-shrink-0 w-72 snap-start bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Banner */}
              <div className="relative h-28 w-full overflow-hidden">
                <Image
                  src={creator.banner}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="288px"
                />
              </div>

              {/* Avatar */}
              <div className="relative px-5 -mt-8">
                <Image
                  src={creator.avatar}
                  alt={`${creator.name}'s avatar`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-sm"
                />
              </div>

              {/* Info */}
              <div className="px-5 pt-3 pb-5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-neutral-900 truncate">
                    {creator.name}
                  </h3>
                  {creator.verified && (
                    <BadgeCheck
                      className="w-4.5 h-4.5 text-primary-500 flex-shrink-0"
                      aria-label="Verified creator"
                    />
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${categoryColors[creator.category] || "bg-neutral-100 text-neutral-600"}`}
                  >
                    {creator.category}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {formatCount(creator.followerCount)} followers
                  </span>
                </div>

                <Link
                  href={`/creator/${creator.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
                >
                  View Wishlist
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "View all" link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/creators"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
          >
            View all creators
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
