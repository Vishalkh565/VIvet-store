"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type InfoTab = "Shipping" | "Returns" | "Care Guide" | "Privacy Policy" | "Terms of Service" | null;

const infoContent: Record<NonNullable<InfoTab>, { title: string; content: React.ReactNode }> = {
  "Shipping": {
    title: "Shipping & Delivery",
    content: (
      <div className="space-y-6">
        <p>At Maison Tropicale, we ensure that every piece reaches you with the same care and intention with which it was crafted. All orders are processed within 1-2 business days.</p>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Domestic (India)</h4>
          <p>We offer complimentary standard shipping on all domestic orders, typically arriving within 3-5 business days. Express delivery (1-2 days) is available at checkout for ₹500.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>International</h4>
          <p>International shipping is calculated at checkout based on destination and weight. Delivery typically takes 5-10 business days. Please note that customs duties and taxes are the responsibility of the recipient.</p>
        </div>
      </div>
    ),
  },
  "Returns": {
    title: "Returns & Exchanges",
    content: (
      <div className="space-y-6">
        <p>We want you to be completely satisfied with your VIVET purchase. If for any reason you are not, we gladly accept returns and exchanges within 14 days of delivery.</p>
        <p>To be eligible for a return, your item must be unused, unwashed, and in the exact condition that you received it. It must also be in the original packaging with all tags attached.</p>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-[#1A0E05]/80">
          <li>Leather goods must not show any signs of wear or creasing.</li>
          <li>Apparel must be free of any odors, stains, or damage.</li>
        </ul>
        <p>To initiate a return, please contact our concierge team at support@vivet.com with your order number.</p>
      </div>
    ),
  },
  "Care Guide": {
    title: "Care Guide",
    content: (
      <div className="space-y-6">
        <p>Our pieces are crafted to become cherished staples in your wardrobe. Proper care will ensure their longevity and sustained beauty.</p>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Silk & Satin Blends</h4>
          <p>Dry clean only. Do not wash, bleach, or tumble dry. Iron on a cool setting on the reverse side if necessary, using a pressing cloth to protect the fibers.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Leather Goods</h4>
          <p>Full-grain leather naturally develops a patina over time. Keep away from direct heat and sustained moisture. If wet, let it dry naturally. Use a premium leather conditioner every 6 months to maintain suppleness.</p>
        </div>
      </div>
    ),
  },
  "Privacy Policy": {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6">
        <p>Last updated: October 2024</p>
        <p>VIVET ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Information We Collect</h4>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including Identity Data (name, username), Contact Data (billing/delivery address, email), and Financial Data (payment details are handled securely by Shopify).</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>How We Use Your Data</h4>
          <p>We use your data to process and deliver your order, manage our relationship with you, and send you details of our latest collections (if you opt-in to our newsletter).</p>
        </div>
      </div>
    ),
  },
  "Terms of Service": {
    title: "Terms of Service",
    content: (
      <div className="space-y-6">
        <p>By accessing or using vivet.com, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.</p>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Products & Pricing</h4>
          <p>We reserve the right to modify or discontinue any product without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the products.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>Accuracy of Information</h4>
          <p>We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
        </div>
      </div>
    ),
  },
};

export default function InfoModal() {
  const [activeTab, setActiveTab] = useState<InfoTab>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveTab(customEvent.detail?.tab || "Shipping");
    };
    window.addEventListener("open-info", handleOpen);
    return () => window.removeEventListener("open-info", handleOpen);
  }, []);

  if (!activeTab) return null;

  const currentContent = infoContent[activeTab];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop overlay */}
        <motion.div
          className="absolute inset-0 bg-[#1A0E05]/80 backdrop-blur-md cursor-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveTab(null)}
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
            onClick={() => setActiveTab(null)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A0E05" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <p className="text-[#C8A84B] tracking-[0.3em] uppercase text-xs mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
            Information
          </p>
          
          <h2 className="text-4xl text-[#1A0E05] mb-8" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            {currentContent.title}
          </h2>
          
          <div className="text-[#1A0E05]/80 leading-relaxed max-w-none text-sm md:text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
            {currentContent.content}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
