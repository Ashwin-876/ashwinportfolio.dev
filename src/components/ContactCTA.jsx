import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = [
  "future.",
  "AI experiences.",
  "digital excellence.",
  "immersive products.",
  "luxury web experiences."
];

export default function ContactCTA() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonGlowRef = useRef(null);
  const [currentWord, setCurrentWord] = useState(0);

  // Word rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Magnetic button effect using high-performance GSAP quickTo
  useEffect(() => {
    if (!buttonRef.current || !buttonGlowRef.current) return;

    const xTo = gsap.quickTo(buttonRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(buttonRef.current, "y", { duration: 0.4, ease: "power3.out" });
    const glowXTo = gsap.quickTo(buttonGlowRef.current, "x", { duration: 0.2, ease: "power2.out" });
    const glowYTo = gsap.quickTo(buttonGlowRef.current, "y", { duration: 0.2, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = buttonRef.current.parentElement.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull (20% of distance)
      xTo(x * 0.2);
      yTo(y * 0.2);

      // Spotlight follows mouse exactly inside the button
      const btnRect = buttonRef.current.getBoundingClientRect();
      glowXTo(e.clientX - btnRect.left);
      glowYTo(e.clientY - btnRect.top);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(buttonGlowRef.current, { opacity: 0, duration: 0.5 });
    };

    const handleMouseEnter = () => {
      gsap.to(buttonGlowRef.current, { opacity: 1, duration: 0.2 });
    };

    const wrapper = buttonRef.current.parentElement;
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);
    wrapper.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Parallax and Reveal Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.reveal-up');
    const revealTween = gsap.fromTo(elements,
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Subtle parallax on background elements
    const parallaxTween = gsap.to('.bg-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      revealTween.kill();
      if (revealTween.scrollTrigger) revealTween.scrollTrigger.kill();
      parallaxTween.kill();
      if (parallaxTween.scrollTrigger) parallaxTween.scrollTrigger.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-32 z-10"
    >
      {/* --- BACKGROUND EFFECTS --- */}

      
      {/* Cinematic Aurora & Orbs */}
      <div className="bg-parallax absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0" />
      <div className="bg-parallax absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent blur-[2px] rotate-45 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-px h-64 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent blur-[2px] -rotate-45 pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 w-full max-w-5xl mx-auto">
        
        {/* Availability Badge */}
        <div className="reveal-up mb-8 flex items-center gap-3 bg-white border border-neutral-200 shadow-sm px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-emerald-400/90 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] uppercase">
            Available for new projects
          </span>
        </div>

        {/* Top Label */}
        <span className="reveal-up text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
          07 / GET IN TOUCH
        </span>

        {/* Main Heading */}
        <h2 className="reveal-up text-white text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.1] mb-8 flex flex-col items-center w-full">
          <span className="text-white/95">Let's build the</span>
          <div className="h-[1.2em] relative flex justify-center w-full mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 -translate-x-1/2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.3)] whitespace-nowrap"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h2>

        {/* Subtext */}
        <p className="reveal-up text-neutral-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mb-16">
          Have a project in mind? I create premium AI-powered digital experiences, 
          immersive frontend systems, and scalable SaaS products for brands worldwide.
        </p>

        {/* Magnetic CTA Button */}
        <div className="reveal-up p-8"> {/* Wrapper for magnetic hit area */}
          <a href="mailto:ashwinshaijus@gmail.com" className="block relative group">
            <button 
              ref={buttonRef}
              className="relative px-10 py-5 bg-white/5 border border-cyan-500/20 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-colors duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-950/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]"
            >
              {/* Shimmer Sweep Animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />
              
              {/* Interactive Mouse Spotlight */}
              <div 
                ref={buttonGlowRef}
                className="absolute w-24 h-24 bg-cyan-400/30 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
              />

              <span className="relative z-10 text-white font-semibold tracking-widest text-sm uppercase">
                Start a Project
              </span>
              <svg className="relative z-10 w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </a>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}} />
    </section>
  );
}
