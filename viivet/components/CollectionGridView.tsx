"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";

interface Props {
  onProductClick: (idx: number) => void;
}

function openModal(idx: number) {
  window.dispatchEvent(
    new CustomEvent("vivet:open-modal", { detail: { idx } })
  );
}

export default function CollectionGridView({ onProductClick }: Props) {
  return (
    <section
      id="collection-grid"
      className="relative w-full min-h-screen bg-[#FAF7F0] py-32 px-6 lg:px-20 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="text-[#C8A84B] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            The Full Collection
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
            <em>Explore</em>
            <br />
            the collection.
          </h2>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="group relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              {/* Image — click scrolls to product section */}
              <button
                onClick={() => onProductClick(idx)}
                className="cursor-none w-full aspect-[3/4] relative overflow-hidden rounded-md mb-0 shadow-sm group-hover:shadow-xl transition-shadow duration-500"
              >
                <Image
                  src={`${product.imagePath}.jpg`}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Add to Cart overlay — appears on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 flex items-center justify-center py-4 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  style={{ background: "rgba(26,14,5,0.75)", backdropFilter: "blur(4px)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(idx);
                  }}
                >
                  <span
                    className="text-[#FAF7F0] text-xs tracking-[0.25em] uppercase flex items-center gap-2"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    Add to Cart
                  </span>
                </div>
              </button>

              {/* Product info */}
              <div className="text-center w-full px-2 pt-5">
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#C8A84B" }}
                >
                  {product.category}
                </p>
                <h3
                  className="text-[#1A0E05] text-lg lg:text-xl transition-colors duration-300 group-hover:text-[#C8A84B] cursor-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em" }}
                  onClick={() => onProductClick(idx)}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[#1A0E05]/50 text-sm mt-1 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {product.price}
                </p>

                {/* Persistent Add to Cart button below the card */}
                <button
                  onClick={() => openModal(idx)}
                  className="w-full py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    border: "1px solid rgba(26,14,5,0.2)",
                    color: "#1A0E05",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#1A0E05";
                    (e.currentTarget as HTMLButtonElement).style.color = "#FAF7F0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#1A0E05";
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
