import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2 } from 'lucide-react';
import gsap from 'gsap';

const Features = () => {
  // 1. Shuffler Card
  const initialCards = [
    "Stress-free environment",
    "Breed-specific cuts",
    "Ready in 2 hours"
  ];
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Typewriter Card
  const fullText = "> Initializing grooming protocol...\n> Analyzing coat type...\n> Breed-specific cut selected.\n> Expected duration: 2 hours.\n> System ready.";
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    
    const tick = () => {
      if (!isDeleting && index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
        setTimeout(tick, Math.random() * 50 + 30);
      } else if (!isDeleting && index > fullText.length) {
        isDeleting = true;
        setTimeout(tick, 3000); // Wait 3s before clearing
      } else if (isDeleting && index > 0) {
        // Fast delete
        index--;
        setTypedText(fullText.slice(0, index));
        setTimeout(tick, 10);
      } else {
        isDeleting = false;
        setTimeout(tick, 500);
      }
    };
    
    let timerId = setTimeout(tick, 1000);
    return () => clearTimeout(timerId);
  }, []);

  // 3. Cursor Protocol
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(-1);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const dayRefs = useRef([]);
  const btnRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for the cursor
    const tl = gsap.timeline({ repeat: -1 });
    
    const runProtocol = () => {
      // Pick a random day index (e.g. Wednesday = 3)
      const targetDay = 3; 
      
      if (!dayRefs.current[targetDay] || !btnRef.current || !containerRef.current || !cursorRef.current) return;
      
      // Calculate relative positions
      const containerRect = containerRef.current.getBoundingClientRect();
      const dayRect = dayRefs.current[targetDay].getBoundingClientRect();
      const btnRect = btnRef.current.getBoundingClientRect();
      
      const dayX = dayRect.left - containerRect.left + dayRect.width / 2;
      const dayY = dayRect.top - containerRect.top + dayRect.height / 2;
      
      const btnX = btnRect.left - containerRect.left + btnRect.width / 2;
      const btnY = btnRect.top - containerRect.top + btnRect.height / 2;

      // Reset
      setActiveDay(-1);
      gsap.set(cursorRef.current, { x: containerRect.width + 20, y: containerRect.height + 20, scale: 1 });

      tl.clear();
      
      // Animate to day
      tl.to(cursorRef.current, {
        x: dayX,
        y: dayY,
        duration: 1.2,
        ease: "power2.inOut"
      })
      // Click day highlight
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .call(() => setActiveDay(targetDay))
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      // Wait
      .to({}, { duration: 0.5 })
      // Move to Save button
      .to(cursorRef.current, {
        x: btnX,
        y: btnY,
        duration: 1,
        ease: "power2.inOut"
      })
      // Click save highlight
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(btnRef.current, { scale: 0.98, duration: 0.1 }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(btnRef.current, { scale: 1, duration: 0.2 }, "<")
      // Exit and restart
      .to(cursorRef.current, {
        x: containerRect.width + 50,
        y: containerRect.height + 50,
        duration: 1,
        ease: "power2.in",
        delay: 0.5
      });
    };

    // Need a slight delay to ensure DOM is rendered and rects are accurate
    const initialTimer = setTimeout(runProtocol, 500);
    
    // Recalculate on window resize
    const resizeHandler = () => {
      clearTimeout(initialTimer);
      runProtocol();
    };
    window.addEventListener('resize', resizeHandler);
    
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', resizeHandler);
      tl.kill();
    };
  }, []);

  return (
    <section id="features" className="py-24 px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Shuffler Card */}
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl flex flex-col justify-center h-[400px] overflow-hidden relative">
          <p className="font-mono text-xs uppercase tracking-widest text-primary/50 mb-8 absolute top-8 left-8">01 / Value Props</p>
          <div className="relative h-full w-full flex items-center justify-center mt-8">
            {cards.map((card, index) => (
              <div 
                key={card}
                className={`absolute w-full p-6 border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl flex items-center ${
                  index === 0 ? 'bg-primary text-background z-30 scale-100 top-1/2 -translate-y-1/2 opacity-100 shadow-xl' :
                  index === 1 ? 'bg-background text-primary border-primary/20 z-20 scale-95 top-[5%] opacity-60' :
                  'bg-background border-primary/10 text-primary/40 z-10 scale-[0.85] top-[80%] opacity-30 blur-[1px]'
                }`}
              >
                <div className="font-sans font-semibold text-xl">{card}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typewriter Card */}
        <div className="bg-primary text-background p-8 rounded-xl h-[400px] relative overflow-hidden">
          <p className="font-mono text-xs uppercase tracking-widest text-background/50 mb-8">02 / Terminal Feed</p>
          <div className="font-mono text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap opacity-90">
            {typedText}
            <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
          </div>
        </div>

        {/* Cursor Protocol */}
        <div ref={containerRef} className="bg-background border border-primary/20 p-8 rounded-xl h-[400px] relative overflow-hidden">
          <p className="font-mono text-xs uppercase tracking-widest text-primary/50 mb-8">03 / Booking Protocol</p>
          <div className="h-full flex flex-col justify-center gap-12 relative pb-8">
            <div className="flex justify-between relative mt-8">
              {days.map((day, i) => (
                <div 
                  key={i} 
                  ref={el => dayRefs.current[i] = el}
                  className={`w-10 h-10 flex items-center justify-center font-sans font-medium rounded-full transition-colors duration-300 ${activeDay === i ? 'bg-accent text-background scale-110 shadow-lg' : 'bg-primary/5 text-primary'}`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            <button 
              ref={btnRef}
              className="w-full bg-primary text-background py-4 flex items-center justify-center font-sans font-bold hover:bg-accent transition-colors cursor-none pointer-events-auto shadow-md"
            >
              Save Appointment
            </button>
          </div>
          
          {/* Animated Cursor */}
          <div 
            ref={cursorRef}
            className="absolute top-0 left-0 text-primary z-20 pointer-events-none drop-shadow-md"
            style={{ transform: 'translate(-100px, -100px)' }} // starts offscreen
          >
            <MousePointer2 className="fill-background" size={28} strokeWidth={2} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
