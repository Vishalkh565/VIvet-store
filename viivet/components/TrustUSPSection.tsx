"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    title: "Global Delivery",
    subtitle: "Complimentary, tracked and fully insured.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Lifetime Guarantee",
    subtitle: "On all leather goods against defects.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    subtitle: "Encrypted 256-bit safe transactions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Artisan Craft",
    subtitle: "Small batch, handmade production.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function TrustUSPSection() {
  return (
    <section className="py-20 bg-[#1A0E05] border-t border-[#C8A84B]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-[#FAF7F0]">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C8A84B] opacity-80">
              {b.icon}
            </div>
            <h4
              className="text-[0.8rem] tracking-widest uppercase mb-3 text-[#FAF7F0]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {b.title}
            </h4>
            <p
              className="text-xs opacity-50 px-4 leading-relaxed"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {b.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
