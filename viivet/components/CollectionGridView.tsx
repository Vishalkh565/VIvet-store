"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";

interface Props {
  onProductClick: (idx: number) => void;
}

// Read at module level — NEXT_PUBLIC_ vars are inlined by the bundler
const shopifyConfigured = Boolean(
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN
);

/** Shopify-powered grid — only rendered when credentials are configured */
function ShopifyGrid() {
  return (
    <shopify-list-context type="product" query="products" first="12">
      <template
        dangerouslySetInnerHTML={{
          __html: `
            <div 
              class="group cursor-none relative flex flex-col items-center"
              onclick="document.getElementById('product-modal').showModal(); document.getElementById('product-modal-context').update(event);"
            >
              <div class="w-full aspect-[3/4] relative overflow-hidden rounded-md mb-6 shadow-sm" style="transition:box-shadow 0.5s">
                <shopify-media 
                  width="400" 
                  height="533" 
                  query="product.selectedOrFirstAvailableVariant.image" 
                  layout="constrained"
                  class="w-full h-full object-cover"
                  style="transition:transform 0.7s ease-out"
                ></shopify-media>
              </div>
              <div class="text-center w-full px-2">
                <p class="text-xs uppercase mb-2" style="font-family:'Outfit',sans-serif;color:#C8A84B;letter-spacing:0.2em">
                  <shopify-data query="product.vendor"></shopify-data>
                </p>
                <h3 class="text-lg" style="font-family:'Cormorant Garamond',serif;color:#1A0E05;letter-spacing:0.02em">
                  <shopify-data query="product.title"></shopify-data>
                </h3>
                <p class="text-sm mt-1" style="font-family:'Outfit',sans-serif;color:rgba(26,14,5,0.5)">
                  <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                </p>
              </div>
            </div>
          `,
        }}
      />
      <div shopify-loading-placeholder="true">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-full aspect-[3/4] bg-[#1A0E05]/5 rounded-md mb-6" />
          <div className="w-24 h-3 bg-[#1A0E05]/5 rounded-full mb-2" />
          <div className="w-32 h-5 bg-[#1A0E05]/5 rounded-full" />
        </div>
      </div>
    </shopify-list-context>
  );
}

/** Static fallback grid using local products data */
function StaticGrid({ onProductClick }: Props) {
  return (
    <>
      {products.map((product, idx) => (
        <motion.button
          key={product.id}
          onClick={() => onProductClick(idx)}
          className="group cursor-none relative flex flex-col items-center text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
        >
          <div className="w-full aspect-[3/4] relative overflow-hidden rounded-md mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
            <Image
              src={`${product.imagePath}.jpg`}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="text-center w-full px-2">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#C8A84B" }}
            >
              {product.category}
            </p>
            <h3
              className="text-[#1A0E05] text-lg lg:text-xl transition-colors duration-300 group-hover:text-[#C8A84B]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.02em",
              }}
            >
              {product.name}
            </h3>
            <p
              className="text-[#1A0E05]/50 text-sm mt-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {product.price}
            </p>
          </div>
        </motion.button>
      ))}
    </>
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
            <em>Click any piece</em>
            <br />
            to explore.
          </h2>
        </motion.div>

        {/* Grid — Shopify live data when configured, static fallback otherwise */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
          {shopifyConfigured ? (
            <ShopifyGrid />
          ) : (
            <StaticGrid onProductClick={onProductClick} />
          )}
        </div>
      </div>
    </section>
  );
}
