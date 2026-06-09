'use client'

import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to My Landing Page</h1>
    </div>
  );
}

export default LandingPage;