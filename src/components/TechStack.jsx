import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Shuffle from './Shuffle';
import { Layers, Server, Cpu, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HudCornerBrackets = () => (
  <>
    <svg className="absolute top-0 left-0 w-8 h-8 text-blue-500/50 pointer-events-none" viewBox="0 0 32 32">
      <path d="M0,32 L0,0 L32,0" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="0" y="0" width="4" height="4" fill="currentColor" />
    </svg>
    <svg className="absolute top-0 right-0 w-8 h-8 text-blue-500/50 pointer-events-none transform rotate-90" viewBox="0 0 32 32">
      <path d="M0,32 L0,0 L32,0" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="0" y="0" width="4" height="4" fill="currentColor" />
    </svg>
    <svg className="absolute bottom-0 right-0 w-8 h-8 text-blue-500/50 pointer-events-none transform rotate-180" viewBox="0 0 32 32">
      <path d="M0,32 L0,0 L32,0" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="0" y="0" width="4" height="4" fill="currentColor" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-8 h-8 text-blue-500/50 pointer-events-none transform -rotate-90" viewBox="0 0 32 32">
      <path d="M0,32 L0,0 L32,0" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="0" y="0" width="4" height="4" fill="currentColor" />
    </svg>
  </>
);

const HudPanel = ({ title, icon: Icon, skills, colorClass, isCenter = false, align = "right" }) => {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const barsRef = useRef([]);

  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotXTo = useRef(null);
  const rotYTo = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.set(cardRef.current, { transformPerspective: 1200 });
    
    xTo.current = gsap.quickTo(cardRef.current, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(cardRef.current, "y", { duration: 0.6, ease: "power3.out" });
    rotXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });
    rotYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });

    // Animate energy bars on scroll
    let anim;
    if (barsRef.current.length > 0) {
      anim = gsap.fromTo(barsRef.current, 
        { width: "0%" },
        {
          width: (i, target) => target.dataset.width,
          duration: 2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    return () => {
      if (anim) {
        anim.kill();
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const wrapper = wrapperRef.current;
    if (!wrapper || !xTo.current) return;
    
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xTo.current(x * 0.15);
    yTo.current(y * 0.15);
    rotXTo.current(-y * 0.08);
    rotYTo.current(x * 0.08);
  };

  const handleMouseLeave = () => {
    if (!xTo.current) return;
    xTo.current(0);
    yTo.current(0);
    rotXTo.current(0);
    rotYTo.current(0);
  };

  const scaleClass = isCenter ? "z-20 scale-[1.02] md:scale-[1.1] shadow-[0_0_120px_rgba(59,130,246,0.2)]" : "z-10 scale-[1.00] md:scale-[1.05] opacity-95 hover:opacity-100 hover:z-30 hover:scale-[1.02] md:hover:scale-[1.1]";
  const bgClass = isCenter ? "bg-white/95" : "bg-white/95";

  return (
    <div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full perspective-[1200px] group transition-all duration-500 ease-out will-change-transform ${scaleClass}`}
    >
      <div 
        ref={cardRef}
        className={`relative w-full h-full rounded-[24px] p-10 overflow-hidden backdrop-blur-2xl border border-neutral-200 shadow-xl transition-shadow duration-300 ${bgClass} ${colorClass}`}
      >
        <HudCornerBrackets />

        {/* Scanning Glow Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px]">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-scan-glow" />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-5 border-b border-neutral-200/50 pb-5">
            <div className="relative">
              {/* Rotating UI Ring */}
              <div className="absolute inset-0 -m-2 rounded-full border border-dashed border-blue-400/40 animate-rotate-ui" />
              <div className={`p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 shadow-inner relative z-10`}>
                <Icon className={`w-7 h-7 text-blue-600 ${isCenter ? 'drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]' : ''}`} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase mb-1">MODULE_SYS</span>
              <h3 className="text-black font-bold tracking-[0.2em] uppercase text-sm md:text-base">{title}</h3>
            </div>
          </div>

          {/* Futuristic Skill Energy Bars */}
          <div className="flex flex-col gap-6">
            {skills.map((skill, i) => (
              <div key={skill.name} className="flex flex-col gap-2 group/skill cursor-default relative">
                
                {/* Hover Highlights */}
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />

                <div className="flex justify-between items-end relative z-10">
                  {align === "left" ? (
                    <span className="text-xs font-semibold tracking-wider text-neutral-800 flex items-center gap-3">
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 shrink-0" />
                      <span className="text-[11px] font-mono font-bold text-blue-600 tracking-widest w-8 text-left shrink-0">{skill.percent}%</span>
                      <span className="border-l border-neutral-200 pl-3 leading-none py-0.5">{skill.name}</span>
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-semibold tracking-wider text-neutral-800 flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-blue-600 tracking-widest">{skill.percent}%</span>
                    </>
                  )}
                </div>
                
                {/* Energy Bar Track */}
                <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200/50 relative z-10">
                  <div 
                    ref={el => barsRef.current[i] = el}
                    data-width={`${skill.percent}%`}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 rounded-full flex items-center justify-end pr-[2px]"
                    style={{ width: '0%' }}
                  >
                    {/* Glowing endpoint pulse */}
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-energy-pulse text-blue-400" />
                    
                    {/* Scrolling data dots */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-[1px] left-0 w-full h-[2px] animate-data-stream opacity-80">
                        <div className="w-[3px] h-full bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const staticParticles = [...Array(25)].map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${4 + Math.random() * 5}s`,
  delay: `${Math.random() * 3}s`
}));

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.tech-panel-wrapper');
    if (!cards.length) return;
    
    const anim = gsap.fromTo(cards,
      { y: 150, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, []);

  const frontendSkills = [
    { name: "React.js", percent: 95 },
    { name: "Next.js", percent: 95 },
    { name: "Tailwind CSS", percent: 95 },
    { name: "GSAP", percent: 95 },
    { name: "Framer Motion", percent: 95 },
    { name: "TypeScript", percent: 92 },
  ];

  const backendSkills = [
    { name: "Node.js", percent: 90 },
    { name: "Express.js", percent: 88 },
    { name: "MongoDB", percent: 90 },
    { name: "Firebase", percent: 88 },
    { name: "PostgreSQL", percent: 85 },
    { name: "REST API", percent: 92 },
  ];

  const aiToolsSkills = [
    { name: "Python", percent: 95 },
    { name: "TensorFlow", percent: 90 },
    { name: "OpenCV", percent: 90 },
    { name: "Docker", percent: 85 },
    { name: "GitHub", percent: 92 },
    { name: "AWS", percent: 82 },
    { name: "Vercel", percent: 90 },
    { name: "Figma", percent: 88 },
  ];

  return (
    <section className="relative py-40 bg-white overflow-hidden z-10 selection:bg-blue-500/30">
      
      {/* Abstract Background Grid & Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[1000px] h-[1000px] bg-violet-500/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Central HUD Spotlight */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/5 rounded-full blur-[100px]" />
        
        {/* Subtle Cyberpunk Grain/Noise */}
        <div className="noise-overlay" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {staticParticles.map((p) => (
            <div 
              key={p.id}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
              style={{
                top: p.top,
                left: p.left,
                animation: `float ${p.duration} ease-in-out infinite alternate`,
                animationDelay: p.delay
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 relative z-10 flex flex-col gap-28">
        
        {/* Futuristic Header */}
        <div className="flex flex-col items-center justify-center text-center gap-5 relative">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>SYSTEM CAPABILITIES</span>
          </div>
          
          <div className="relative inline-block group cursor-default">
            <Shuffle
              text="TECH ARSENAL"
              tag="h2"
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
              shuffleDirection="up"
              duration={0.6}
              stagger={0.05}
              animationMode="evenodd"
              shuffleTimes={3}
            />
            {/* Glowing animated HUD underline */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[150%] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          </div>
          
          <p className="text-neutral-500 font-light text-base md:text-lg max-w-2xl mt-8 font-sans">
            Crafting scalable AI-powered web experiences with modern technologies. High-performance architecture engineered for the future.
          </p>
        </div>

        {/* Separate, Equal-Sized, Large HUD Layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full relative z-20 min-h-[650px] mt-24 mb-32 gap-8 lg:gap-10">
          
          {/* Left Panel - Frontend */}
          <div className="tech-panel-wrapper w-full lg:w-[32%] h-full order-2 lg:order-1">
            <HudPanel 
              title="FRONTEND" 
              icon={Layers} 
              skills={frontendSkills} 
              colorClass="hover:border-blue-400/50 border-white/20"
              align="left"
            />
          </div>

          {/* Center Panel - Backend (Featured) */}
          <div className="tech-panel-wrapper w-full lg:w-[32%] h-full order-1 lg:order-2">
            <HudPanel 
              title="BACKEND" 
              icon={Server} 
              skills={backendSkills} 
              colorClass="hover:border-indigo-400/60 border-neutral-200/70"
              align="left"
            />
          </div>

          {/* Right Panel - AI & Tools */}
          <div className="tech-panel-wrapper w-full lg:w-[32%] h-full order-3">
            <HudPanel 
              title="AI & TOOLS" 
              icon={Cpu} 
              skills={aiToolsSkills} 
              colorClass="hover:border-cyan-400/50 border-white/20"
              align="left"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
