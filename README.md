# Wishara — Creator Gifting Platform Demo

A technical demo for a creator gifting platform, built to showcase modern frontend development skills.

**Live demo**: [wishara-demo.vercel.app](https://wishara-demo.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: Lucide React
- **Deployment**: Vercel

## Features

- **Gift Gallery** — Filterable by tier (Bronze/Silver/Gold/Platinum) and category, with interactive cards, hover effects, and detail modals
- **Creator Profiles** — Dynamic routes with `generateStaticParams`, banner, avatar, stats, and embedded wishlists
- **Wishlist Drawer** — Global state via React Context + `useReducer`, slide-over panel with add/remove/clear
- **Landing Page** — Hero with floating gift cards, featured creators carousel, "How it Works" section
- **Accessibility** — Skip-to-content, focus traps, ARIA labels, keyboard navigation, `prefers-reduced-motion` support
- **Responsive** — Mobile-first with breakpoints at sm/md/lg/xl

## Architecture

```
app/                    # Next.js App Router pages
  page.tsx              # Landing page
  gifts/page.tsx        # Gift gallery with filters
  creators/page.tsx     # Creators directory
  creator/[slug]/       # Dynamic creator profiles
components/
  gifts/                # GiftCard, GiftGrid, GiftFilters, GiftDetailModal, TierBadge
  creator/              # CreatorHero, CreatorGifts, CreatorCard
  landing/              # Hero, FeaturedCreators, HowItWorks
  wishlist/             # WishlistContext, WishlistDrawer
  layout/               # Navbar, Footer
  ui/                   # Button (reusable primitive)
lib/
  types.ts              # TypeScript interfaces
  data.ts               # Mock data (creators, gifts, categories)
  utils.ts              # cn(), formatPrice(), formatCount()
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What I Would Add Next

- Stripe Checkout integration for gift purchases
- Auth0 authentication for creator accounts
- Real API layer with loading states and error handling
- Search with debounced input
- Toast notifications for user feedback
- Dark mode
- E2E tests with Playwright
- Lighthouse CI integration

## Author

**Mihai Gaina** — [mihaigaina.dev](https://mihaigaina.dev)
