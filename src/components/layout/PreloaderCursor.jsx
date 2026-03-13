import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PreloaderCursor = () => {
  const cursorRef = useRef(null);
  const preloaderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cursor logic
    const cursor = cursorRef.current;
    
    // GSAP quickTo for smooth cursor movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Preloader logic
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Slide up preloader
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          delay: 0.2,
        });
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-accent pointer-events-none z-[1000] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      {/* Preloader */}
      <div 
        ref={preloaderRef}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-primary text-background"
      >
        <div className="text-4xl font-sans font-bold tracking-tight mb-4 text-background">Pawhaus</div>
        <div className="font-mono text-xl text-background/80">{String(progress).padStart(2, '0')}%</div>
      </div>
    </>
  );
};

export default PreloaderCursor;
