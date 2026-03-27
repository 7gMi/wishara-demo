import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { creators, getCreatorBySlug, getGiftsByCreator } from "@/lib/data";
import { CreatorHero } from "@/components/creator/CreatorHero";
import { CreatorGifts } from "@/components/creator/CreatorGifts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return creators.map((creator) => ({
    slug: creator.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    return { title: "Creator Not Found | Wishara" };
  }

  const title = `${creator.name} — Wishlist`;

  return {
    title: creator.name,
    description: creator.bio,
    openGraph: {
      type: "profile",
      title,
      description: creator.bio,
      images: [{ url: creator.banner, width: 1200, height: 400, alt: `${creator.name} banner` }],
      url: `/creator/${creator.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: creator.bio,
      images: [creator.banner],
    },
    alternates: {
      canonical: `/creator/${creator.slug}`,
    },
  };
}

export default async function CreatorPage({ params }: PageProps) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  const gifts = getGiftsByCreator(creator.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CreatorHero creator={creator} />
      <CreatorGifts gifts={gifts} creatorName={creator.name} />
    </div>
  );
}
