'use client';
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef } from "react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-center mt-10">
        Selamat Datang di Situs Memancing Kami!
      </h1>
    </section>
    );
}