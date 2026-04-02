"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shopLinks = ["Apparel", "Leather Goods", "Limited Edition", "Lookbook"];
const infoLinks = ["About VIVET", "Shipping", "Returns", "Care Guide"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toastMsg, setToastMsg] = useState("");

  const handleShopScroll = (link: string) => {
    let target = "collection-grid";
    if (link === "Lookbook") target = "lookbook-section";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInfoClick = (link: string) => {
    if (link === "About VIVET") {
      window.dispatchEvent(new CustomEvent("open-about"));
      return;
    }
    setToastMsg(`${link} information available at checkout.`);
    setTimeout(() => setToastMsg(""), 4000);
  };

  const handleSubscribe = () => {
    if (!email.includes("@")) {
      setSubscribeState("error");
      setTimeout(() => setSubscribeState("idle"), 3000);
      return;
    }
    setSubscribeState("loading");
    setTimeout(() => {
      setSubscribeState("success");
      setEmail("");
      setTimeout(() => setSubscribeState("idle"), 4000);
    }, 1500);
  };

  return (
    <footer className="relative" style={{ background: "#1A0E05" }}>
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#FAF7F0] text-[#1A0E05] px-6 py-3 rounded-lg text-sm tracking-wider z-50 shadow-xl border border-[#C8A84B]/20"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 — Brand */}
        <div>
          <h3
            className="text-[#C8A84B] tracking-[0.25em] uppercase mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 400 }}
          >
            VIVET
          </h3>
          <p
            className="text-[#FAF7F0]/40 text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Maison Tropicale — Est. 2024
          </p>
          <p className="text-[#FAF7F0]/40 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Outfit, sans-serif" }}>
            Luxury resort menswear and handcrafted leather goods. Made in small batches with deliberate intention.
          </p>
          {/* Social icons */}
          <div className="flex gap-4 mt-8">
            {["IG", "TW", "PT"].map((s) => (
              <button
                key={s}
                className="w-9 h-9 rounded-full border border-[#FAF7F0]/10 flex items-center justify-center text-[#FAF7F0]/40 hover:border-[#C8A84B]/50 hover:text-[#C8A84B] transition-all text-xs cursor-none"
                style={{ fontFamily: "Outfit, sans-serif" }}
                aria-label={s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2 — Shop */}
        <div>
          <p className="text-[#FAF7F0]/30 text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Shop
          </p>
          <ul className="space-y-3">
            {shopLinks.map((link) => (
              <li key={link}>
                <button
                  className="text-[#FAF7F0]/60 text-sm hover:text-[#C8A84B] transition-colors cursor-none"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                  onClick={() => handleShopScroll(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Information */}
        <div>
          <p className="text-[#FAF7F0]/30 text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Information
          </p>
          <ul className="space-y-3">
            {infoLinks.map((link) => (
              <li key={link}>
                <button
                  className="text-[#FAF7F0]/60 text-sm hover:text-[#C8A84B] transition-colors cursor-none"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                  onClick={() => handleInfoClick(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Newsletter */}
        <div>
          <p className="text-[#FAF7F0]/30 text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            The Edit
          </p>
          <p className="text-[#FAF7F0]/50 text-sm mb-6 leading-relaxed" style={{ fontFamily: "Outfit, sans-serif" }}>
            New arrivals, private sales, and stories from Maison Tropicale.
          </p>
          <div className="flex flex-col gap-3">
            <input
              id="footer-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/25 focus:outline-none transition-colors ${
                subscribeState === "error" ? "border-red-500/50" : "border-[#FAF7F0]/15 focus:border-[#C8A84B]/50"
              }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
              disabled={subscribeState === "loading" || subscribeState === "success"}
            />
            <motion.button
              id="footer-subscribe-btn"
              whileTap={{ scale: 0.97 }}
              whileHover={{ filter: "brightness(1.08)" }}
              onClick={handleSubscribe}
              disabled={subscribeState === "loading" || subscribeState === "success"}
              className="w-full py-3 border border-[#C8A84B]/60 rounded-lg text-xs tracking-[0.3em] uppercase text-[#C8A84B] hover:bg-[#C8A84B]/10 transition-colors cursor-none disabled:opacity-50"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {subscribeState === "loading" ? "Submitting..." : 
               subscribeState === "success" ? "Subscribed ✓" : 
               "Subscribe"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FAF7F0]/5">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#FAF7F0]/25 text-xs tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>
            © 2024 VIVET. All rights reserved.
          </p>
          <p className="text-[#FAF7F0]/25 text-xs tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>
            Crafted with intention. Made in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
