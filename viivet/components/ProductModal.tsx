"use client";

// Pure React product modal — no Shopify Web Components SDK required.
// Opens as a <dialog> element. Product data is passed via a custom
// "vivet:open-modal" event dispatched by CollectionGridView or BestsellersSection.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products, Product } from "@/data/products";

export default function ProductModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  // Listen for open-modal events (dispatched from product cards)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ idx: number }>).detail;
      const p = products[detail.idx] ?? products[0];
      setProduct(p);
      setSelectedSize(p.sizes?.[0] ?? "");
      setAdded(false);
      dialogRef.current?.showModal();
    };
    window.addEventListener("vivet:open-modal", handler);
    return () => window.removeEventListener("vivet:open-modal", handler);
  }, []);

  const close = () => dialogRef.current?.close();

  const addToCart = () => {
    if (!product) return;
    window.dispatchEvent(
      new CustomEvent("vivet:add-to-cart", {
        detail: { product, size: selectedSize || "One Size" },
      })
    );
    setAdded(true);
    setTimeout(() => {
      close();
      setAdded(false);
    }, 1200);
  };

  const buyNow = () => {
    if (!product) return;
    const handle = product.name.toLowerCase().replace(/\s+/g, "-");
    window.open(`https://viivet.myshopify.com/products/${handle}`, "_blank");
  };

  return (
    <dialog
      ref={dialogRef}
      id="product-modal"
      className="product-modal p-0 rounded-sm border-0 bg-transparent backdrop:bg-[#1A0E05]/60 backdrop:backdrop-blur-sm"
      onClick={(e) => { if (e.target === dialogRef.current) close(); }}
    >
      {product && (
        <div className="relative bg-[#FAF7F0] w-full max-w-4xl max-h-[90vh] overflow-y-auto m-auto flex flex-col md:flex-row shadow-2xl">

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(26,14,5,0.1)" }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A0E05" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Product image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ background: "#F5F5F5" }}>
            <div className="relative w-full aspect-square">
              <Image
                src={`${product.imagePath}.jpg`}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="w-full md:w-1/2 flex flex-col" style={{ padding: "2.5rem 3.5rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span
                className="uppercase block"
                style={{ fontFamily: "Outfit,sans-serif", fontSize: 10, letterSpacing: "0.3em", marginBottom: "0.5rem", color: "#C8A84B" }}
              >
                {product.category}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.25rem", color: "#1A0E05", marginBottom: "1rem", fontWeight: 300 }}>
                {product.name}
              </h2>
              <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.25rem", fontWeight: 300, color: "rgba(26,14,5,0.6)" }}>
                {product.price}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "2.5rem" }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Outfit,sans-serif", color: "rgba(26,14,5,0.4)" }}>
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="px-4 py-2 text-xs uppercase tracking-widest transition-all"
                      style={{
                        fontFamily: "Outfit,sans-serif",
                        border: selectedSize === size ? "1px solid #1A0E05" : "1px solid rgba(26,14,5,0.15)",
                        background: selectedSize === size ? "#1A0E05" : "transparent",
                        color: selectedSize === size ? "#FAF7F0" : "#1A0E05",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col" style={{ gap: "1rem", marginTop: "auto" }}>
              <button
                onClick={addToCart}
                className="w-full uppercase transition-all duration-300"
                style={{
                  padding: "1rem",
                  background: added ? "#2D6A4F" : "#1A0E05",
                  color: "#FAF7F0",
                  fontFamily: "Outfit,sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={buyNow}
                className="w-full uppercase transition-colors"
                style={{ padding: "1rem", background: "transparent", color: "#1A0E05", fontFamily: "Outfit,sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", border: "1px solid rgba(26,14,5,0.2)", cursor: "pointer" }}
              >
                Buy Now
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(26,14,5,0.05)" }}>
                <p style={{ fontFamily: "Outfit,sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(26,14,5,0.7)" }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
