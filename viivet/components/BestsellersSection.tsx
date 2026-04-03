"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";

// Top 3 distinct items mapped with their original global index
const bestsellers = [
  { p: products[0], idx: 0 },
  { p: products[6], idx: 6 },
  { p: products[4], idx: 4 },
];

export default function BestsellersSection() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-[#1A0E05] text-[#FAF7F0] border-t border-[#FAF7F0]/10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[#C8A84B] tracking-[0.3em] uppercase text-xs mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Curated Essentials
        </p>
        <h2 className="text-4xl lg:text-5xl" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Best Sellers
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-8">
        {bestsellers.map(({ p: product, idx }) => (
          <motion.div
            key={product.id}
            className="flex-1 flex flex-col items-center group cursor-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div 
              className="w-full aspect-[4/5] relative overflow-hidden mb-6 bg-[#C8A84B]/10 rounded-sm"
              onClick={() => window.dispatchEvent(new CustomEvent("vivet:open-modal", { detail: { idx } }))}
            >
              <Image
                src={`${product.imagePath}.jpg`}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 border border-[#C8A84B]/0 group-hover:border-[#C8A84B]/40 transition-colors duration-500 rounded-sm" />
            </div>
            <h3 
              className="text-xl mb-2 text-center transition-colors duration-300 group-hover:text-[#C8A84B]" 
              style={{ fontFamily: "Cormorant Garamond, serif", letterSpacing: "0.02em" }}
              onClick={() => window.dispatchEvent(new CustomEvent("vivet:open-modal", { detail: { idx } }))}
            >
              {product.name}
            </h3>
            <p className="text-xs tracking-wider opacity-50 uppercase mb-3 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
              {product.category}
            </p>
            <p className="text-[#C8A84B] text-sm font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
              {product.price}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
