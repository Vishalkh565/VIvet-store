"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function IntroVideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Preload all frames — show frame 1 immediately, load rest in background
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;

      img.onload = () => {
        loadedCount++;
        // Show first frame as soon as it's ready
        if (i === 1) setFirstFrameReady(true);
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (i === 1) setFirstFrameReady(true);
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Draw frame on canvas — fires when firstFrameReady, loaded, or frameIndex changes
  useEffect(() => {
    if (!firstFrameReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;

    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Cover-fit with 15% zoom, aligned to top to crop the baked-in button
    const EXTRA_ZOOM = 1.15;
    const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight) * EXTRA_ZOOM;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const x = (cssW - drawW) / 2;
    const y = 0;

    ctx.drawImage(img, x, y, drawW, drawH);
  }, [frameIndex, loaded, firstFrameReady]);

  // Sync scroll position to frame index + re-render on resize
  useEffect(() => {
    const updateFrame = (v: number) => {
      const idx = Math.min(Math.floor(v * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      setFrameIndex(idx);
    };

    const unsubscribe = scrollYProgress.onChange(updateFrame);

    const handleResize = () => setFrameIndex((prev) => prev);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A0E05]">
        {/* Canvas Frame Scrubber */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Loading overlay — only shows until frame 1 is ready */}
        {!firstFrameReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A0E05] z-10">
            <div className="text-center">
              <p
                className="text-[#C8A84B] mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem" }}
              >
                VIVET
              </p>
              <p className="text-[#F5EDD8] text-sm tracking-[0.3em] uppercase opacity-60">
                Loading
              </p>
              <div className="mt-6 w-32 h-px bg-[#C8A84B] mx-auto animate-pulse" />
            </div>
          </div>
        )}

        {/* Scroll indicator — shows once all frames ready */}
        {loaded && (
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
        )}

        {/* VIVET wordmark overlay (with glass plate to hide baked video text) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
          style={{ opacity: wordmarkOpacity }}
        >
          <div 
            className="w-full max-w-4xl py-20 px-8 flex flex-col items-center justify-center rounded-3xl border shadow-2xl"
            style={{ 
              background: "rgba(26, 14, 5, 0.4)", 
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: "rgba(200, 168, 75, 0.2)",
            }}
          >
            <h1
              className="text-[#FAF7F0] text-center leading-none"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                fontWeight: 300,
                letterSpacing: "0.18em",
                textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              }}
            >
              VIVET
            </h1>
            <p
              className="text-[#C8A84B] tracking-[0.6em] uppercase text-xs sm:text-sm mt-6 ml-3"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Maison Tropicale
            </p>
          </div>
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
