"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "The quality of the materials is matched only by the precision of the stitching. Simply exceptional.",
    author: "James M.",
    location: "London",
  },
  {
    text: "It's rare to find an online store that actually delivers the luxury experience they promise. VIIVET does exactly that.",
    author: "Arthur C.",
    location: "New York",
  },
  {
    text: "Wearing Maison Tropicale feels like a constant vacation. The fabric breathes beautifully and drapes perfectly.",
    author: "Rajiv S.",
    location: "Dubai",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#FAF7F0] text-[#1A0E05] relative overflow-hidden border-t border-[#1A0E05]/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.p
          className="text-[#C8A84B] text-xs tracking-[0.3em] uppercase mb-16"
          style={{ fontFamily: "Outfit, sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Client Experiences
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 text-left">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <svg key={starIndex} width="14" height="14" viewBox="0 0 24 24" fill="#C8A84B">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p
                className="text-xl italic mb-8 leading-relaxed text-[#1A0E05]/80"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "{t.text}"
              </p>
              <p
                className="text-xs uppercase tracking-widest text-[#1A0E05]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                — {t.author},{" "}
                <span className="opacity-50 tracking-wide">{t.location}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
