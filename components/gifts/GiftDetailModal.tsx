"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { X, Heart, Gift as GiftIcon } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Gift } from "@/lib/types";
import { creators } from "@/lib/data";
import { TierBadge } from "./TierBadge";
import { useWishlist } from "@/components/wishlist/WishlistContext";

interface GiftDetailModalProps {
  gift: Gift | null;
  onClose: () => void;
}

export function GiftDetailModal({ gift, onClose }: GiftDetailModalProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const inWishlist = gift ? isInWishlist(gift.id) : false;
  const creator = gift ? creators.find((c) => c.id === gift.creatorId) : null;

  // Manage enter/exit animation
  useEffect(() => {
    if (gift) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Trigger enter animation on next frame
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [gift]);

  // Focus trap
  useEffect(() => {
    if (!gift || !isVisible) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gift, isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleWishlistToggle = useCallback(() => {
    if (!gift) return;
    if (inWishlist) {
      removeItem(gift.id);
    } else {
      addItem(gift);
    }
  }, [gift, inWishlist, addItem, removeItem]);

  if (!gift) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-opacity duration-200 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Gift details: ${gift.name}`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden",
          "transition-all duration-200 ease-out",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full",
            "bg-white/80 backdrop-blur-sm text-neutral-600 hover:bg-white hover:text-neutral-900",
            "transition-all duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          )}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] bg-neutral-100">
          <Image
            src={gift.imageUrl}
            alt={gift.name}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
          <div className="absolute top-3 left-3">
            <TierBadge tier={gift.tier} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-neutral-900 font-heading">
                {gift.name}
              </h2>
              {creator && (
                <p className="text-sm text-neutral-500 mt-0.5">
                  by {creator.name}
                </p>
              )}
            </div>
            <span className="text-2xl font-bold text-primary-600 shrink-0">
              {formatPrice(gift.price)}
            </span>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {gift.description}
          </p>

          {gift.giftedCount > 0 && (
            <p className="text-xs text-neutral-500">
              Gifted {gift.giftedCount}{" "}
              {gift.giftedCount === 1 ? "time" : "times"}
            </p>
          )}

          {/* Tags */}
          {gift.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {gift.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-xs text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleWishlistToggle}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                inWishlist
                  ? "bg-primary-50 text-primary-600 border-2 border-primary-200 hover:bg-primary-100"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
              )}
              aria-pressed={inWishlist}
            >
              <Heart
                className={cn(
                  "w-4 h-4",
                  inWishlist && "fill-primary-500 text-primary-500",
                )}
                aria-hidden="true"
              />
              {inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </button>

            <button
              type="button"
              onClick={() => alert("Checkout coming soon! This is a demo.")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold",
                "bg-primary-500 text-white shadow-sm",
                "hover:bg-primary-600 hover:shadow-md",
                "active:bg-primary-700",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
              )}
            >
              <GiftIcon className="w-4 h-4" aria-hidden="true" />
              Gift This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
