import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PhilosophyProtocol = () => {
  const protocolContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Protocol Card Stacking
    const cards = cardsRef.current;
    
    // Check if cards exist
    if(cards.length !== 3 || !cards[0]) return;

    ScrollTrigger.create({
      trigger: protocolContainerRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      animation: gsap.timeline()
        .to(cards[0], { scale: 0.9, opacity: 0.5, y: -20 }, 0)
        .fromTo(cards[1], { y: '100%' }, { y: '0%', duration: 1 }, 0)
        .to(cards[0], { scale: 0.85, opacity: 0.2, y: -40 }, 1)
        .to(cards[1], { scale: 0.9, opacity: 0.5, y: -20 }, 1)
        .fromTo(cards[2], { y: '100%' }, { y: '0%', duration: 1 }, 1),
      scrub: 1,
    });

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <div className="bg-background text-primary">
      {/* Philosophy */}
      <section id="philosophy" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1920&auto=format&fit=crop")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-primary">
          <p className="font-mono text-sm uppercase tracking-widest text-accent mb-8">Our Philosophy</p>
          <h2 className="font-sans text-4xl md:text-6xl font-bold leading-tight">
            Most focus on <span className="font-drama italic font-normal text-6xl md:text-8xl px-2">speed</span>.<br/>
            We focus on <span className="font-drama italic font-normal text-6xl md:text-8xl px-2">calm</span>.
          </h2>
        </div>
      </section>

      {/* Protocol */}
      <section ref={protocolContainerRef} id="protocol" className="h-screen w-full relative overflow-hidden bg-primary text-background flex items-center justify-center p-8">
        <div className="w-full max-w-2xl relative h-[60vh]">
          
          <div ref={el => cardsRef.current[0] = el} className="absolute inset-0 bg-[#35483f] flex flex-col p-12 rounded-2xl border border-background/10 origin-top overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 md:w-2/3 h-full z-0">
              <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay opacity-60" alt="Dog arrival"/>
              <div className="absolute inset-0 bg-gradient-to-r from-[#35483f] via-[#35483f]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#35483f]/50 to-transparent md:hidden"></div>
            </div>
            <div className="relative z-10 font-mono text-accent mb-auto uppercase text-sm tracking-widest">01 / Arrival</div>
            <div className="relative z-10">
              <h3 className="font-drama italic text-5xl mb-4 shadow-sm text-background">Acclimation</h3>
              <p className="font-sans text-lg opacity-90 max-w-md text-background">Every pet gets 15 minutes to explore the botanical space, sniff the environment, and settle in before any tools are introduced.</p>
            </div>
          </div>

          <div ref={el => cardsRef.current[1] = el} className="absolute inset-0 bg-[#3e5349] flex flex-col p-12 rounded-2xl border border-background/10 origin-top overflow-hidden" style={{ transform: 'translateY(100%)' }}>
            <div className="absolute top-0 right-0 w-1/2 md:w-2/3 h-full z-0">
              <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay opacity-60" alt="Dog grooming"/>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3e5349] via-[#3e5349]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#3e5349]/50 to-transparent md:hidden"></div>
            </div>
            <div className="relative z-10 font-mono text-accent mb-auto uppercase text-sm tracking-widest">02 / Treatment</div>
            <div className="relative z-10">
              <h3 className="font-drama italic text-5xl mb-4 shadow-sm text-background">Precision Grooming</h3>
              <p className="font-sans text-lg opacity-90 max-w-md text-background">Breed-specific cuts performed in our serene environment. Minimal noise, no harsh lighting, strictly positive reinforcement.</p>
            </div>
          </div>

          <div ref={el => cardsRef.current[2] = el} className="absolute inset-0 bg-background text-primary flex flex-col p-12 rounded-2xl border border-primary/10 origin-top overflow-hidden" style={{ transform: 'translateY(100%)' }}>
            <div className="absolute top-0 right-0 w-1/2 md:w-2/3 h-full z-0">
              <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-multiply opacity-30" alt="Dog departure"/>
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent md:hidden"></div>
            </div>
            <div className="relative z-10 font-mono text-accent mb-auto uppercase text-sm tracking-widest">03 / Departure</div>
            <div className="relative z-10">
              <h3 className="font-drama italic text-5xl mb-4 text-primary">Ready in 2.</h3>
              <p className="font-sans text-lg opacity-90 max-w-md text-primary">Complete transparency. We text you exactly when they're ready—typically within 2 hours. Because their time, and yours, matters.</p>
              
              <button className="mt-8 bg-primary text-background px-8 py-4 font-sans font-bold hover:bg-accent transition-colors cursor-none pointer-events-auto">
                Schedule a groom
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PhilosophyProtocol;
