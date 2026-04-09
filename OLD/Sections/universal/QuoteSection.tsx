"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * QUOTE_SECTION_V2 // AERODYNAMIC_MINIMALISM
 * -------------------------------------------
 * Core: High-impact pinned scroll sequence.
 * Geometry: Parallelogram cuts and diagonal slices.
 * Motion: Mechanical vertical slide with scanline compression exit.
 */

const QuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      tl.fromTo(textRef.current,
        { y: 150, opacity: 0, skewX: -15 },
        { y: 0, opacity: 1, skewX: -5, duration: 1, ease: "power4.out" }
      )
        .fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.inOut" },
          "-=0.5"
        )
        .fromTo(metaRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3"
        )
        .to(sectionRef.current, {
          clipPath: 'polygon(0 49.5%, 100% 49.5%, 100% 50.5%, 0 50.5%)',
          opacity: 0,
          filter: "brightness(3)",
          duration: 0.8,
          delay: 0.5
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const dummyData = {
    quote: "IF EVERYTHING SEEMS UNDER CONTROL, YOU'RE NOT GOING FAST ENOUGH.",
    author: "MARIO ANDRETTI",
    role: "FORMULA 1 WORLD CHAMPION",
    serial: "REF_088 // PERFORMANCE_CORE"
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden"
    >
      {/* TECHNICAL GRID OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#E2E2E2 1px, transparent 1px), linear-gradient(90deg, #E2E2E2 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div ref={sectionRef} className="relative w-full h-full flex flex-col items-center justify-center px-12 md:px-24">

        {/* UPPER DATA STRIP */}
        <div className="absolute top-12 left-12 right-12 flex justify-between font-mono text-[10px] tracking-[0.6em] text-white/30 uppercase">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#00FF41]" />
            <span>{dummyData.serial}</span>
          </div>
          <span>EST. 2026 // AF_MOTORSPORT</span>
        </div>

        {/* MAIN CONTENT BLOCK */}
        <div className="max-w-[1400px] w-full">
          <h2
            ref={textRef}
            className="text-[7vw] md:text-[5.5vw] font-black leading-[0.85] text-[#E2E2E2] italic uppercase tracking-tighter"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            {dummyData.quote}
          </h2>

          <div
            ref={lineRef}
            className="w-full h-[1px] bg-[#00FF41] mt-12 origin-left"
          />

          <div ref={metaRef} className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col">
              <span className="font-mono text-4xl font-bold tracking-widest text-[#E2E2E2]">
                {dummyData.author}
              </span>
              <span className="text-[10px] text-[#00FF41] font-bold tracking-[0.5em] mt-2 uppercase">
                {dummyData.role}
              </span>
            </div>

            <div className="flex gap-4">
              <div
                className="w-16 h-10 bg-white/10"
                style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
              />
              <div
                className="w-16 h-10 bg-[#00FF41]"
                style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
              />
            </div>
          </div>
        </div>

        {/* LOWER DECORATIVE NUMBERING */}
        <div className="absolute bottom-12 left-12 font-mono text-6xl font-black text-white/5 tracking-tighter">
          01
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;