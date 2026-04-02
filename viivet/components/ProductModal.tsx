"use client";

import { useEffect, useRef } from "react";

// Raw HTML for the product modal template — set via useEffect (client-only).
// Using dangerouslySetInnerHTML on <template> during SSR causes shopify-*
// elements to land in the live DOM, which triggers "not in a context template".
const TEMPLATE_HTML = `
  <div class="relative bg-[#FAF7F0] w-full max-w-4xl max-h-[90vh] overflow-y-auto m-auto p-0 flex flex-col md:flex-row shadow-2xl">

    <button
      onclick="document.getElementById('product-modal').close()"
      class="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
      style="background:rgba(255,255,255,0.8); border:1px solid rgba(26,14,5,0.1)"
      aria-label="Close"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A0E05" stroke-width="1.5">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>

    <div class="w-full md:w-1/2 flex items-center justify-center p-8" style="background:#F5F5F5">
      <shopify-media
        width="800"
        height="800"
        query="product.selectedOrFirstAvailableVariant.image"
        layout="constrained"
        class="w-full h-auto object-contain"
      ></shopify-media>
    </div>

    <div class="w-full md:w-1/2 flex flex-col" style="padding:2.5rem 3.5rem">
      <div style="margin-bottom:2rem">
        <span class="uppercase block" style="font-family:Outfit,sans-serif; font-size:10px; letter-spacing:0.3em; margin-bottom:0.5rem; color:#C8A84B">
          <shopify-data query="product.vendor"></shopify-data>
        </span>
        <h2 style="font-family:'Cormorant Garamond',serif; font-size:2.25rem; color:#1A0E05; margin-bottom:1rem; font-weight:300">
          <shopify-data query="product.title"></shopify-data>
        </h2>
        <div style="font-family:Outfit,sans-serif; font-size:1.25rem; font-weight:300; color:rgba(26,14,5,0.6)">
          <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
        </div>
      </div>

      <div style="margin-bottom:2.5rem">
        <shopify-variant-selector></shopify-variant-selector>
      </div>

      <div class="flex flex-col" style="gap:1rem; margin-top:auto">
        <button
          shopify-add-to-cart
          shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
          class="w-full uppercase transition-colors"
          style="padding:1rem; background:#1A0E05; color:#FAF7F0; font-family:Outfit,sans-serif; font-size:0.75rem; letter-spacing:0.3em; border:none; cursor:pointer"
        >Add to Cart</button>
        <button
          shopify-buy-now
          shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
          class="w-full uppercase transition-colors"
          style="padding:1rem; background:transparent; color:#1A0E05; font-family:Outfit,sans-serif; font-size:0.75rem; letter-spacing:0.3em; border:1px solid rgba(26,14,5,0.2); cursor:pointer"
        >Buy Now</button>
      </div>

      <div style="margin-top:3rem; padding-top:2rem; border-top:1px solid rgba(26,14,5,0.05)">
        <div style="font-family:Outfit,sans-serif; font-size:0.875rem; line-height:1.75; color:rgba(26,14,5,0.7)">
          <shopify-data query="product.descriptionHtml"></shopify-data>
        </div>
      </div>
    </div>

  </div>
`;

export default function ProductModal() {
  const templateRef = useRef<HTMLTemplateElement>(null);

  useEffect(() => {
    // Populate template only on the client — this keeps all shopify-* elements
    // out of the SSR HTML so the SDK never finds them outside a template context.
    if (templateRef.current && !templateRef.current.innerHTML.trim()) {
      templateRef.current.innerHTML = TEMPLATE_HTML;
    }
  }, []);

  return (
    <dialog
      id="product-modal"
      className="product-modal p-0 rounded-sm border-0 bg-transparent backdrop:bg-[#1A0E05]/60 backdrop:backdrop-blur-sm"
    >
      <shopify-context id="product-modal-context" type="product" wait-for-update>
        <template ref={templateRef} />
        <div shopify-loading-placeholder="true" className="p-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A84B] mx-auto" />
        </div>
      </shopify-context>
    </dialog>
  );
}
