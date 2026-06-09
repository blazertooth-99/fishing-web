"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/app/util/constant";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  const handleToggleSound = () => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log(
            "Interaksi pengguna dibutuhkan sebelum memutar audio secara otomatis.",
          );
        });
      }
      setSoundEnabled(!soundEnabled);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <audio
          ref={audioRef}
          loop
          src="https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav"
        />
        {/* Logo Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-400/20 group-hover:border-teal-400/50 transition-all duration-300">
            <svg
              className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.99 20.485c3.314 0 6-2.686 6-6 0-1.782-1.07-3.328-2.62-4.114a1 1 0 00-1.12.18l-1.54 1.54a1 1 0 01-1.414 0l-1.54-1.54a1 1 0 00-1.12-.18C7.08 11.157 6 12.703 6 14.485c0 3.314 2.686 6 6 6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v3m0 0a3 3 0 01-3 3H5M12 5a3 3 0 003 3h4"
              />
            </svg>
          </div>
          <span className="text-lg font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-teal-400">
            POSEIDON<span className="text-teal-400 font-light">CAST</span>
          </span>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.2em] text-neutral-400">
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 text-base"
                >
                    {link.name}
                </Link>
            ))}
        </div>

        {/* Suara & Registrasi */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleToggleSound}
            className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              soundEnabled
                ? "border-teal-500/40 text-teal-400 bg-teal-950/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                : "border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
            }`}
            title={
              soundEnabled ? "Matikan Suara Pantai" : "Aktifkan Suara Pantai"
            }
          >
            {soundEnabled ? (
              <div className="flex items-end gap-[3px] h-4 w-4">
                <span className="w-[3px] bg-teal-400 animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-[3px] bg-teal-400 animate-[bounce_1s_infinite_300ms] h-2/3" />
                <span className="w-[3px] bg-teal-400 animate-[bounce_1s_infinite_500ms] h-5/6" />
              </div>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </button>

          <a
            href="#gabung"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold tracking-[0.15em] text-black bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl group shadow-[0_4px_25px_rgba(20,184,166,0.3)] hover:shadow-[0_4px_35px_rgba(20,184,166,0.5)] transition-all duration-300 transform active:scale-95"
          >
            <span className="relative text-[10px] font-black">DAFTAR KLUB</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-lg border border-white/10 text-neutral-400"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:text-teal-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5M3.75 15h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
