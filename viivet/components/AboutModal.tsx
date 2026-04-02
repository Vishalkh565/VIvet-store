"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-about", handleOpen);
    return () => window.removeEventListener("open-about", handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 bg-[#1A0E05]/80 backdrop-blur-md cursor-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <motion.div
            className="relative bg-[#FAF7F0] w-full max-w-2xl max-h-[85vh] overflow-y-auto m-6 p-10 md:p-14 rounded-sm shadow-2xl flex flex-col cursor-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A0E05" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <p className="text-[#C8A84B] tracking-[0.3em] uppercase text-xs mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
              Our Story
            </p>
            
            <h2 className="text-4xl text-[#1A0E05] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              The Essence of Maison Tropicale
            </h2>
            <p className="text-[#1A0E05]/80 leading-relaxed mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>
              Vivet is more than a luxury clothing brand; it is an invitation to an eternal summer. Born from a vision of uncompromising elegance, Vivet redefines tropical sophistication for the modern connoisseur. We believe that resort wear should not just complement your destination—it should elevate it.
            </p>

            <h3 className="text-2xl text-[#1A0E05] mb-4" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Unrivaled Craftsmanship
            </h3>
            <p className="text-[#1A0E05]/80 leading-relaxed mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>
              At the heart of Vivet is an obsession with top-tier quality. Every piece in our collection is a testament to masterful tailoring and premium materials. From our breathably lightweight, meticulously patterned shirts designed to catch the coastal breeze, to our artisanal leather belts and wallets crafted to age with grace, no detail is overlooked. Even our signature maroon packaging is designed to make every unboxing a high-end experience.
            </p>

            <h3 className="text-2xl text-[#1A0E05] mb-4" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Effortless Elegance
            </h3>
            <p className="text-[#1A0E05]/80 leading-relaxed mb-12" style={{ fontFamily: "Outfit, sans-serif" }}>
              Inspired by golden-hour sunsets, sun-drenched cobblestones, and the gentle sway of palm leaves, our garments blend relaxed coastal ease with high-fashion refinement. Whether you are stepping through the grand archways of a luxury villa or lounging by an azure coast, Vivet ensures you do so with effortless, timeless grace.
            </p>

            <div className="border-t border-[#1A0E05]/10 pt-10 text-center">
              <h4 className="text-xl text-[#C8A84B] italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Welcome to the art of the getaway. Welcome to Vivet.
              </h4>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
