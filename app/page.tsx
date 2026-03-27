import { Hero } from "@/components/landing/Hero";
import { FeaturedCreators } from "@/components/landing/FeaturedCreators";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Wishara",
          url: "https://wishara-demo.vercel.app",
          description:
            "Discover and gift your favorite creators. Browse curated wishlists, send meaningful gifts.",
        }}
      />
      <Hero />
      <ScrollReveal>
        <FeaturedCreators />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <HowItWorks />
      </ScrollReveal>
    </>
  );
}
