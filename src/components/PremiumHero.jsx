import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import image1 from '../assets/image-1.webp';
import { Briefcase, MessageCircle, Folder, Code, Smile, ArrowRight, Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TextType from './TextType';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FRAME = 380; // TrueFocus frame size

const words = [
  'Full Stack Developer',
  'UI/UX Designer',
  'AI Enthusiast',
  'Creative Technologist',
  'Frontend Specialist',
  'Motion Designer',
];

function TypingText() {
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let t;
    const word = words[wordIndex];

    if (isDeleting) {
      if (currentText === '') {
        t = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 200);
      } else {
        t = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length - 1));
        }, 35);
      }
    } else {
      if (currentText === word) {
        t = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      } else {
        t = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, 75);
      }
    }

    return () => clearTimeout(t);
  }, [currentText, isDeleting, wordIndex]);

  return <span className="font-normal border-b-2 border-blue-500/80 pr-1 select-all">{currentText}</span>;
}

export default function PremiumHero() {
  const sectionRef        = useRef(null);
  const topImageRef       = useRef(null);
  const imageContainerRef = useRef(null);
  const eyebrowRef        = useRef(null);
  const headingRef        = useRef(null);
  const subheadingRef     = useRef(null);
  const buttonsRef        = useRef(null);
  const frameRef          = useRef(null);

  // Mobile layout refs
  const eyebrowMobileRef    = useRef(null);
  const headingMobileRef    = useRef(null);
  const subheadingMobileRef = useRef(null);
  const buttonsMobileRef    = useRef(null);
  const statsMobileRef      = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Google Font for Editorial Typography
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Glass Word Card rotation state for mobile view
  const floatingWords = [
    "VISION", "CREATE", "INNOVATE", "ELEVATE", "INSPIRE", 
    "EXPLORE", "EVOLVE", "IMAGINE", "CRAFT", "FOCUS", 
    "MOTION", "MINIMAL", "MODERN", "ELEGANCE", "PRECISION"
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState('word-fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('word-fade-out');
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % floatingWords.length);
        setFadeState('word-fade-in');
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Use refs to avoid re-renders and stale closures
  const isTracking = useRef(false);
  const maskPropsRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // GSAP quickTo setters for ultra-high-performance tracking
  const maskXTo = useRef(null);
  const maskYTo = useRef(null);
  const frameXTo = useRef(null);
  const frameYTo = useRef(null);

  // ── GSAP setup for cursor tracking ───────────────────────────
  useEffect(() => {
    if (isMobile) return;

    // Setup quickTo for smooth mask tracking
    maskXTo.current = gsap.quickTo(maskPropsRef.current, 'x', { duration: 0.3, ease: 'power3.out' });
    maskYTo.current = gsap.quickTo(maskPropsRef.current, 'y', { duration: 0.3, ease: 'power3.out' });

    // Setup quickTo for smooth frame tracking
    if (frameRef.current) {
      frameXTo.current = gsap.quickTo(frameRef.current, 'x', { duration: 0.3, ease: 'power3.out' });
      frameYTo.current = gsap.quickTo(frameRef.current, 'y', { duration: 0.3, ease: 'power3.out' });
    }

    let isHeroVisible = true;

    const updateMask = () => {
      if (!isHeroVisible || !topImageRef.current) return;
      
      // If not tracking, hide the sharp image and tracking frame entirely
      if (!isTracking.current) {
        topImageRef.current.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        topImageRef.current.style.WebkitClipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        if (frameRef.current) {
          frameRef.current.style.opacity = '0';
        }
        return;
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const dx = maskPropsRef.current.x - centerX;
      const dy = maskPropsRef.current.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Interpolate focus factor (0 when far, 1 when close to center)
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const maxDistance = minDim * 0.28;
      const minDistance = minDim * 0.08;
      
      const factor = distance <= minDistance
        ? 1
        : distance >= maxDistance
          ? 0
          : 1 - (distance - minDistance) / (maxDistance - minDistance);

      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Calculate coordinates relative to the image container space (which scrolls up by scrollY)
      const leftPx = maskPropsRef.current.x - FRAME / 2;
      const topPx = maskPropsRef.current.y - FRAME / 2 + scrollY;
      const rightPx = maskPropsRef.current.x + FRAME / 2;
      const bottomPx = maskPropsRef.current.y + FRAME / 2 + scrollY;

      // Convert to percentages (cancels out CSS scale/transforms)
      const pLeft = (leftPx / window.innerWidth) * 100;
      const pTop = (topPx / window.innerHeight) * 100;
      const pRight = (rightPx / window.innerWidth) * 100;
      const pBottom = (bottomPx / window.innerHeight) * 100;

      // Interpolate coordinates between the standard tracking frame and the full image bounds (0% to 100%)
      const clipLeft = pLeft * (1 - factor) + 0 * factor;
      const clipTop = pTop * (1 - factor) + 0 * factor;
      const clipRight = pRight * (1 - factor) + 100 * factor;
      const clipBottom = pBottom * (1 - factor) + 100 * factor;

      // Create clip-path polygon string
      const clip = `polygon(${clipLeft.toFixed(3)}% ${clipTop.toFixed(3)}%, ${clipRight.toFixed(3)}% ${clipTop.toFixed(3)}%, ${clipRight.toFixed(3)}% ${clipBottom.toFixed(3)}%, ${clipLeft.toFixed(3)}% ${clipBottom.toFixed(3)}%)`;
      
      topImageRef.current.style.clipPath = clip;
      topImageRef.current.style.WebkitClipPath = clip;

      // Smoothly dissolve the tracking frame (corner brackets, crosshairs, center dot) as we focus
      if (frameRef.current) {
        frameRef.current.style.opacity = (1 - factor).toString();
      }
    };

    // Use IntersectionObserver to pause the GSAP ticker when the Hero is scrolled off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) {
        gsap.ticker.add(updateMask);
      } else {
        gsap.ticker.remove(updateMask);
        // Clear clips to free GPU memory when hidden
        if (topImageRef.current) {
          topImageRef.current.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
          topImageRef.current.style.WebkitClipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        }
        if (frameRef.current) {
          frameRef.current.style.opacity = '0';
        }
      }
    }, { threshold: 0.01 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      gsap.ticker.remove(updateMask);
    };
  }, [isMobile]);

  // ── Entrance animations ───────────────────────────────────────
  useEffect(() => {
    AOS.init({ duration: 1400, once: true, ease: 'ease-out-cubic' });
    const tl = gsap.timeline();
    
    // Animate desktop layout elements
    tl.fromTo(eyebrowRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.4 }, 0);
    tl.fromTo(headingRef.current,    { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    tl.fromTo(subheadingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    tl.fromTo(buttonsRef.current,    { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');

    // Animate mobile layout elements
    if (eyebrowMobileRef.current) {
      tl.fromTo(eyebrowMobileRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.4 }, 0);
    }
    if (headingMobileRef.current) {
      tl.fromTo(headingMobileRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    }
    if (subheadingMobileRef.current) {
      tl.fromTo(subheadingMobileRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    }
    if (buttonsMobileRef.current) {
      tl.fromTo(buttonsMobileRef.current,    { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    }
    if (statsMobileRef.current) {
      tl.fromTo(statsMobileRef.current,      { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    }

    const floatTween = gsap.fromTo(imageContainerRef.current,
      { y: 0 }, { y: -14, duration: 3.5, ease: 'power1.inOut', repeat: -1, yoyo: true }
    );

    return () => {
      tl.kill();
      floatTween.kill();
    };
  }, []);

  // ── Mouse handlers ────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    // Ensure we trigger the hover state immediately on move
    // to bypass the "starts inside" browser edge case
    if (!isTracking.current) {
      isTracking.current = true;
      setIsHovering(true);
      // Immediately set initial position without animation so it doesn't fly in
      gsap.set(maskPropsRef.current, { x: e.clientX, y: e.clientY });
      if (frameRef.current) gsap.set(frameRef.current, { x: e.clientX - FRAME / 2, y: e.clientY - FRAME / 2 });
    }

    // Update trackers
    if (maskXTo.current) maskXTo.current(e.clientX);
    if (maskYTo.current) maskYTo.current(e.clientY);
    if (frameXTo.current) frameXTo.current(e.clientX - FRAME / 2);
    if (frameYTo.current) frameYTo.current(e.clientY - FRAME / 2);

    // Parallax on image container
    const strength = 12;
    const xOff = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2) * strength;
    const yOff = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * strength;
    gsap.to(imageContainerRef.current, { x: xOff, y: yOff, duration: 0.7, ease: 'power2.out' });
  }, [maskPropsRef, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    isTracking.current = false;
    setIsHovering(false);
    gsap.to(imageContainerRef.current, { x: 0, y: 0, duration: 1.2, ease: 'power3.out' });
  }, [isMobile]);

  const corner = (pos) => {
    const s = {
      position: 'absolute',
      width: 22,
      height: 22,
      borderStyle: 'solid',
      borderColor: '#3b82f6',
      borderRadius: 3,
      filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.8)) drop-shadow(0 0 12px rgba(59,130,246,0.3))',
    };
    if (pos === 'tl') return { ...s, top: -11,  left: -11,  borderWidth: '2.5px 0 0 2.5px' };
    if (pos === 'tr') return { ...s, top: -11,  right: -11, borderWidth: '2.5px 2.5px 0 0' };
    if (pos === 'bl') return { ...s, bottom: -11, left: -11, borderWidth: '0 0 2.5px 2.5px' };
    if (pos === 'br') return { ...s, bottom: -11, right: -11, borderWidth: '0 2.5px 2.5px 0' };
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen h-auto md:h-screen bg-white md:bg-[#fafafa] overflow-y-auto md:overflow-hidden flex flex-col items-center justify-start md:justify-center select-none pt-24 pb-12 md:p-0"
      style={{ cursor: isMobile ? 'auto' : 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes floatMobile {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes floatCard {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }
        @keyframes pulseShadowMobile {
          0% { opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { opacity: 0.15; }
        }
        .animate-pulse-shadow-mobile {
          animation: pulseShadowMobile 8s ease-in-out infinite;
        }
        @keyframes fadeInUpMobile {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutUpMobile {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-12px); }
        }
        .word-fade-in {
          animation: fadeInUpMobile 0.45s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes floatPortrait {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-portrait {
          animation: floatPortrait 6s ease-in-out infinite;
        }
        @keyframes scrollBounceMobile {
          0% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(8px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.3; }
        }
        .animate-scroll-bounce-mobile {
          animation: scrollBounceMobile 3s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[80vw] h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/15 mix-blend-multiply blur-[130px] animate-pulse-slow" />
        <div className="absolute w-[50vw] h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/15 mix-blend-multiply blur-[110px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── Desktop Image layers ───────────────────────────────────────── */}
      <div
        ref={imageContainerRef}
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ transform: 'translateY(6vh) scale(0.93)' }}
      >
        <div className="absolute w-[70%] h-[80%] top-[10%] left-[15%] bg-black/5 rounded-[4rem] blur-[40px] z-0" />

        {/* BLURRED layer — always visible as the background */}
        <img
          src={image1}
          alt="Ashwin S blurred"
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
          style={{
            filter: 'blur(22px) brightness(0.96)',
            transform: 'scale(1.05)',
          }}
        />

        {/* SHARP layer — wrapped in a div for robust cross-browser clip-path support */}
        <div
          ref={topImageRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.25s ease',
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)', // Hidden by default until hover
            WebkitClipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
          }}
        >
          <img
            src={image1}
            alt="Ashwin S"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.05)' }}
          />
        </div>
      </div>

      {/* ── Desktop TrueFocus corner-bracket cursor ────────────────────── */}
      <div
        ref={frameRef}
        className="hidden md:block pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          top:    0,
          left:   0,
          width:  FRAME,
          height: FRAME,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <span style={corner('tl')} />
        <span style={corner('tr')} />
        <span style={corner('bl')} />
        <span style={corner('br')} />

        {/* Inner crosshair */}
        <span style={{
          position: 'absolute', top: '50%', left: 16, right: 16,
          height: 1, background: 'rgba(59,130,246,0.25)', transform: 'translateY(-50%)',
        }} />
        <span style={{
          position: 'absolute', left: '50%', top: 16, bottom: 16,
          width: 1, background: 'rgba(59,130,246,0.25)', transform: 'translateX(-50%)',
        }} />

        {/* Center dot */}
        <span style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 5, height: 5, borderRadius: '50%',
          background: '#3b82f6',
          boxShadow: '0 0 10px rgba(59,130,246,1), 0 0 20px rgba(59,130,246,0.6)',
          transform: 'translate(-50%,-50%)',
        }} />
      </div>

      {/* ── Desktop Content overlay ─────────────────────────────────────── */}
      <div className="hidden md:flex absolute bottom-24 left-20 z-30 flex-col gap-3 pointer-events-none max-w-2xl">
        <span ref={eyebrowRef} className="text-neutral-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs opacity-0">
          ASHWIN S PORTFOLIO
        </span>

        <h1 ref={headingRef} className="text-black text-2xl sm:text-4xl md:text-5xl lg:text-[2.2rem] font-light tracking-tight leading-[1.15] opacity-0">
          Building modern digital experiences with{' '}
          <br className="hidden sm:inline" />
          <TypingText />
          <span className="animate-ping font-extralight text-blue-500 ml-1">|</span>
        </h1>

        <p ref={subheadingRef} className="text-neutral-600 font-light text-xs sm:text-sm max-w-xs sm:max-w-md md:max-w-lg mt-2 leading-relaxed opacity-0">
          AI Engineer & Full Stack Developer passionate about creating immersive digital experiences, AI-powered applications, and premium futuristic interfaces.
        </p>

        <div ref={buttonsRef} className="flex items-center justify-center md:justify-start gap-6 mt-5 opacity-0 pointer-events-auto">
          <a href="#projects" className="bg-black hover:bg-neutral-800 text-white text-[10px] md:text-xs tracking-wider uppercase px-7 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="flex items-center gap-2 text-neutral-500 hover:text-black font-bold text-[10px] md:text-xs tracking-wider uppercase transition-colors group cursor-pointer">
            CONTACT ME
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Mobile-Only Premium Layout (Matches Mockup) ─────────────────────────────────── */}
      {/* ── Mobile-Only Premium Layout (Matches Mockup) ─────────────────────────────────── */}
      <div className="md:hidden w-full h-[100dvh] flex flex-col justify-between px-6 pt-16 pb-12 overflow-hidden relative select-none">
        
        {/* Soft Tactile Paper Grain Overlay */}
        <div className="paper-grain pointer-events-none" />

        {/* Swiss Editorial Guidelines (Thin vertical lines at 4% opacity) */}
        <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />
        <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />

        {/* Floating Glass Accent Element */}
        <div className="absolute top-[26%] left-[6%] w-6 h-6 bg-white/10 border border-white/20 rounded-full blur-[0.5px] animate-float-card pointer-events-none z-0" />

        {/* Soft Window-light Shadow Blur Layer */}
        <div className="absolute top-[10%] left-[4%] w-[450px] h-[300px] bg-neutral-900/5 rounded-full blur-[90px] pointer-events-none z-0 animate-pulse-shadow-mobile" />

        {/* Subtle radial light behind portrait */}
        <div className="absolute right-[10%] bottom-[12%] w-[280px] h-[280px] rounded-full bg-neutral-200/40 blur-[70px] pointer-events-none z-0" />

        {/* Grayscale Profile Portrait on Right (blends into white, slow float, shifted upward, increased scale) */}
        <div className="absolute right-[-25px] bottom-[90px] w-[75%] h-[82%] z-20 pointer-events-none animate-float-portrait">
          <img 
            src="/ashwin_s_mobile.png" 
            alt="Ashwin S Portrait" 
            className="w-full h-full object-contain object-bottom scale-[1.55] origin-bottom-right filter grayscale contrast-[1.15] brightness-[1.03]" 
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)'
            }}
          />
        </div>


        {/* Vertical Editorial Text along Left Gutter */}
        <div className="absolute left-[4%] top-[34%] z-10 flex flex-col items-center gap-3.5 text-neutral-400/20 font-mono text-[8px] font-bold tracking-[8px] pointer-events-none select-none uppercase">
          <span className="[writing-mode:vertical-lr] rotate-180">CREATE</span>
          <span className="text-[12px] font-light leading-none text-neutral-400/30">↓</span>
          <span className="[writing-mode:vertical-lr] rotate-180">INNOVATE</span>
          <span className="text-[12px] font-light leading-none text-neutral-400/30">↓</span>
          <span className="[writing-mode:vertical-lr] rotate-180">INSPIRE</span>
        </div>

        {/* Live HTML Content Column on Left (Moved upward, top empty space reduced) */}
        <div className="relative z-30 flex flex-col items-start text-left max-w-[65%] mt-0">
          {/* Eyebrow */}
          <div ref={eyebrowMobileRef} className="opacity-0 mb-4">
            <span className="text-[14px] font-medium tracking-[8px] text-[#A8A8A8] uppercase">
              HELLO, I'M
            </span>
          </div>

          {/* Heading Name (Playfair Display Editorial Serif - Responsive max hierarchy) */}
          <h1 ref={headingMobileRef} className="font-['Playfair_Display',_serif] text-[48px] sm:text-[60px] md:text-[70px] font-bold text-neutral-900 leading-[0.9] tracking-tight opacity-0 flex items-center">
            <TextType
              text="Ashwin"
              as="span"
              typingSpeed={80}
              initialDelay={1800}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-neutral-400 font-light font-sans ml-1 text-[38px] sm:text-[50px] md:text-[60px]"
            />
          </h1>


          {/* Biography Bio */}
          <p ref={subheadingMobileRef} className="text-[14px] text-[#666666] leading-[1.7] font-light max-w-[240px] mb-8 opacity-0 mt-6">
            I build intelligent systems and data-driven solutions that create real-world impact.
          </p>

          {/* CTA Button */}
          <div ref={buttonsMobileRef} className="opacity-0 pointer-events-auto">
            <a 
              href="#projects" 
              className="group flex items-center gap-2.5 px-6.5 py-4 bg-[#111111] hover:bg-black text-white text-[10px] font-semibold tracking-wider uppercase rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] cursor-pointer text-center no-underline border-none inline-flex"
            >
              <span>View Work</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-white stroke-[2.5] transform transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>

          {/* Social Icons positioned directly below CTA button with 32px spacing (mt-8) */}
          <div ref={statsMobileRef} className="flex items-center gap-[18px] mt-8 opacity-0 pointer-events-auto">
            <a 
              href="https://linkedin.com/in/ashwinshaiju" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <FaLinkedin className="w-4 h-4 text-black" />
            </a>
            <a 
              href="https://github.com/Ashwin-876" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-black" />
            </a>
            <a 
              href="mailto:ashwinshaijus@gmail.com" 
              aria-label="Email"
              className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <Mail className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>


        {/* Glass Words Marquee Ticker (Positioned at absolute bottom-most margin) */}
        <div 
          className="w-[calc(100%+48px)] mx-[-24px] overflow-hidden py-3 absolute left-0 right-0 z-10 pointer-events-none"
          style={{
            bottom: '8px',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <motion.div
            className="flex gap-6 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...floatingWords, ...floatingWords].map((word, index) => (
              <div 
                key={index} 
                className="px-7 py-3.5 bg-white/10 backdrop-blur-[12px] border border-white/40 rounded-full text-[14px] font-black tracking-[6px] text-neutral-800 font-mono shadow-[0_4px_16px_rgba(0,0,0,0.02)] whitespace-nowrap"
              >
                {word}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (Desktop Only) */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 pointer-events-none z-30 opacity-60 animate-bounce">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">Scroll Down</span>
        <svg className="w-3.5 h-3.5 text-neutral-400 stroke-2 stroke-current fill-none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
