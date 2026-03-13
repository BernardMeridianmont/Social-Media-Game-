import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.children;
    
    gsap.fromTo(elements, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1.5 } // delay for preloader
    );
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex items-end p-8 md:p-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1920&auto=format&fit=crop" 
          alt="Pawhaus Hero" 
          className="w-full h-full object-cover mix-blend-multiply opacity-80"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div ref={containerRef} className="relative z-10 max-w-4xl pt-20 text-background">
        <p className="font-sans font-bold uppercase tracking-widest text-accent mb-4 text-sm md:text-base">
          Schedule a groom
        </p>
        <h1 className="font-drama italic text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-8">
          dog grooming that your pet actually enjoys.
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 md:items-end">
          <button className="bg-accent text-background px-8 py-4 rounded-none font-sans font-bold uppercase tracking-wider hover:bg-background hover:text-primary transition-colors cursor-none w-max">
            Schedule a groom
          </button>
          <div className="font-mono text-sm pl-4 pb-2 border-l border-background/30 opacity-70">
            [Botanical precision] <br/>
            [Zero stress]
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
