"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gifts", label: "Gifts" },
  { href: "/creators", label: "Creators" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = useWishlist();
  const wishlistCount = state.items.length;

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/60"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
            onClick={closeMobile}
          >
            Wishara
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: wishlist + hamburger */}
          <div className="flex items-center gap-3">
            {/* Wishlist button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary-500 text-white text-[10px] font-bold leading-none"
                  aria-hidden="true"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            mobileOpen ? "max-h-60 pb-4" : "max-h-0",
          )}
          aria-hidden={!mobileOpen}
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  onClick={closeMobile}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <WishlistDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
