"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { products, Product } from "@/data/products";

import Navbar from "@/components/Navbar";
import IntroVideoScroll from "@/components/IntroVideoScroll";
import CollectionGridView from "@/components/CollectionGridView";
import BestsellersSection from "@/components/BestsellersSection";
import ProductScrollExperience from "@/components/ProductScrollExperience";
import LookbookSection from "@/components/LookbookSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BuyNowSection from "@/components/BuyNowSection";
import TrustUSPSection from "@/components/TrustUSPSection";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import dynamic from "next/dynamic";
import AboutModal from "@/components/AboutModal";

const shopifyConfigured = Boolean(
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN
);
const ProductModal = dynamic(() => import("@/components/ProductModal"), { ssr: false });

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const isNavigating = useRef(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const isProductsView = useInView(productsRef, { margin: "-20% 0px -20% 0px" });

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const enter = () => setCursorHover(true);
    const leave = () => setCursorHover(false);

    window.addEventListener("mousemove", move);

    const buttons = document.querySelectorAll("button, a, [role='button']");
    buttons.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  // Active product color
  const currentTheme = products[activeProduct]?.themeColor ?? "#C8A84B";

  // Scroll to product section
  const scrollToProduct = useCallback((idx: number) => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    setActiveProduct(idx);
    const el = document.getElementById(`product-section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  }, []);

  // Cart operations
  const addToCart = useCallback((product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === id && i.size === size))
    );
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="cursor-dot"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          background: currentTheme,
          width: cursorHover ? 18 : 10,
          height: cursorHover ? 18 : 10,
          transition: "width 0.2s ease, height 0.2s ease, background 0.8s ease",
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          borderColor: `${currentTheme}60`,
          transition: "border-color 0.8s ease",
        }}
      />

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        themeColor={currentTheme}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
      />

      <main>
        {/* 1 — Intro Video / Canvas Scroll */}
        <IntroVideoScroll />

        {/* 2 — Collection Grid View (All 8 Projects) */}
        <CollectionGridView onProductClick={scrollToProduct} />

        {/* Bestsellers Section */}
        <BestsellersSection />

        {/* 3 — Product Scroll Experiences (8 products, 500vh each) */}
        <div ref={productsRef}>
          {products.map((product, idx) => (
            <ProductScrollExperience
              key={product.id}
              product={product}
              index={idx}
              onActiveChange={setActiveProduct}
            />
          ))}
        </div>

        {/* 4 — Lookbook */}
        <LookbookSection />

        {/* Customer Testimonials */}
        <TestimonialsSection />

        {/* 5 — Buy Now Section (active product) */}
        <BuyNowSection
          product={products[activeProduct]}
          onAddToCart={addToCart}
        />

        {/* Trust Badges & USP */}
        <TrustUSPSection />

        {/* 6 — Footer */}
        <Footer />
      </main>

      <AboutModal />
      <ProductModal />

      {/* Fixed bottom product navigation pill */}
      <AnimatePresence>
        {isProductsView && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(26, 14, 5, 0.85)",
                border: "1px solid rgba(200, 168, 75, 0.2)",
              }}
            >
              {/* Left arrow */}
              <button
                id="nav-prev-product"
                onClick={() => scrollToProduct(Math.max(0, activeProduct - 1))}
                className="w-6 h-6 flex items-center justify-center text-[#FAF7F0]/40 hover:text-[#C8A84B] transition-colors cursor-none"
                aria-label="Previous product"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Product dots */}
              <div className="flex items-center gap-2">
                {products.map((_, idx) => (
                  <motion.button
                    key={idx}
                    id={`nav-dot-${idx}`}
                    onClick={() => scrollToProduct(idx)}
                    animate={{
                      width: activeProduct === idx ? 20 : 6,
                      background: activeProduct === idx ? currentTheme : "rgba(250, 247, 240, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full cursor-none"
                    aria-label={`Go to product ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Right arrow */}
              <button
                id="nav-next-product"
                onClick={() => scrollToProduct(Math.min(products.length - 1, activeProduct + 1))}
                className="w-6 h-6 flex items-center justify-center text-[#FAF7F0]/40 hover:text-[#C8A84B] transition-colors cursor-none"
                aria-label="Next product"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Active product name */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeProduct}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-center mt-2 text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  color: "rgba(250, 247, 240, 0.5)",
                }}
              >
                {products[activeProduct]?.name}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
