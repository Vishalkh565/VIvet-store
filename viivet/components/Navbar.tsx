"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  cartCount: number;
  onCartOpen: () => void;
  themeColor: string;
}

export default function Navbar({ cartCount, onCartOpen, themeColor }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    
    // Listen for global open-cart event
    const openCartHandler = () => {
      onCartOpen();
    };
    window.addEventListener("open-cart", openCartHandler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("open-cart", openCartHandler);
    };
  }, []);

  return (
    <motion.header
      id="viivet-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250, 247, 240, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200, 168, 75, 0.25)" : "none",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Left — Mobile hamburger */}
        <button
          id="navbar-hamburger"
          className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          <span
            className="w-full h-px transition-all duration-300"
            style={{ background: scrolled ? "#1A0E05" : "#FAF7F0" }}
          />
          <span
            className="w-2/3 h-px transition-all duration-300"
            style={{ background: scrolled ? "#1A0E05" : "#FAF7F0" }}
          />
          <span
            className="w-full h-px transition-all duration-300"
            style={{ background: scrolled ? "#1A0E05" : "#FAF7F0" }}
          />
        </button>

        {/* Center — Wordmark */}
        <div 
          className="flex flex-col items-center cursor-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <motion.span
            className="tracking-[0.25em] uppercase leading-none"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              fontWeight: 400,
              color: scrolled ? "#1A0E05" : "#FAF7F0",
              transition: "color 0.5s ease",
            }}
          >
            VIVET
          </motion.span>
          <span
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "0.55rem",
              color: scrolled ? "#C8A84B" : "rgba(200,168,75,0.8)",
              letterSpacing: "0.35em",
              transition: "color 0.5s ease",
            }}
          >
            Maison Tropicale
          </span>
        </div>

        {/* Right — Cart + Shop */}
        <div className="flex items-center gap-4">
          {/* Shop button */}
          <motion.button
            id="navbar-shop-btn"
            whileHover={{ filter: "brightness(1.08)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden lg:flex items-center px-5 py-2 rounded-full border text-xs tracking-[0.2em] uppercase cursor-none transition-all duration-500"
            style={{
              fontFamily: "Outfit, sans-serif",
              borderColor: scrolled ? "#C8A84B" : "rgba(200,168,75,0.6)",
              color: scrolled ? "#C8A84B" : "rgba(200,168,75,0.9)",
            }}
            onClick={() => {
              document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop
          </motion.button>

          {/* Cart button */}
          <motion.button
            id="navbar-cart-btn"
            whileHover={{ filter: "brightness(1.08)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onCartOpen}
            className="relative w-10 h-10 flex items-center justify-center cursor-none"
            aria-label={`Cart with ${cartCount} items`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke={scrolled ? "#1A0E05" : "#FAF7F0"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-deep-brown font-medium"
                style={{ background: "#C8A84B", fontFamily: "Outfit, sans-serif" }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#FAF7F0] border-t border-[#C8A84B]/20"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {["Apparel", "Leather Goods", "About", "Lookbook"].map((item) => (
                <button
                  key={item}
                  className="text-left text-[#1A0E05] tracking-[0.2em] uppercase text-sm cursor-none"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item === "About") {
                      setTimeout(() => window.dispatchEvent(new CustomEvent("open-about")), 300);
                      return;
                    }
                    let target = "collection-grid";
                    if (item === "Lookbook") target = "lookbook-section";
                    setTimeout(() => {
                      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
