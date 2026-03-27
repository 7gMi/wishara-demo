"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { Gift, WishlistItem } from "@/lib/types";

/* ── State ────────────────────────────────────── */

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = { items: [] };

/* ── Actions ──────────────────────────────────── */

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Gift }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR" };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.gift.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.gift.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { gift: action.payload, quantity: 1, addedAt: new Date().toISOString() },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((i) => i.gift.id !== action.payload),
      };

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

/* ── Context ──────────────────────────────────── */

interface WishlistContextValue {
  state: WishlistState;
  addItem: (gift: Gift) => void;
  removeItem: (giftId: string) => void;
  clear: () => void;
  isInWishlist: (giftId: string) => boolean;
  totalPrice: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/* ── Provider ─────────────────────────────────── */

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addItem = useCallback((gift: Gift) => {
    dispatch({ type: "ADD_ITEM", payload: gift });
  }, []);

  const removeItem = useCallback((giftId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: giftId });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const isInWishlist = useCallback(
    (giftId: string) => state.items.some((i) => i.gift.id === giftId),
    [state.items],
  );

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.gift.price * item.quantity,
    0,
  );

  return (
    <WishlistContext value={{ state, addItem, removeItem, clear, isInWishlist, totalPrice }}>
      {children}
    </WishlistContext>
  );
}

/* ── Hook ─────────────────────────────────────── */

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
