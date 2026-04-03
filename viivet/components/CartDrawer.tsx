"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { createShopifyCheckout } from "@/lib/shopify";

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove }: Props) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = items.reduce((sum, item) => {
    const price = parseInt(item.product.price.replace(/[^\d]/g, ""), 10);
    return sum + price * item.qty;
  }, 0);

  const handleCheckout = async () => {
    if (items.length === 0 || checkingOut) return;
    setCheckingOut(true);
    try {
      const url = await createShopifyCheckout(items, discountCode);
      if (url) {
        window.location.href = url;
      } else {
        // Fallback: send to store collections page
        window.open(`https://viivet.myshopify.com/collections/all`, "_blank");
      }
    } catch {
      window.open(`https://viivet.myshopify.com/collections/all`, "_blank");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 bg-[#1A0E05]/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            id="cart-drawer"
            className="fixed right-0 top-0 h-full w-[380px] max-w-[95vw] bg-[#FAF7F0] z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#C8A84B]/20">
              <div>
                <h2
                  className="text-[#1A0E05]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                  }}
                >
                  Your Selection
                </h2>
                <p className="text-[#1A0E05]/50 text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-[#1A0E05]/20 flex items-center justify-center cursor-none hover:border-[#C8A84B] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#1A0E05" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="1" className="mb-4 opacity-40">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-[#1A0E05]/40 text-sm tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0" style={{ background: item.product.gradient }}>
                        <Image
                          src={`${item.product.imagePath}.jpg`}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[#1A0E05] font-medium text-sm leading-tight mb-1 truncate"
                          style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}
                        >
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[#1A0E05]/50 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                          Size: {item.size} · Qty: {item.qty}
                        </p>
                        <p className="text-sm font-medium" style={{ color: item.product.themeColor, fontFamily: "Outfit, sans-serif" }}>
                          {item.product.price}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        id={`cart-remove-${item.product.id}-${item.size}`}
                        onClick={() => onRemove(item.product.id, item.size)}
                        className="self-start w-7 h-7 rounded-full flex items-center justify-center text-[#1A0E05]/30 hover:text-[#1A0E05] hover:bg-[#1A0E05]/5 transition-all cursor-none"
                        aria-label="Remove item"
                      >
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 pb-8 pt-6 border-t border-[#C8A84B]/20">
              {/* Discount Code */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-[#1A0E05]/10 rounded-xl text-sm bg-transparent outline-none focus:border-[#C8A84B]/50 transition-colors tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:text-[#1A0E05]/30 cursor-none"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1A0E05" }}
                />
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-[#1A0E05]/60 tracking-wider uppercase" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Subtotal
                </span>
                <span
                  className="text-xl"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#1A0E05", fontWeight: 400 }}
                >
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout button */}
              <motion.button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={items.length === 0 || checkingOut}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(1.05)" }}
                className="w-full py-4 rounded-xl font-medium text-sm tracking-[0.2em] uppercase cursor-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: "#C8A84B",
                  color: "#FAF7F0",
                }}
              >
                {checkingOut ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Preparing Checkout...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </motion.button>

              <p className="text-center text-xs text-[#1A0E05]/40 mt-4 tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>
                Free shipping on all orders
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
