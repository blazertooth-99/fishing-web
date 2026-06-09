"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LandingPage = () => {
  const heroRef = useRef(null);

  return (
    <main>
      {/* <Loading /> */}
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to My Landing Page
        </h1>
      </div>
    </main>
  );
};

export default LandingPage;
