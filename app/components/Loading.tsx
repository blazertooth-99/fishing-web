"use client";

import { useEffect, useRef, useState } from "react";
import { loadingStatus } from "../util/constant";
import gsap from "gsap";

gsap.registerPlugin();

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Menginisialisasi sistem...");

  const loaderRef = useRef(null);
  const bgGlowRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {

    // Memulai counter progress 0 - 100 selama 3 detik pertama
    const progressObj = { value: 0 };
    const progressTween = gsap.to(progressObj, {
      value: 100,
      duration: 3.0,
      ease: "power2.out",
      onUpdate: () => {
        const currentVal = Math.floor(progressObj.value);
        setProgress(currentVal);

        // Mengubah teks status berdasarkan progress persen
        const statusIndex = Math.min(
          Math.floor((currentVal / 100) * loadingStatus.length),
          loadingStatus.length - 1,
        );
        setStatusText(loadingStatus[statusIndex]);
      },
    });

    // Pulse animation untuk glow background di loader
    gsap.to(bgGlowRef.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Setelah total 3.5 detik, jalankan transisi penutup (exit animation)
    const timeout = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          setShowLoader(false);
        },
      });

      // Animasi keluar loader: Geser ke atas dengan efek easing premium
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, 3500);
    return () => {
      clearTimeout(timeout);
      progressTween.kill();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-slate-100 font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">
            {showLoader && (
        <div 
          ref={loaderRef} 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div 
            ref={bgGlowRef} 
            className="absolute w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none opacity-40 transition-transform"
          />

          {/* Grid Pattern Ringan */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* Wrapper Loader */}
          <div className="relative z-10 flex flex-col items-center max-w-xs text-center px-6">
            
            {/* Indikator Lingkaran Persen */}
            <div className="relative flex items-center justify-center w-40 h-40 mb-8">
              {/* Lingkaran Background */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-neutral-900"
                  strokeWidth="3"
                  fill="transparent"
                />
                {/* Lingkaran Progress */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-purple-600 transition-all duration-100 ease-out"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * progress) / 100}
                />
              </svg>
              
              {/* Teks Angka Tengah */}
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-400 font-mono">
                  {progress}%
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mt-1">MEMUAT</span>
              </div>
            </div>

            {/* Nama Brand */}
            <h2 className="text-lg font-bold tracking-[0.5em] uppercase text-white mb-2">
              NEXUS<span className="text-purple-500">STUDIO</span>
            </h2>

            {/* Status Dinamis */}
            <p className="text-xs text-neutral-400 font-mono tracking-wide h-4 transition-all">
              {statusText}
            </p>

            {/* Progress Bar Horizontal Minimalis */}
            <div className="w-48 h-[1px] bg-neutral-900 mt-6 relative overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-purple-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Copyright/Footer Loader */}
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <span className="text-[10px] tracking-[0.3em] text-neutral-600 uppercase font-mono">
              Est. 2026 / Hak Cipta Dilindungi
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

           
