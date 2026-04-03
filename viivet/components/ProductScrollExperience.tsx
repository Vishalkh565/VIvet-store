"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Product } from "@/data/products";
import { createShopifyCheckout } from "@/lib/shopify";

interface Props {
  product: Product;
  index: number;
  onActiveChange: (idx: number) => void;
}


export default function ProductScrollExperience({
  product,
  index,
  onActiveChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Notify parent which product is active
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((v) => {
      if (v > 0.05 && v < 0.95) {
        onActiveChange(index);
      }
    });
    return unsubscribe;
  }, [smoothProgress, index, onActiveChange]);

  // Image scale breathe
  const imageScale = useTransform(smoothProgress, [0, 1], [1.0, 1.06]);

  // Section opacities - tightly clamped so they do not overlap
  const s1Opacity = useTransform(smoothProgress, [0, 0.05, 0.20, 0.25], [0, 1, 1, 0]);
  const s2Opacity = useTransform(smoothProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0]);
  const s3Opacity = useTransform(smoothProgress, [0.50, 0.55, 0.70, 0.75], [0, 1, 1, 0]);
  const s4Opacity = useTransform(smoothProgress, [0.75, 0.80, 0.95, 1.0], [0, 1, 1, 0]);

  // Section Y movement - moves up while fading in, and moves further up while fading out
  const s1Y = useTransform(smoothProgress, [0, 0.05, 0.20, 0.25], [40, 0, 0, -40]);
  const s2Y = useTransform(smoothProgress, [0.25, 0.30, 0.45, 0.50], [40, 0, 0, -40]);
  const s3Y = useTransform(smoothProgress, [0.50, 0.55, 0.70, 0.75], [40, 0, 0, -40]);
  const s4Y = useTransform(smoothProgress, [0.75, 0.80, 0.95, 1.0], [40, 0, 0, -40]);

  const sectionData = [
    { key: "s1", opacity: s1Opacity, y: s1Y, data: product.section1 },
    { key: "s2", opacity: s2Opacity, y: s2Y, data: product.section2 },
    { key: "s3", opacity: s3Opacity, y: s3Y, data: product.section3 },
    { key: "s4", opacity: s4Opacity, y: s4Y, data: product.section4 },
  ];

  const textColor = product.textContrastColor;
  const mutedColor = product.textContrastColor + "B3"; // ~70% opacity hex
  const faintColor = product.textContrastColor + "4D"; // ~30% opacity hex

  return (
    <div
      ref={containerRef}
      id={`product-section-${index}`}
      className="relative h-[500vh]"
    >
      {/* Background gradient */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: product.gradient }}
      >
        {/* Two-column layout */}
        <div className="flex h-full">
          {/* Left — Product Image */}
          <div className="relative w-1/2 h-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              <Image
                src={`${product.imagePath}.jpg`}
                alt={product.name}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
          </div>

          {/* Right — Scroll-driven text */}
          <div 
            className="relative w-1/2 h-full flex flex-col justify-center px-12 lg:px-20"
            style={{ color: textColor }}
          >
            {/* Category pill */}
            <div className="mb-8">
              <span
                className="text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: textColor,
                  borderColor: faintColor,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Stats bar */}
            <div className="flex gap-8 mb-16">
              {product.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "Outfit, sans-serif", color: mutedColor }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "Outfit, sans-serif", color: textColor }}
                  >
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Animated text sections */}
            <div className="relative h-64">
              {sectionData.map(({ key, opacity, y, data }) => (
                <motion.div
                  key={key}
                  className="absolute inset-0 flex flex-col justify-start"
                  style={{ opacity, y }}
                >
                  <h2
                    className="text-section-hero mb-4"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: textColor,
                    }}
                  >
                    {data.title}
                  </h2>
                  {data.subtitle && (
                    <p
                      className="text-section-sub max-w-sm"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: mutedColor,
                      }}
                    >
                      {data.subtitle}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xs">
              {/* Price */}
              <p
                className="text-sm mb-2 w-full"
                style={{ fontFamily: "Outfit, sans-serif", color: mutedColor, letterSpacing: "0.05em" }}
              >
                {product.price}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xs">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("vivet:open-modal", { detail: { idx: index } })
                  )
                }
                className="flex-1 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: textColor,
                  color: product.gradient.includes("#F5EDD8") ? "#FAF7F0" : "#FAF7F0",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              >
                Add to Cart
              </button>
              <button
                disabled={checkingOut}
                onClick={async () => {
                  if (checkingOut) return;
                  setCheckingOut(true);
                  try {
                    const url = await createShopifyCheckout([{ product, qty: 1, size: "One Size" }]);
                    if (url) window.location.href = url;
                    else window.open(`https://viivet.myshopify.com/products/${product.shopifyHandle}`, "_blank");
                  } catch {
                    window.open(`https://viivet.myshopify.com/products/${product.shopifyHandle}`, "_blank");
                  } finally {
                    setCheckingOut(false);
                  }
                }}
                className="flex-1 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: "transparent",
                  color: textColor,
                  border: `1px solid ${faintColor}`,
                  cursor: checkingOut ? "wait" : "pointer",
                }}
                onMouseEnter={(e) => { if(!checkingOut) (e.currentTarget as HTMLButtonElement).style.borderColor = textColor; }}
                onMouseLeave={(e) => { if(!checkingOut) (e.currentTarget as HTMLButtonElement).style.borderColor = faintColor; }}
              >
                {checkingOut ? (
                  <>
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Wait...
                  </>
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>

            {/* Product index */}
            <div className="mt-8">
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "Outfit, sans-serif", color: faintColor }}
              >
                {String(index + 1).padStart(2, "0")} / 08
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
