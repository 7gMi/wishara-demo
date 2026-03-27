import { Search, Gift, Heart } from "lucide-react";
import type { ComponentType } from "react";

interface Step {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Browse",
    description: "Discover creators and explore their wishlists",
  },
  {
    icon: Gift,
    title: "Choose",
    description: "Pick the perfect gift from curated tiers",
  },
  {
    icon: Heart,
    title: "Send",
    description: "Gift directly and make their day",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-24 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900"
          >
            How it works
          </h2>
          <p className="mt-3 text-neutral-500 text-lg max-w-lg mx-auto">
            Three simple steps to brighten someone&apos;s day
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Dashed connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px border-t-2 border-dashed border-primary-200"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary-50 border-2 border-primary-100">
                    <Icon
                      className="w-10 h-10 text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold shadow-md"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-neutral-500 max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
