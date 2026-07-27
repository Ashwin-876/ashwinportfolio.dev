import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import ThreeAirplane from './ThreeAirplane';
import { 
  ArrowUpRight, 
  Cpu, 
  Code, 
  Database, 
  Sparkles, 
  Send, 
  CheckCircle, 
  GraduationCap, 
  Briefcase,
  Layers,
  Search,
  ExternalLink
} from 'lucide-react';

export default function StorytellingPortfolio() {
  const containerRef = useRef(null);
  const [pathD, setPathD] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Dynamic SVG Path Calculation based on section landmark elements
  const calculatePath = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const getCenterCoords = (id, offset = { x: 0, y: 0 }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2 + offset.x,
        y: rect.top - containerRect.top + rect.height / 2 + offset.y
      };
    };

    // Landmark coordinates relative to the parent scroll container
    const startPoint = { x: -80, y: 220 }; // Starts offscreen left
    const heroPoint = getCenterCoords('hero-landmark', { x: -140, y: 40 }) || { x: 120, y: 350 };
    const aboutPoint = getCenterCoords('about-landmark', { x: -100, y: 0 }) || { x: 280, y: 780 };
    const skillsPoint = getCenterCoords('skills-landmark', { x: 0, y: -20 }) || { x: 180, y: 1350 };
    const expPoint = getCenterCoords('experience-landmark', { x: -30, y: 0 }) || { x: 220, y: 1980 };
    const projPoint = getCenterCoords('projects-landmark', { x: 60, y: -40 }) || { x: 260, y: 2750 };
    const certPoint = getCenterCoords('certificates-landmark', { x: -40, y: 0 }) || { x: 190, y: 3450 };
    const contactPoint = getCenterCoords('contact-landmark', { x: -130, y: 80 }) || { x: 140, y: 4120 };
    const footerPoint = getCenterCoords('footer-landmark', { x: 0, y: 0 }) || { x: 200, y: 4500 };

    // Building a smooth, winding 2D Bezier path spanning the entire portfolio height
    let d = `M ${startPoint.x} ${startPoint.y} `;

    // 1. Hero curve
    d += `C ${startPoint.x + 100} ${startPoint.y + 20}, ${heroPoint.x - 150} ${heroPoint.y - 120}, ${heroPoint.x} ${heroPoint.y} `;

    // 2. About section Loop (loops around the about header)
    const ax = aboutPoint.x;
    const ay = aboutPoint.y;
    d += `C ${heroPoint.x + 180} ${heroPoint.y + 120}, ${ax - 90} ${ay - 140}, ${ax - 90} ${ay} `;
    d += `C ${ax - 90} ${ay + 110}, ${ax + 90} ${ay + 110}, ${ax + 90} ${ay} `;
    d += `C ${ax + 90} ${ay - 110}, ${ax - 90} ${ay - 110}, ${ax} ${ay + 80} `;

    // 3. Skills section weave (wiggles through capabilities grid)
    d += `C ${ax} ${ay + 250}, ${skillsPoint.x - 140} ${skillsPoint.y - 180}, ${skillsPoint.x} ${skillsPoint.y} `;

    // 4. Experience timeline loop (vertical loop around timeline)
    const ex = expPoint.x;
    const ey = expPoint.y;
    d += `C ${skillsPoint.x + 140} ${skillsPoint.y + 160}, ${ex + 80} ${ey - 180}, ${ex} ${ey - 80} `;
    d += `C ${ex - 80} ${ey - 80}, ${ex - 80} ${ey + 80}, ${ex} ${ey + 80} `;
    d += `C ${ex + 80} ${ey + 80}, ${ex + 80} ${ey - 20}, ${ex - 20} ${ey + 140} `;

    // 5. Projects slow-glide over each card
    d += `C ${ex - 120} ${ey + 280}, ${projPoint.x - 140} ${projPoint.y - 180}, ${projPoint.x} ${projPoint.y} `;

    // 6. Certificates spiral
    const cx = certPoint.x;
    const cy = certPoint.y;
    d += `C ${projPoint.x + 150} ${projPoint.y + 180}, ${cx - 110} ${cy - 120}, ${cx - 70} ${cy - 40} `;
    d += `C ${cx - 30} ${cy + 40}, ${cx + 70} ${cy + 40}, ${cx + 70} ${cy} `;
    d += `C ${cx + 70} ${cy - 80}, ${cx - 70} ${cy - 80}, ${cx} ${cy + 100} `;

    // 7. Contact runway glide (curves and aligns straight into the contact runway)
    d += `C ${cx} ${cy + 250}, ${contactPoint.x - 220} ${contactPoint.y - 140}, ${contactPoint.x - 100} ${contactPoint.y - 20} `;
    d += `L ${contactPoint.x} ${contactPoint.y} `; // Solid straight landing glide

    // 8. Footer terminal transformation
    d += `C ${contactPoint.x + 120} ${contactPoint.y + 100}, ${footerPoint.x - 120} ${footerPoint.y - 100}, ${footerPoint.x} ${footerPoint.y} `;

    setPathD(d);
  };

  // Recalculate path positions on mount and resizing
  useEffect(() => {
    calculatePath();
    window.addEventListener('resize', calculatePath);
    // Timeout buffer to ensure layout elements have rendered fully
    const timer = setTimeout(calculatePath, 800);

    return () => {
      window.removeEventListener('resize', calculatePath);
      clearTimeout(timer);
    };
  }, []);

  // Track active scroll to toggle path opacity
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 450); // Fades path 450ms after scrolling stops
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // GSAP Storytelling Animation setup
  useEffect(() => {
    if (!pathD) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const plane = document.getElementById('storytelling-airplane');
    const maskPath = document.getElementById('storytelling-trail-mask-path');
    const container = containerRef.current;
    if (!plane || !maskPath || !container) return;

    // Get total SVG path length for the trail mask reveal animation
    const path = document.getElementById('storytelling-path-ref');
    const totalLength = path.getTotalLength();

    // Set initial mask values
    gsap.set(maskPath, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength
    });

    // Create the master scroll-bound timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // Snappy flight curves and quick response to scrolling
        invalidateOnRefresh: true,
      }
    });

    // Animate plane along SVG path
    tl.to(plane, {
      motionPath: {
        path: '#storytelling-path-ref',
        autoRotate: true,
        align: '#storytelling-path-ref',
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
    }, 0);

    // Reveal trail behind airplane as it flies
    tl.to(maskPath, {
      strokeDashoffset: 0,
      ease: 'none'
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathD]);

  // Project hover wiggling effect
  const handleProjectHover = (isHovered) => {
    const plane = document.getElementById('storytelling-airplane-icon');
    if (!plane) return;
    
    if (isHovered) {
      // Gentle circle wiggle on card hover
      gsap.to(plane, {
        scale: 1.25,
        x: '+=5',
        y: '-=5',
        rotation: '+=10',
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    } else {
      gsap.to(plane, {
        scale: 1.0,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      id="storytelling-container"
      className="w-full bg-white text-[#111111] relative select-none antialiased pb-24"
    >
      
      {/* 1. SCROLL-DRIVEN FLIGHT SVG CANVAS CONTAINER (Fades in/out on scroll activity) */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible transition-opacity duration-700 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}>
        <defs>
          {/* Linear Gradient for Plane Trail */}
          <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0.15" />
          </linearGradient>

          {/* Mask to reveal the trail path as the plane moves */}
          <mask id="trail-reveal-mask">
            <path 
              id="storytelling-trail-mask-path"
              d={pathD}
              stroke="white"
              strokeWidth="5"
              fill="none"
            />
          </mask>
        </defs>

        {/* Gray underlying guide path */}
        {pathD && (
          <path 
            id="storytelling-path-guide"
            d={pathD}
            stroke="#F5F5F7"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="6,6"
          />
        )}

        {/* Dynamic active blue trail masked by scroll progress */}
        {pathD && (
          <path 
            id="storytelling-path-ref"
            d={pathD}
            stroke="url(#trail-gradient)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="5,4"
            mask="url(#trail-reveal-mask)"
          />
        )}
      </svg>

      {/* 2. THE FLOATING 3D AIRPLANE MODEL */}
      {pathD && (
        <div 
          id="storytelling-airplane"
          className="fixed z-40 pointer-events-none origin-center flex items-center justify-center transition-shadow duration-300"
          style={{ 
            width: '80px',
            height: '80px',
            top: 0, 
            left: 0,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' 
          }}
        >
          <div id="storytelling-airplane-icon" className="w-full h-full">
            <ThreeAirplane />
          </div>
        </div>
      )}

      {/* 3. FLOATING NAV */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border border-[#F5F5F7]/85 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <a href="#hero" className="text-lg font-bold tracking-tight">
          A<span className="text-[#4F7CFF]">.</span>
        </a>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase animate-pulse">Story Mode Active</span>
        </div>
      </header>

      {/* 4. SECTIONS */}
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-screen px-6 flex flex-col justify-center relative z-10">
        <div className="max-w-4xl mx-auto w-full pt-16 flex flex-col gap-6">
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-[#F5F5F7] border border-[#E5E5EA] rounded-full">
            <Sparkles className="w-3 h-3 text-[#4F7CFF]" />
            <span className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Interactive Flight Journey</span>
          </div>

          <h1 id="hero-landmark" className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] uppercase">
            The Journey Of<br />
            <span className="bg-gradient-to-r from-[#4F7CFF] to-[#80A0FF] bg-clip-text text-transparent">
              Creative Logic
            </span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[#666666] max-w-md font-light">
            Explore a storytelling portfolio crafted at the crossroads of artificial intelligence and premium web animation. Scroll down to guide the paper airplane.
          </p>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about" className="min-h-[80vh] px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10">
        <div className="max-w-4xl mx-auto w-full py-16 flex flex-col gap-6">
          <h2 id="about-landmark" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111]">
            01 / Narrative
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#666666] font-light text-sm sm:text-base leading-relaxed">
            <p>
              I build robust technical systems and craft visual interfaces. My focus centers on creating products where algorithms run seamlessly underneath elegant, Apple-inspired layouts.
            </p>
            <p>
              By combining GSAP motion grids, WebGL elements, and modern frontend engines, I design interactions that tell memorable stories and elevate user engagements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CAPABILITIES */}
      <section id="skills" className="min-h-screen px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10 bg-white">
        <div className="max-w-4xl mx-auto w-full py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#4F7CFF] uppercase font-bold">02 / Technical Focus</span>
            <h2 id="skills-landmark" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'AI Engineering', desc: 'Agent orchestration, prompt logic pipelines, and LLM integrations.', icon: <Cpu className="w-5 h-5 text-[#4F7CFF]" /> },
              { title: 'Interactive Web', desc: 'Cinematic layout physics, GSAP, WebGL, and custom shaders.', icon: <Code className="w-5 h-5 text-[#4F7CFF]" /> },
              { title: 'Full Stack', desc: 'Fast, secure Node architectures with scalable database structures.', icon: <Database className="w-5 h-5 text-[#4F7CFF]" /> },
            ].map((skill, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#F5F5F7] rounded-[24px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:border-neutral-200 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                  {skill.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold">{skill.title}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EXPERIENCE */}
      <section id="experience" className="min-h-screen px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10 bg-white">
        <div className="max-w-4xl mx-auto w-full py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#4F7CFF] uppercase font-bold">03 / History</span>
            <h2 id="experience-landmark" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Timeline</h2>
          </div>

          <div className="border-l-2 border-[#F5F5F7] pl-8 ml-4 flex flex-col gap-12 relative">
            {[
              { date: '2025 - Present', role: 'Lead Interactive Developer', company: 'NovaLabs AI', desc: 'Engineering next-generation AI dashboard layouts and high-performance frontend visualizers.' },
              { date: '2023 - 2025', role: 'Full Stack Engineer', company: 'QuantumByte', desc: 'Built secure orchestration APIs, user analytics tools, and core SaaS billing infrastructure.' },
            ].map((exp, idx) => (
              <div key={idx} className="relative flex flex-col gap-2">
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#4F7CFF] shadow-sm z-10" />
                <span className="text-[10px] font-mono text-[#666666]">{exp.date}</span>
                <h3 className="text-base font-bold">{exp.role} <span className="text-neutral-400 font-light">@ {exp.company}</span></h3>
                <p className="text-xs text-[#666666] leading-relaxed max-w-md">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PROJECTS */}
      <section id="projects" className="min-h-screen px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10 bg-[#F5F5F7]/30">
        <div className="max-w-4xl mx-auto w-full py-20 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#4F7CFF] uppercase font-bold">04 / Projects</span>
            <h2 id="projects-landmark" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Showcase</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Neural Synapse visualizer', desc: 'Real-time WebGL shader rendering neuronal node connections.', tags: ['React', 'Three.js', 'GLSL'] },
              { title: 'Autonomous agent coordinator', desc: 'High-throughput LLM pipeline coordinator with custom tools.', tags: ['Python', 'LangChain', 'FastAPI'] },
            ].map((proj, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => handleProjectHover(true)}
                onMouseLeave={() => handleProjectHover(false)}
                className="bg-white border border-[#E5E5EA]/40 rounded-[28px] p-6 shadow-sm hover:shadow-md hover:border-[#4F7CFF]/15 transition-all duration-300 flex flex-col justify-between min-h-[220px] group cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold group-hover:text-[#4F7CFF] transition-colors">{proj.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F7] group-hover:bg-[#4F7CFF] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-[#666666] leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono font-medium px-2.5 py-0.5 bg-[#F5F5F7] text-[#666666] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CERTIFICATIONS */}
      <section id="certificates" className="min-h-[80vh] px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10 bg-white">
        <div className="max-w-4xl mx-auto w-full py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#4F7CFF] uppercase font-bold">05 / Accreditations</span>
            <h2 id="certificates-landmark" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Certificates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'TensorFlow Developer Certified', issuer: 'Google AI', date: '2025' },
              { title: 'Advanced Architecting on AWS', issuer: 'Amazon Web Services', date: '2024' },
            ].map((cert, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 bg-white border border-[#F5F5F7] rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)]"
              >
                <div className="w-10 h-10 rounded-full bg-[#4F7CFF]/5 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#4F7CFF]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{cert.title}</span>
                  <span className="text-[10px] text-[#666666] font-mono mt-0.5">{cert.issuer} • {cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT & LANDING RUNWAY */}
      <section id="contact" className="min-h-screen px-6 flex flex-col justify-center border-t border-[#F5F5F7] relative z-10 bg-white">
        <div className="max-w-4xl mx-auto w-full py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Form Info & Mock Runway Landmark */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#4F7CFF] uppercase font-bold">06 / Landing Zone</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Contact</h2>
            </div>
            
            <p className="text-xs text-[#666666] leading-relaxed">
              Send me a message to launch a new collaboration. As you scroll, the airplane will land directly on the runway markers.
            </p>

            {/* Mock Runway display */}
            <div className="flex items-center gap-3 py-4 border-y border-[#F5F5F7] mt-2 relative">
              <div className="flex flex-col gap-1 w-24">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#4F7CFF] font-bold">Runway 09R</span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-neutral-800">TOUCHDOWN ZONE</span>
              </div>
              <div className="flex-1 h-[2px] border-b-2 border-dashed border-[#4F7CFF] relative">
                {/* Landing marker dot */}
                <div id="contact-landmark" className="absolute right-0 -top-1 w-2.5 h-2.5 rounded-full bg-[#4F7CFF] shadow-[0_0_8px_rgba(79,124,255,0.8)] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column: Mini Contact Form */}
          <div className="md:col-span-7 bg-[#F5F5F7]/30 border border-[#F5F5F7] p-8 rounded-[32px] shadow-sm w-full">
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-[#E5E5EA] rounded-[14px] text-xs focus:border-[#4F7CFF] outline-none transition-colors"
                />
              </div>

              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-[#E5E5EA] rounded-[14px] text-xs focus:border-[#4F7CFF] outline-none transition-colors"
                />
              </div>

              <div>
                <textarea 
                  placeholder="Message" 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-[#E5E5EA] rounded-[14px] text-xs focus:border-[#4F7CFF] outline-none transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-full shadow-sm hover:shadow active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Launch Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="px-6 py-16 border-t border-[#F5F5F7] bg-white relative z-10 text-center flex flex-col gap-6">
        <div id="footer-landmark" className="text-xl font-bold tracking-tight text-neutral-400 group cursor-default select-none">
          A<span className="text-[#4F7CFF]">.</span>
        </div>
        <span className="text-[10px] font-mono text-[#666666]">
          © 2026 Ashwin. Built with React, GSAP ScrollTrigger & MotionPath.
        </span>
      </footer>

    </div>
  );
}
