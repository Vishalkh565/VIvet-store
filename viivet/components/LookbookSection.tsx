"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export default function LookbookSection() {
  const lookbookImages = [
    { src: "/images/maison-shirt.jpg", label: "The Signature", sub: "Maison Tropicale" },
    { src: "/images/burgundy-shirt.jpg", label: "The Evening", sub: "Burgundy Satin" },
    { src: "/images/camel-trousers.jpg", label: "Refined Ease", sub: "Camel Trousers" },
    { src: "/images/cognac-belt.jpg", label: "The Detail", sub: "Cognac Belt" },
  ];

  return (
    <section id="lookbook-section" className="py-32 px-6 lg:px-20 bg-[#FAF7F0]">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[#C8A84B] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          The Collection
        </p>
        <h2
          className="text-[#1A0E05]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          <em>Worn with intention.</em>
          <br />
          Crafted for memory.
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {lookbookImages.map((img, i) => (
          <motion.div
            key={img.src}
            onClick={() => window.dispatchEvent(new CustomEvent("vivet:open-modal", { detail: { idx: i } }))}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: products[i % products.length].gradient,
              }}
            />
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E05]/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[#C8A84B] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                {img.sub}
              </p>
              <p
                className="text-[#FAF7F0]"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 400 }}
              >
                {img.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tagline divider */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="flex items-center gap-8 justify-center">
          <div className="flex-1 max-w-40 h-px bg-[#C8A84B]/30" />
          <p
            className="text-[#1A0E05]/40 text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Est. 2024 · Maison Tropicale
          </p>
          <div className="flex-1 max-w-40 h-px bg-[#C8A84B]/30" />
        </div>
      </motion.div>
    </section>
  );
}
