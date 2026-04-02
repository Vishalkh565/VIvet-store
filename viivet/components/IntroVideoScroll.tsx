"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function IntroVideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Scrub video currentTime based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = progress * video.duration;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A0E05]">

        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="/intro.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.15)", transformOrigin: "center top" }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[#F5EDD8] text-xs tracking-[0.3em] uppercase">
            Scroll to Enter
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[#C8A84B] to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* VIVET wordmark overlay (visible at top) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: wordmarkOpacity }}
        >
          <h1
            className="text-[#FAF7F0] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            VIVET
          </h1>
          <p
            className="text-[#C8A84B] tracking-[0.5em] uppercase text-sm mt-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Maison Tropicale
          </p>
        </motion.div>

        {/* Fade-in overlay for content transition */}
        <motion.div
          className="absolute inset-0 bg-[#FAF7F0] pointer-events-none"
          style={{ opacity: contentOpacity }}
        />
      </div>
    </div>
  );
}
