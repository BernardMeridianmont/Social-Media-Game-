import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    
    ScrollTrigger.create({
      start: "top -50",
      end: 99999,
      toggleClass: {
        targets: nav,
        className: "bg-background/60 backdrop-blur-md shadow-sm"
      }
    });

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed left-1/2 -translate-x-1/2 top-6 z-[100] px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-8 text-primary"
    >
      <div className="font-sans font-bold text-lg tracking-tight">Pawhaus</div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="#features" onClick={scrollTo('#features')} className="hover:text-accent transition-colors">Features</a>
        <a href="#philosophy" onClick={scrollTo('#philosophy')} className="hover:text-accent transition-colors">Philosophy</a>
        <a href="#protocol" onClick={scrollTo('#protocol')} className="hover:text-accent transition-colors">Protocol</a>
      </div>
      <button className="bg-primary text-background px-4 py-2 rounded-full text-sm font-bold hover:bg-accent transition-colors cursor-none">
        Schedule a groom
      </button>
    </nav>
  );
};

export default Navbar;
