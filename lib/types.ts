export interface Creator {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  category: "gaming" | "art" | "music" | "tech" | "lifestyle" | "cooking";
  followerCount: number;
  giftCount: number;
  verified: boolean;
}

export type Tier = "bronze" | "silver" | "gold" | "platinum";

export interface Gift {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  tier: Tier;
  category: string;
  creatorId: string;
  tags: string[];
  gifted: boolean;
  giftedCount: number;
}

export interface WishlistItem {
  gift: Gift;
  quantity: number;
  addedAt: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}
