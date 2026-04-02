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

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Draw frame on canvas — full device-pixel resolution (up to 8K on HiDPI displays)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Get device pixel ratio — on 8K/4K/Retina displays this is 2–4+
    const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;

    // CSS dimensions
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;

    // Set canvas buffer to physical pixel resolution
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    // Scale CSS size back so canvas element stays correct on screen
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale context to draw at physical resolution
    ctx.scale(dpr, dpr);

    // Enable maximum image quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Cover-fit: scale image to fill canvas. 
    // We add a 15% zoom and align to the top (y=0) to push the bottom of the image (which has the baked-in button) completely out of the frame.
    const EXTRA_ZOOM = 1.15;
    const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight) * EXTRA_ZOOM;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const x = (cssW - drawW) / 2;
    // Align to top so the excess height (and the button) is cropped out at the bottom
    const y = 0;

    ctx.drawImage(img, x, y, drawW, drawH);
  }, [frameIndex, loaded]);

  // Sync scroll to frame + re-render on resize (for DPR accuracy)
  useEffect(() => {
    const updateFrame = (v: number) => {
      const idx = Math.min(Math.floor(v * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      setFrameIndex(idx);
    };

    const unsubscribe = scrollYProgress.onChange(updateFrame);

    // Re-trigger the draw effect on window resize so DPR is recalculated
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

        {/* Loading overlay */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A0E05]">
            <div className="text-center">
              <p
                className="text-[#C8A84B] mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem" }}
              >
                VIVET
              </p>
              <p className="text-[#F5EDD8] text-sm tracking-[0.3em] uppercase opacity-60">
                Loading Experience
              </p>
              <div className="mt-6 w-32 h-px bg-[#C8A84B] mx-auto animate-pulse" />
            </div>
          </div>
        )}

        {/* Scroll indicator */}
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

        {/* VIIVET wordmark overlay (visible when scroll near start) */}
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
