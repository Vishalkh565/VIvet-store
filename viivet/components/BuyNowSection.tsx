"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export default function BuyNowSection({ product, onAddToCart }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <section
      id="buy-now-section"
      className="relative py-32 px-6 lg:px-20 overflow-hidden"
      style={{ background: "#1A0E05" }}
    >
      {/* Subtle product-color glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: product.themeColor }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left — Product image */}
        <motion.div
          className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0" style={{ background: product.gradient }} />
          <Image
            src={`${product.imagePath}.jpg`}
            alt={product.name}
            fill
            className="object-cover mix-blend-multiply"
          />
          {/* Material params tags */}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {product.buyNowSection.materialParams.map((param) => (
              <span
                key={param}
                className="px-3 py-1 rounded-full text-xs tracking-widest uppercase backdrop-blur-md"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: "rgba(250,247,240,0.15)",
                  color: "#FAF7F0",
                  border: "1px solid rgba(250,247,240,0.2)",
                }}
              >
                {param}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — Product info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          {/* Category */}
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: product.themeColor }}
          >
            {product.category}
          </p>

          {/* Name */}
          <h2
            className="text-[#FAF7F0] mb-3"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            {product.name}
          </h2>
          <p className="text-[#FAF7F0]/50 mb-6" style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.95rem" }}>
            {product.subName}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span
              className="text-4xl"
              style={{ fontFamily: "Cormorant Garamond, serif", color: product.themeColor, fontWeight: 400 }}
            >
              {product.buyNowSection.price}
            </span>
            <span className="text-sm text-[#FAF7F0]/40" style={{ fontFamily: "Outfit, sans-serif" }}>
              {product.buyNowSection.unit}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#FAF7F0]/60 text-sm leading-relaxed mb-8 max-w-md" style={{ fontFamily: "Outfit, sans-serif" }}>
            {product.detailsSection.description}
          </p>

          {/* Size selector */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#FAF7F0]/40 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <motion.button
                  key={s}
                  id={`buy-size-${s}`}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedSize(s)}
                  className="px-5 py-2.5 border rounded-lg text-sm transition-all duration-200 cursor-none"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    background: selectedSize === s ? product.themeColor : "transparent",
                    borderColor: selectedSize === s ? product.themeColor : "rgba(250,247,240,0.2)",
                    color: selectedSize === s ? "#FAF7F0" : "rgba(250,247,240,0.6)",
                  }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.button
              id="buy-now-add-cart"
              whileTap={{ scale: 0.97 }}
              whileHover={{ filter: "brightness(1.08)" }}
              onClick={() => onAddToCart(product, selectedSize)}
              className="flex-1 py-4 rounded-xl font-medium text-sm tracking-[0.2em] uppercase cursor-none"
              style={{
                fontFamily: "Outfit, sans-serif",
                background: product.themeColor,
                color: "#FAF7F0",
              }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              id="buy-now-buy"
              whileTap={{ scale: 0.97 }}
              whileHover={{ filter: "brightness(1.05)" }}
              className="flex-1 py-4 rounded-xl font-medium text-sm tracking-[0.2em] uppercase border cursor-none"
              style={{
                fontFamily: "Outfit, sans-serif",
                borderColor: product.themeColor,
                color: product.themeColor,
              }}
            >
              Buy Now
            </motion.button>
          </div>

          {/* Delivery + Return */}
          <div className="space-y-4 border-t border-[#FAF7F0]/10 pt-8">
            <div className="flex gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={product.themeColor} strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 5v3h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <p className="text-[#FAF7F0]/50 text-sm leading-relaxed" style={{ fontFamily: "Outfit, sans-serif" }}>
                {product.buyNowSection.deliveryPromise}
              </p>
            </div>
            <div className="flex gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={product.themeColor} strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <p className="text-[#FAF7F0]/50 text-sm leading-relaxed" style={{ fontFamily: "Outfit, sans-serif" }}>
                {product.buyNowSection.returnPolicy}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Craftsmanship section */}
      <motion.div
        className="relative max-w-4xl mx-auto mt-32 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-8 mb-10 justify-center">
          <div className="flex-1 max-w-40 h-px" style={{ background: `${product.themeColor}40` }} />
          <p className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "Outfit, sans-serif", color: product.themeColor }}>
            Craftsmanship
          </p>
          <div className="flex-1 max-w-40 h-px" style={{ background: `${product.themeColor}40` }} />
        </div>

        <h3
          className="text-[#FAF7F0] mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300 }}
        >
          {product.craftsmanshipSection.title}
        </h3>
        <p
          className="text-[#FAF7F0]/50 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.95rem" }}
        >
          {product.craftsmanshipSection.description}
        </p>
      </motion.div>
    </section>
  );
}
