"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, Gift, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { state, removeItem, clear, totalPrice } = useWishlist();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap + Escape to close
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when opened
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const itemCount = state.items.length;

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        onClick={handleBackdropClick}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Your wishlist, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <ShoppingBag
              className="w-5 h-5 text-primary-500"
              aria-hidden="true"
            />
            <h2 className="font-heading text-lg font-bold text-neutral-900">
              Your Wishlist
            </h2>
            {itemCount > 0 && (
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-primary-100 text-primary-600 text-xs font-bold">
                {itemCount}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        {itemCount === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-50 mb-6">
              <Gift
                className="w-9 h-9 text-primary-400"
                aria-hidden="true"
              />
            </div>
            <p className="font-heading text-xl font-bold text-neutral-900">
              Your wishlist is empty
            </p>
            <p className="mt-2 text-neutral-500 max-w-xs">
              Browse gifts from your favorite creators and add them here.
            </p>
            <Link
              href="/gifts"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium shadow-sm hover:bg-primary-600 hover:shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Browse Gifts
            </Link>
          </div>
        ) : (
          <>
            {/* Items list */}
            <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-3" role="list">
              {state.items.map((item) => (
                <li
                  key={item.gift.id}
                  className="flex gap-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.gift.imageUrl}
                      alt={item.gift.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 text-sm truncate">
                      {item.gift.name}
                    </p>
                    <p className="mt-0.5 text-primary-500 font-bold text-sm">
                      {formatPrice(item.gift.price)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Qty: {item.quantity}
                      </p>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.gift.id)}
                    className="flex-shrink-0 self-center inline-flex items-center justify-center w-8 h-8 rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    aria-label={`Remove ${item.gift.name} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-neutral-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Total</span>
                <span className="font-heading text-xl font-bold text-neutral-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={clear}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-neutral-200 text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => alert("Checkout coming soon! This is a demo.")}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary-500 text-white text-sm font-medium shadow-sm hover:bg-primary-600 hover:shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Gift All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}
