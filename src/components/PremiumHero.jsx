import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import image1 from '../assets/image-1.webp';

const FRAME = 380; // TrueFocus frame size

const words = [
  'Full Stack Developer',
  'UI/UX Designer',
  'AI Enthusiast',
  'Creative Technologist',
  'Frontend Specialist',
  'Motion Designer',
];

export default function PremiumHero() {
  const sectionRef        = useRef(null);
  const topImageRef       = useRef(null);
  const imageContainerRef = useRef(null);
  const eyebrowRef        = useRef(null);
  const headingRef        = useRef(null);
  const subheadingRef     = useRef(null);
  const buttonsRef        = useRef(null);
  const frameRef          = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  // Use refs to avoid re-renders and stale closures
  const isTracking = useRef(false);
  const maskPropsRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // GSAP quickTo setters for ultra-high-performance tracking
  const maskXTo = useRef(null);
  const maskYTo = useRef(null);
  const frameXTo = useRef(null);
  const frameYTo = useRef(null);

  // ── Typing animation ─────────────────────────────────────────
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);

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

  // ── GSAP setup for cursor tracking ───────────────────────────
  useEffect(() => {
    // Setup quickTo for smooth mask tracking
    maskXTo.current = gsap.quickTo(maskPropsRef.current, 'x', { duration: 0.3, ease: 'power3.out' });
    maskYTo.current = gsap.quickTo(maskPropsRef.current, 'y', { duration: 0.3, ease: 'power3.out' });

    // Setup quickTo for smooth frame tracking
    if (frameRef.current) {
      frameXTo.current = gsap.quickTo(frameRef.current, 'x', { duration: 0.3, ease: 'power3.out' });
      frameYTo.current = gsap.quickTo(frameRef.current, 'y', { duration: 0.3, ease: 'power3.out' });
    }

    const updateMask = () => {
      if (!topImageRef.current) return;
      
      // If not tracking, hide the sharp image and tracking frame entirely
      if (!isTracking.current) {
        topImageRef.current.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        topImageRef.current.style.WebkitClipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        if (frameRef.current) {
          frameRef.current.style.opacity = '0';
        }
        return;
      }

      const rect = topImageRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Calculate distance from screen center
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

      // Calculate the exact pixel bounds of the FRAME relative to the image's visual bounding box
      const leftPx = maskPropsRef.current.x - FRAME / 2 - rect.left;
      const topPx = maskPropsRef.current.y - FRAME / 2 - rect.top;
      const rightPx = maskPropsRef.current.x + FRAME / 2 - rect.left;
      const bottomPx = maskPropsRef.current.y + FRAME / 2 - rect.top;

      // Convert to percentages (cancels out CSS scale/transforms)
      const pLeft = (leftPx / rect.width) * 100;
      const pTop = (topPx / rect.height) * 100;
      const pRight = (rightPx / rect.width) * 100;
      const pBottom = (bottomPx / rect.height) * 100;

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

    gsap.ticker.add(updateMask);
    return () => gsap.ticker.remove(updateMask);
  }, []);

  // ── Entrance animations ───────────────────────────────────────
  useEffect(() => {
    AOS.init({ duration: 1400, once: true, ease: 'ease-out-cubic' });
    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.4 });
    tl.fromTo(headingRef.current,    { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    tl.fromTo(subheadingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
    tl.fromTo(buttonsRef.current,    { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.75');
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
  }, [maskPropsRef]);

  const handleMouseLeave = useCallback(() => {
    isTracking.current = false;
    setIsHovering(false);
    gsap.to(imageContainerRef.current, { x: 0, y: 0, duration: 1.2, ease: 'power3.out' });
  }, []);

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
      className="relative w-full h-screen bg-[#fafafa] overflow-hidden flex items-center justify-center select-none"
      style={{ cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[80vw] h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/15 mix-blend-multiply blur-[130px] animate-pulse-slow" />
        <div className="absolute w-[50vw] h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/15 mix-blend-multiply blur-[110px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── Image layers ───────────────────────────────────────── */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
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

      {/* ── TrueFocus corner-bracket cursor ────────────────────── */}
      <div
        ref={frameRef}
        className="pointer-events-none z-[9999]"
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

      {/* ── Content overlay ─────────────────────────────────────── */}
      <div className="absolute bottom-16 md:bottom-24 left-6 sm:left-12 md:left-20 z-30 flex flex-col gap-3 pointer-events-none max-w-[90%] md:max-w-2xl">
        <span ref={eyebrowRef} className="text-neutral-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs opacity-0">
          ASHWIN S PORTFOLIO
        </span>

        <h1 ref={headingRef} className="text-black text-2xl sm:text-4xl md:text-5xl lg:text-[2.2rem] font-light tracking-tight leading-[1.15] opacity-0">
          Building modern digital experiences with{' '}
          <br className="hidden sm:inline" />
          <span className="font-normal border-b-2 border-blue-500/80 pr-1 select-all">{currentText}</span>
          <span className="animate-ping font-extralight text-blue-500 ml-1">|</span>
        </h1>

        <p ref={subheadingRef} className="text-neutral-600 font-light text-xs sm:text-sm max-w-lg mt-2 leading-relaxed opacity-0">
          AI Engineer & Full Stack Developer passionate about creating immersive digital experiences, AI-powered applications, and premium futuristic interfaces.
        </p>

        <div ref={buttonsRef} className="flex items-center gap-6 mt-5 opacity-0 pointer-events-auto">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-30 opacity-60 animate-bounce">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">Scroll Down</span>
        <svg className="w-3.5 h-3.5 text-neutral-400 stroke-2 stroke-current fill-none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
