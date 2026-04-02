"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";

interface HotspotDef {
  x: number; // percentage from left
  y: number; // percentage from top
  productIndex: number;
}

const hotspots: HotspotDef[] = [
  { x: 22, y: 40, productIndex: 0 },  // Maison Tropicale Shirt
  { x: 35, y: 35, productIndex: 1 },  // Burgundy Satin Shirt
  { x: 50, y: 55, productIndex: 2 },  // Camel Trousers
  { x: 65, y: 38, productIndex: 3 },  // Cable Knit Sweater
  { x: 75, y: 60, productIndex: 4 },  // Cognac Belt
  { x: 30, y: 68, productIndex: 5 },  // Green Card Holder
  { x: 55, y: 72, productIndex: 6 },  // Camel Bifold
  { x: 80, y: 45, productIndex: 7 },  // Tan Slim Wallet
  { x: 15, y: 62, productIndex: 0 },  // duplicate spot
  { x: 88, y: 70, productIndex: 4 },  // duplicate spot
];

interface Props {
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductHotspotView({ onAddToCart }: Props) {
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const activeProduct = activePanel !== null ? products[hotspots[activePanel].productIndex] : null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#1A0E05]">
      {/* Store Interior Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/store-interior.jpg"
          alt="VIIVET Maison Tropicale Boutique Interior"
          fill
          className="object-cover"
          priority
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A0E05]/40" />
      </div>

      {/* Section title overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="text-[#C8A84B] text-xs tracking-[0.4em] uppercase font-outfit mb-1">
          Inside the Maison
        </p>
        <h2
          className="text-[#FAF7F0]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 300,
          }}
        >
          Click any piece to explore
        </h2>
      </div>

      {/* Hotspot markers */}
      {hotspots.map((spot, i) => {
        const p = products[spot.productIndex];
        return (
          <div
            key={i}
            className="absolute z-20"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            {/* Hover label */}
            <AnimatePresence>
              {hoveredSpot === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: -8 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
                >
                  <div className="bg-[#1A0E05]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <p className="text-[#C8A84B] text-xs tracking-widest uppercase">
                      {p.name}
                    </p>
                    <p className="text-[#FAF7F0] text-xs opacity-70 text-center">
                      {p.price}
                    </p>
                  </div>
                  <div className="w-px h-2 bg-[#C8A84B] mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing dot */}
            <button
              id={`hotspot-${i}`}
              className="relative flex items-center justify-center cursor-none"
              onMouseEnter={() => setHoveredSpot(i)}
              onMouseLeave={() => setHoveredSpot(null)}
              onClick={() => setActivePanel(i)}
              aria-label={`View ${p.name}`}
            >
              {/* Outer ring */}
              <div
                className="animate-pulse-amber w-8 h-8 rounded-full border-2"
                style={{ borderColor: `${p.themeColor}80` }}
              />
              {/* Center dot */}
              <div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{ background: p.themeColor }}
              />
            </button>
          </div>
        );
      })}

      {/* Product panel slider */}
      <AnimatePresence>
        {activePanel !== null && activeProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="absolute inset-0 bg-[#1A0E05]/60 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePanel(null)}
            />

            {/* Sliding panel */}
            <motion.div
              key="panel"
              className="absolute right-0 top-0 h-full w-[420px] max-w-[95vw] bg-[#FAF7F0] z-40 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
            >
              {/* Close button */}
              <button
                id="hotspot-panel-close"
                onClick={() => setActivePanel(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#1A0E05]/10 flex items-center justify-center cursor-none hover:bg-[#1A0E05]/20 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#1A0E05" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Product image */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={`${activeProduct.imagePath}.jpg`}
                  alt={activeProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] to-transparent" />
              </div>

              {/* Content */}
              <div className="px-8 pb-10 -mt-6 relative">
                <p className="text-xs tracking-[0.3em] uppercase text-[#C8A84B] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {activeProduct.category}
                </p>
                <h3
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 400, color: "#1A0E05" }}
                >
                  {activeProduct.name}
                </h3>
                <p className="text-sm text-[#1A0E05]/60 mt-1 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {activeProduct.subName}
                </p>
                <p
                  className="text-2xl font-semibold mb-6"
                  style={{ color: activeProduct.themeColor, fontFamily: "Cormorant Garamond, serif" }}
                >
                  {activeProduct.price}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProduct.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full border border-[#C8A84B]/40 text-[#1A0E05]/70"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Size selector */}
                <p className="text-xs tracking-[0.2em] uppercase text-[#1A0E05]/50 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProduct.sizes.map((s) => (
                    <button
                      key={s}
                      id={`size-${s}-${activePanel}`}
                      className="px-4 py-2 border rounded text-sm transition-all cursor-none"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        background: selectedSizes[activePanel!] === s ? activeProduct.themeColor : "transparent",
                        borderColor: selectedSizes[activePanel!] === s ? activeProduct.themeColor : "#1A0E05",
                        color: selectedSizes[activePanel!] === s ? "#FAF7F0" : "#1A0E05",
                      }}
                      onClick={() =>
                        setSelectedSizes((prev) => ({ ...prev, [activePanel!]: s }))
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.button
                  id={`hotspot-add-cart-${activePanel}`}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ filter: "brightness(1.05)" }}
                  onClick={() => {
                    const size = selectedSizes[activePanel!] || activeProduct.sizes[0];
                    onAddToCart(activeProduct, size);
                    setActivePanel(null);
                  }}
                  className="w-full py-4 rounded-lg font-medium text-sm tracking-widest uppercase mb-3 cursor-none"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    background: activeProduct.themeColor,
                    color: "#FAF7F0",
                  }}
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  id={`hotspot-buy-now-${activePanel}`}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-lg font-medium text-sm tracking-widest uppercase border cursor-none"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: activeProduct.themeColor,
                    color: activeProduct.themeColor,
                  }}
                >
                  Buy Now
                </motion.button>

                {/* Action row */}
                <div className="flex justify-center gap-6 mt-4">
                  <button id={`hotspot-wishlist-${activePanel}`} className="text-[#1A0E05]/40 hover:text-[#C8A84B] transition-colors cursor-none" aria-label="Add to wishlist">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  <button id={`hotspot-share-${activePanel}`} className="text-[#1A0E05]/40 hover:text-[#C8A84B] transition-colors cursor-none" aria-label="Share product">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
