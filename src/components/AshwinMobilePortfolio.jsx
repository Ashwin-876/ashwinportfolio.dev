import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Mail,
  Cpu,
  Code,
  Database,
  Send,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import TextType from './TextType';

export default function AshwinMobilePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');

  // Glass Word Card rotation state
  const floatingWords = [
    "VISION", "CREATE", "INNOVATE", "ELEVATE", "INSPIRE", 
    "EXPLORE", "EVOLVE", "IMAGINE", "CRAFT", "FOCUS", 
    "MOTION", "MINIMAL", "MODERN", "ELEGANCE", "PRECISION"
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState('word-fade-in');

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

  // Word Rotation Interval
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

  // Section Observer for Active Bottom Tab using performant IntersectionObserver
  useEffect(() => {
    const sections = ['hero-section', 'projects-section', 'capabilities-section', 'contact-section'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px', // Trigger when section occupies center view
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    }, 1200);
  };

  const projects = [
    { title: 'NeuralFlow AI', category: 'Agentic Orchestration', desc: 'Autonomous LLM agent system managing backend pipelines.' },
    { title: 'CyberSphere WebGL', category: 'Creative Frontend', desc: 'Ultra-smooth interactive 3D particle landscape.' },
    { title: 'Vortex Dashboard', category: 'SaaS Analytics', desc: 'High-performance real-time telemetry dashboard.' }
  ];

  return (
    <div className="mobile-portfolio-grain w-full min-h-screen text-[#111111] font-sans antialiased overflow-y-auto selection:bg-black/5 selection:text-black pb-28">
      
      {/* ── Injection of custom premium animations & textures ──────────────── */}
      <style>{`
        .mobile-portfolio-grain {
          background-color: #FAFAFA;
          position: relative;
        }
        .mobile-portfolio-grain::before {
          content: "";
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.025;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 1;
        }
        @keyframes floatCard {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }
        @keyframes floatPortrait {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-portrait {
          animation: floatPortrait 6s ease-in-out infinite;
        }
        @keyframes pulseShadow {
          0% { opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { opacity: 0.15; }
        }
        .animate-pulse-shadow {
          animation: pulseShadow 8s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-12px); }
        }
        .word-fade-in {
          animation: fadeInUp 0.45s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        .word-fade-out {
          animation: fadeOutUp 0.45s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scrollBounce {
          0% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(8px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.3; }
        }
        .animate-scroll-bounce {
          animation: scrollBounce 3s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Swiss Editorial Guidelines (Thin vertical lines at 5% opacity) */}
      <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />
      <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />

      {/* Floating Glass Accent Element */}
      <div className="absolute top-[26%] left-[6%] w-6 h-6 bg-white/10 border border-white/20 rounded-full blur-[0.5px] animate-float-card pointer-events-none z-0" />

      {/* 1. TOP HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-50 pointer-events-none">
        {/* AS Logo in Glass Square */}
        <button 
          onClick={() => scrollToSection('hero-section')}
          className="pointer-events-auto text-[22px] tracking-wide font-extrabold font-['Playfair_Display',_serif] bg-white/65 backdrop-blur-md border border-white/50 rounded-xl w-11 h-11 flex items-center justify-center shadow-sm cursor-pointer text-[#111111] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          AS
        </button>

        {/* Floating Circular Glass Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="pointer-events-auto w-11 h-11 flex items-center justify-center bg-white/65 backdrop-blur-md border border-white/50 rounded-full hover:rotate-90 shadow-sm cursor-pointer transition-all duration-500 active:scale-95"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-neutral-800" /> : <Menu className="w-5 h-5 text-neutral-800" />}
        </button>
      </header>

      {/* MOBILE MENU OVERLAY ( frosted glass Awwwards style ) */}
      <div className={`fixed inset-0 z-45 bg-white/80 backdrop-blur-3xl border-l border-white/20 flex flex-col justify-between p-8 pt-28 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-x-12'}`}>
        <div className="flex flex-col gap-6 text-left">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400 border-b border-neutral-100 pb-2">Navigation Menu</span>
          <button 
            onClick={() => scrollToSection('hero-section')}
            className="text-3xl font-light text-left text-neutral-800 hover:text-black transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('capabilities-section')}
            className="text-3xl font-light text-left text-neutral-800 hover:text-black transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollToSection('projects-section')}
            className="text-3xl font-light text-left text-neutral-800 hover:text-black transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Selected Work
          </button>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="text-3xl font-light text-left text-neutral-800 hover:text-black transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Contact
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-100 pt-6">
          <span className="text-[10px] font-mono text-neutral-400 tracking-wider">EDITORIAL PORTFOLIO V2.0</span>
          <span className="text-[10px] font-mono text-neutral-400">© 2026 Ashwin S. All rights reserved.</span>
        </div>
      </div>

      {/* 2. HERO SCREEN (Exactly matches the mockup above-the-fold design) */}
      <section id="hero-section" className="relative w-full h-[100dvh] flex flex-col justify-between px-6 pt-16 pb-12 overflow-hidden bg-white select-none">
        
        {/* Soft Tactile Paper Grain Overlay */}
        <div className="paper-grain pointer-events-none" />

        {/* Swiss Editorial Guidelines (Thin vertical lines at 4% opacity) */}
        <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />
        <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-neutral-800/[0.04] pointer-events-none z-0" />

        {/* Soft Window-light Shadow Blur Layer */}
        <div className="absolute top-[10%] left-[4%] w-[450px] h-[300px] bg-neutral-900/5 rounded-full blur-[90px] pointer-events-none z-0 animate-pulse-shadow" />

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
        <div className="relative z-30 flex flex-col items-start text-left max-w-[50%] mt-0">
          {/* Eyebrow */}
          <span className="text-[14px] font-medium tracking-[8px] text-[#A8A8A8] uppercase mb-4 block">
            HELLO, I'M
          </span>

          {/* Heading Name (Playfair Display Editorial Serif - 70px max hierarchy) */}
          <h1 className="font-['Playfair_Display',_serif] text-[70px] font-bold text-neutral-900 leading-[0.9] tracking-tight flex items-center">
            <TextType
              text="Ashwin"
              as="span"
              typingSpeed={80}
              initialDelay={300}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-neutral-400 font-light font-sans ml-1 text-[60px]"
            />
          </h1>


          {/* Biography Bio */}
          <p className="text-[17px] text-[#666666] leading-[1.8] font-light max-w-[260px] mb-8 mt-6">
            I build intelligent systems and data-driven solutions that create real-world impact.
          </p>

          {/* CTA Button (20px Rounded, Magnetic feel, Sliding Arrow, Scale on tap) */}
          <button 
            onClick={() => scrollToSection('projects-section')}
            className="group flex items-center gap-2.5 px-6.5 py-4 bg-[#111111] hover:bg-black text-white text-[10px] font-semibold tracking-wider uppercase rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] border-none cursor-pointer pointer-events-auto"
          >
            <span>View Work</span>
            <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-2" />
          </button>

          {/* Social Icons positioned directly below CTA button with 32px spacing (mt-8) */}
          <div className="flex items-center gap-[22px] mt-8 pointer-events-auto">
            <a 
              href="https://linkedin.com/in/ashwinshaiju" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-[52px] h-[52px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <FaLinkedin className="w-4.5 h-4.5 text-black" />
            </a>
            <a 
              href="https://github.com/Ashwin-876" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="w-[52px] h-[52px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <FaGithub className="w-4.5 h-4.5 text-black" />
            </a>
            <a 
              href="mailto:ashwinshaijus@gmail.com" 
              aria-label="Email"
              className="w-[52px] h-[52px] flex items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-[20px] hover:bg-white/30 hover:scale-[1.08] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <Mail className="w-4.5 h-4.5 text-black" />
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

      </section>

      {/* 3. CAPABILITIES / FOCUS */}
      <section id="capabilities-section" className="px-6 py-20 bg-neutral-50 border-y border-neutral-100 relative">
        <div className="flex flex-col gap-6 max-w-[90%] mx-auto">
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-bold">01 / CAPABILITIES</span>
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Technical Focus</h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-[18px] border border-neutral-200/50 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-neutral-800" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-sm font-bold text-[#111111]">AI Orchestration</h3>
                <p className="text-xs text-[#666666] leading-relaxed">Agentic workflows, prompt-chaining logic pipelines, and LLM custom integrations.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white rounded-[18px] border border-neutral-200/50 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Code className="w-5 h-5 text-neutral-800" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-sm font-bold text-[#111111]">Interactive Systems</h3>
                <p className="text-xs text-[#666666] leading-relaxed">High-performance custom WebGL animations, shaders, and complex physics layouts.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white rounded-[18px] border border-neutral-200/50 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-neutral-800" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-sm font-bold text-[#111111]">Full Stack Architecture</h3>
                <p className="text-xs text-[#666666] leading-relaxed">Ultra-scalable microservices, fast cloud setups, and secure relational database architectures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SELECTED PROJECTS */}
      <section id="projects-section" className="px-6 py-20 bg-white">
        <div className="flex flex-col gap-6 max-w-[90%] mx-auto">
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-bold">02 / PORTFOLIO</span>
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Selected Works</h2>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-6 bg-white rounded-[18px] border border-neutral-200/60 hover:border-black/30 shadow-sm transition-all duration-300 flex items-center justify-between group">
                <div className="flex flex-col gap-1 text-left pr-4">
                  <span className="text-[9px] font-mono text-[#666666] uppercase tracking-wider">{proj.category}</span>
                  <h3 className="text-sm font-bold text-[#111111] group-hover:text-neutral-900 transition-colors">{proj.title}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed max-w-[210px]">{proj.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS SUM */}
      <section className="px-6 py-10 bg-neutral-50 border-t border-neutral-100">
        <div className="grid grid-cols-2 gap-4 max-w-[90%] mx-auto">
          <div className="p-6 bg-white rounded-[18px] border border-neutral-200/50 text-center flex flex-col gap-1.5">
            <span className="text-2xl font-black tracking-tight text-[#111111]">120+</span>
            <span className="text-[9px] font-bold text-[#666666] uppercase tracking-wider">Projects Completed</span>
          </div>
          <div className="p-6 bg-white rounded-[18px] border border-neutral-200/50 text-center flex flex-col gap-1.5">
            <span className="text-2xl font-black tracking-tight text-[#111111]">40+</span>
            <span className="text-[9px] font-bold text-[#666666] uppercase tracking-wider">Global Clients</span>
          </div>
        </div>
      </section>

      {/* 6. CONTACT FORM */}
      <section id="contact-section" className="px-6 py-20 bg-white border-t border-neutral-200/30">
        <div className="flex flex-col gap-6 max-w-[90%] mx-auto">
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-bold">03 / INQUIRIES</span>
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Let's Connect</h2>
          </div>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="name" className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">Your Name</label>
              <input 
                id="name"
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#E5E5EA]/50 rounded-lg text-xs text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-black/50 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="email" className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="email@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#E5E5EA]/50 rounded-lg text-xs text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-black/50 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="message" className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">Message</label>
              <textarea 
                id="message"
                rows="4" 
                placeholder="Tell me about your project..." 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#E5E5EA]/50 rounded-lg text-xs text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-black/50 focus:bg-white transition-colors resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || submitSuccess}
              className={`w-full py-3.5 px-4 rounded-lg text-xs font-semibold text-white shadow-md active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 border-none cursor-pointer ${submitSuccess ? 'bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.2)]' : 'bg-[#111111]'}`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Message Sent</span>
                </>
              ) : (
                <>
                  <span>Submit Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="px-6 py-8 bg-[#F5F5F7] border-t border-[#E5E5EA]/50 text-center flex flex-col gap-3">
        <span className="text-xl tracking-wide font-extrabold font-['Playfair_Display',_serif]">
          AS
        </span>
        <span className="text-[10px] text-[#666666]">© 2026 Ashwin S. All rights reserved.</span>
      </footer>

      {/* ── Floating Glass Bottom Navigation Pill (WORK, PROJECTS, ABOUT, CONTACT) ─────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/75 backdrop-blur-[20px] border border-white/45 rounded-full px-2 py-1.5 flex items-center gap-1 shadow-[0_12px_40px_rgba(0,0,0,0.08)] max-w-[95vw] pointer-events-auto">
        {['WORK', 'PROJECTS', 'ABOUT', 'CONTACT'].map((tab) => {
          const sectionId = tab === 'WORK' ? 'hero-section' : tab === 'PROJECTS' ? 'projects-section' : tab === 'ABOUT' ? 'capabilities-section' : 'contact-section';
          const isActive = activeSection === sectionId;
          return (
            <button
              key={tab}
              onClick={() => scrollToSection(sectionId)}
              className={`px-4.5 py-2 rounded-full text-[9px] font-bold tracking-[2px] transition-all duration-300 cursor-pointer border-none bg-transparent ${isActive ? 'bg-[#111111] text-white shadow-sm' : 'text-neutral-500 hover:text-black'}`}
            >
              {tab}
            </button>
          );
        })}
      </div>

    </div>
  );
}
