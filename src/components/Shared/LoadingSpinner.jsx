
import React, { useState, useEffect } from 'react';
import { Orbit, BookOpen } from 'lucide-react';

const LoadingSpinner = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Preparing your learning galaxy...",
    "Gathering knowledge stars...",
    "Aligning the curriculum planets...",
    "Loading your personal universe of lessons..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white font-sans">
      {/* Animated Icon Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Ring */}
        <div className="absolute w-24 h-24 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>

        {/* Middle Pulse Ring */}
        <div className="absolute w-20 h-20 bg-indigo-500/20 rounded-full animate-ping"></div>

        {/* Central Icon */}
        <div className="relative z-10 p-4 bg-slate-900 rounded-full border border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Orbit className="w-10 h-10 text-indigo-400" />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        LESSON<span className="text-indigo-500">VERSE</span>
      </h1>

      {/* Dynamic Loading Text */}
      <div className="flex flex-col items-center">
        <p className="text-slate-400 text-sm font-medium transition-all duration-500 ease-in-out">
          {tips[tipIndex]}
        </p>

        {/* Progress Bar Mockup */}
        <div className="w-48 h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 w-2/3 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-10 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest">
        <BookOpen size={14} />
        <span>Powered by LessonVerse</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
