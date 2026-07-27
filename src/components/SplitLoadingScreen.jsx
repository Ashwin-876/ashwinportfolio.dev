import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import startupSfx from '../assets/audio/startup.wav';
import humSfx from '../assets/audio/hum.wav';
import tickSfx from '../assets/audio/tick.wav';
import whooshSfx from '../assets/audio/whoosh.wav';
import completeSfx from '../assets/audio/complete.wav';

const loadingMessages = [
  "Initializing AI Modules...",
  "Loading Neural Interface...",
  "Syncing Portfolio Data...",
  "Launching Experience..."
];

const SplitLoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const progressBarRef = useRef(null);
  const dividerRef = useRef(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Audio Refs
  const startupAudio = useRef(typeof Audio !== "undefined" ? new Audio(startupSfx) : null);
  const humAudio = useRef(typeof Audio !== "undefined" ? new Audio(humSfx) : null);
  const tickAudio = useRef(typeof Audio !== "undefined" ? new Audio(tickSfx) : null);
  const whooshAudio = useRef(typeof Audio !== "undefined" ? new Audio(whooshSfx) : null);
  const completeAudio = useRef(typeof Audio !== "undefined" ? new Audio(completeSfx) : null);

  const playSound = (audioRef, loop = false, volume = 1.0) => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked', e));
    }
  };

  const stopSound = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Preload audio and keep interactive
  useEffect(() => {
    // Force loading of sound assets
    [startupAudio, humAudio, tickAudio, whooshAudio, completeAudio].forEach(audioRef => {
      if (audioRef.current) {
        audioRef.current.load();
      }
    });
  }, []);

  const handleInitialize = () => {
    setIsInitialized(true);
    // Play sounds directly inside user gesture interaction to ensure autoplay success
    playSound(startupAudio, false, 0.8);
    playSound(humAudio, true, 0.3);
  };

  // Rotating messages
  useEffect(() => {
    if (!isInitialized) return;
    const messageInterval = setInterval(() => {
      if (subtextRef.current) {
        gsap.to(subtextRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
            if (subtextRef.current) {
              gsap.fromTo(subtextRef.current, { y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
          }
        });
      }
    }, 1200);
    return () => clearInterval(messageInterval);
  }, [isInitialized]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      const bgs = containerRef.current?.querySelectorAll('.parallax-bg');
      const fgs = containerRef.current?.querySelectorAll('.parallax-fg');
      
      if (bgs && bgs.length > 0) {
        gsap.to(bgs, { x, y, duration: 1, ease: 'power2.out', overwrite: 'auto' });
      }
      if (fgs && fgs.length > 0) {
        gsap.to(fgs, { x: x * 1.5, y: y * 1.5, duration: 1, ease: 'power2.out', overwrite: 'auto' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Idle character animation & blinking
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Run the core GSAP loading timeline and progress simulation once initialized
  useEffect(() => {
    if (!isInitialized) return;

    // Simulate loading progress
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 4;
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress((prev) => {
        if (currentProgress > prev) {
          playSound(tickAudio, false, 0.4);
        }
        return currentProgress;
      });
      
      if (currentProgress === 100) {
        clearInterval(progressInterval);
      }
    }, 120);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        stopSound(humAudio);
        if (onComplete) onComplete();
      }
    });

    // Resolve animation targets dynamically or fallback to DOM queries to prevent null warnings
    const textEl = textRef.current || contentRef.current?.querySelector('h1');
    const subtextEl = subtextRef.current || contentRef.current?.querySelector('.h-7 p') || contentRef.current?.querySelector('p');
    const progressBarEl = progressBarRef.current || contentRef.current?.querySelector('.mt-8');

    // Initial setup
    const initialElements = [textEl, subtextEl, progressBarEl].filter(Boolean);
    if (initialElements.length > 0) {
      gsap.set(initialElements, { opacity: 0, y: 20 });
    }
    if (dividerRef.current) gsap.set(dividerRef.current, { opacity: 1 });
    if (leftPanelRef.current) gsap.set(leftPanelRef.current, { x: 0 });
    if (rightPanelRef.current) gsap.set(rightPanelRef.current, { x: 0 });

    // Animation sequence
    if (textEl) {
      tl.to(textEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
    if (subtextEl) {
      tl.to(subtextEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }
    if (progressBarEl) {
      tl.to(progressBarEl, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
    }

    // Wait for progress to hit 100%
    tl.to({}, { duration: 2.0 });

    // Fade out content
    if (contentRef.current) {
      tl.to(contentRef.current, { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.inOut' });
    }
    // Slide panels open & boom
    if (dividerRef.current) {
      tl.to(dividerRef.current, { opacity: 0, scaleY: 0, duration: 0.3 }, 'split-=0.2');
    }
    if (leftPanelRef.current) {
      tl.to(leftPanelRef.current, { 
        x: '-100%', 
        duration: 1.4, 
        ease: 'power4.inOut',
        onStart: () => playSound(completeAudio, false, 0.9)
      }, 'split');
    }
    if (rightPanelRef.current) {
      tl.to(rightPanelRef.current, { x: '100%', duration: 1.4, ease: 'power4.inOut' }, 'split');
    }

    return () => {
      clearInterval(progressInterval);
      stopSound(humAudio);
      tl.kill();
      document.body.style.overflow = 'auto';
    };
  }, [isInitialized, onComplete]);

  return (
    <>
      <style>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 2s infinite linear;
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flowDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes wave {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes wave-reverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 300; }
        }
        @keyframes scrollText {
          0% { transform: translateX(0%); }
          50% { transform: translateX(-40%); }
          100% { transform: translateX(0%); }
        }
        .avatar-mask {
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
        }
      `}</style>
      
      <div ref={containerRef} className="fixed inset-0 z-[9999] flex pointer-events-auto">
        
        {/* Left Dark Panel */}
        <div 
          ref={leftPanelRef}
          className="relative w-1/2 h-full bg-[#000000] overflow-hidden shadow-[inset_-20px_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen parallax-bg" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] parallax-fg" />
          
          {/* Animated Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] parallax-bg" />
          
          {/* Glowing intersections */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_2px_at_0px_0px,rgba(59,130,246,0.4),transparent)] bg-[size:50px_50px] parallax-fg" />
        </div>

        {/* Vertical Glowing Divider Line */}
        <div 
          ref={dividerRef}
          className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-400/50 -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        >
          {/* Shimmer on divider */}
          <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent animate-shimmer-slide" />
        </div>

        {/* Right Light Panel */}
        <div 
          ref={rightPanelRef}
          className="relative w-1/2 h-full bg-[#ffffff] overflow-hidden shadow-[inset_20px_0_50px_rgba(0,0,0,0.05)]"
        >
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] parallax-bg" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[100px] parallax-fg" />
          
          {/* Subtle Grid on White Side */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] parallax-bg" />
        </div>

        {/* Center Content */}
        <div 
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
        >
          

          {/* Interactive Core system initializer or Progress bar (Centered in screen) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-sm px-6">
            {!isInitialized ? (
              <button 
                onClick={handleInitialize}
                className="group pointer-events-auto flex flex-col items-center gap-4 cursor-pointer"
              >
                {/* Sci-Fi glowing circular controller */}
                <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center rounded-full border border-blue-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.35),0_0_80px_rgba(59,130,246,0.15)] transition-all duration-500 hover:scale-105 hover:border-blue-400 hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                  {/* Outer pulsing ring */}
                  <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-25 group-hover:opacity-50" />
                  {/* Spinning holographic grid scanner */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-blue-400/50 animate-[spin_8s_linear_infinite]" />
                  <div className="absolute inset-3 rounded-full border-t border-r border-blue-400 animate-[spin_3s_linear_infinite]" />
                  
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-blue-400 animate-pulse">DEEP MIND OS</span>
                    <span className="text-[14px] md:text-[16px] font-black tracking-widest text-white mt-1.5 group-hover:text-blue-200 transition-colors duration-300">INITIALIZE</span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-neutral-400 uppercase mt-1">[ CLICK ]</span>
                  </div>
                </div>
              </button>
            ) : (
              <div className="flex flex-col items-center w-full">
                {/* Text */}
                <div className="text-center z-10 flex flex-col items-center">
                  <div className="h-7 overflow-hidden rounded-full border border-white/10 bg-[#090a10] shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
                    <p ref={subtextRef} className="text-[10px] md:text-xs font-mono tracking-widest text-neutral-300 uppercase px-4 py-1.5">
                      {loadingMessages[messageIndex]}
                    </p>
                  </div>
                </div>

                {/* Holographic Progress Bar */}
                <div ref={progressBarRef} className="mt-8 w-64 md:w-80 flex flex-col items-center gap-3 z-10">
                  <div className="flex items-center justify-between w-full text-[9px] md:text-[10px] font-mono font-bold tracking-[0.3em] text-white mix-blend-difference">
                    <span>&lt; L O A D I N G &gt;</span>
                    <span>{progress}%</span>
                  </div>
                  
                  {/* Holographic Glass Container */}
                  <div className="w-full h-1.5 bg-[#090a10] rounded-full overflow-hidden relative border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    
                    {/* Animated Progress Fill */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-150 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    >
                      {/* Shimmer effect running across the bar */}
                      <div className="absolute inset-0 w-[50px] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] animate-shimmer-slide" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default SplitLoadingScreen;
