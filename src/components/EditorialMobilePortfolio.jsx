import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Share2, 
  Terminal, 
  Menu, 
  X, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function EditorialMobilePortfolio({ onContactClick, onViewProjectsClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Swiss editorial feature cards data
  const features = [
    {
      id: 'ai-dev',
      icon: <Sparkles className="w-4 h-4 text-[#4F7CFF]" />,
      title: 'AI Development',
      desc: 'Integrating LLMs, prompt pipelines, and autonomous agent systems.',
    },
    {
      id: 'ml-ops',
      icon: <Share2 className="w-4 h-4 text-[#4F7CFF]" />,
      title: 'Machine Learning',
      desc: 'Deploying computer vision models and real-time neural classifiers.',
    },
    {
      id: 'full-stack',
      icon: <Terminal className="w-4 h-4 text-[#4F7CFF]" />,
      title: 'Full Stack Engineering',
      desc: 'Building modern React and Next.js platforms with production-ready APIs.',
    },
  ];

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-inter w-full min-h-full bg-white text-[#111111] relative overflow-y-auto flex flex-col select-none antialiased scroll-smooth hide-scrollbar pb-24">
      
      {/* SUBTLE SWISS COLUMN GRID BACKDROP */}
      <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none z-0 px-6">
        <div className="border-r border-[#F5F5F7] h-full"></div>
        <div className="border-r border-[#F5F5F7] h-full"></div>
        <div className="border-r border-[#F5F5F7] h-full"></div>
      </div>

      {/* DOTTED / CURVED DECORATIVE PATTERNS (Subtle background details) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Curved thin path line */}
        <svg className="absolute top-[28%] left-[-20%] w-[140%] h-[300px] text-[#F5F5F7]/80 opacity-60" fill="none" viewBox="0 0 400 200">
          <path d="M 0 120 C 150 180, 250 20, 400 80" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {/* Subtle dots group */}
        <svg className="absolute top-[50%] right-6 w-16 h-16 text-[#F5F5F7]" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="2" />
          <circle cx="30" cy="10" r="2" />
          <circle cx="50" cy="10" r="2" />
          <circle cx="10" cy="30" r="2" />
          <circle cx="30" cy="30" r="2" />
          <circle cx="50" cy="30" r="2" />
          <circle cx="10" cy="50" r="2" />
          <circle cx="30" cy="50" r="2" />
          <circle cx="50" cy="50" r="2" />
        </svg>
      </div>

      {/* 1. TOP NAVIGATION */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border border-neutral-100/50 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-300">
        {/* Minimal Logo */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-lg font-bold tracking-tight text-[#111111] hover:opacity-85 transition-opacity bg-transparent border-none cursor-pointer"
        >
          A<span className="text-[#4F7CFF]">.</span>
        </button>

        {/* Circular Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5EA] shadow-sm text-[#111111] hover:bg-[#F5F5F7] active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 bg-white flex flex-col justify-between p-10 pt-28 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <div className="flex flex-col gap-6 text-left">
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#666666] border-b border-[#F5F5F7] pb-2">Index</span>
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-3xl font-light tracking-tight text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            01 / Home
          </button>
          <button 
            onClick={() => scrollToSection('features-section')}
            className="text-3xl font-light tracking-tight text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            02 / Capabilities
          </button>
          <button 
            onClick={() => { setMenuOpen(false); if (onViewProjectsClick) onViewProjectsClick(); }}
            className="text-3xl font-light tracking-tight text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            03 / Showcase
          </button>
          <button 
            onClick={() => { setMenuOpen(false); if (onContactClick) onContactClick(); }}
            className="text-3xl font-light tracking-tight text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            04 / Contact
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#F5F5F7] pt-6">
          <span className="text-[10px] font-mono text-[#666666] tracking-wider">SWISS DESIGN SYSTEM V2.6</span>
          <span className="text-[10px] font-mono text-[#666666]">© 2026 Ashwin. All rights reserved.</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section id="hero" className="px-6 pt-28 pb-10 relative flex flex-col justify-between min-h-[92vh] z-10">
        
        {/* Organic Blob & Rotating Wireframe on Right Side */}
        <div className="absolute top-[160px] -right-10 w-[240px] h-[240px] rounded-[50%_50%_35%_65%_/_50%_35%_65%_50%] bg-gradient-to-tr from-[#4F7CFF]/15 to-[#80A0FF]/5 border border-[#4F7CFF]/12 flex items-center justify-center pointer-events-none z-0 animate-pulse-slow">
          {/* Detailed SVG wireframe object */}
          <div className="animate-spin-slow" style={{ animationDuration: '30s' }}>
            <svg className="w-18 h-18 text-[#4F7CFF]/85 drop-shadow-[0_4px_12px_rgba(79,124,255,0.15)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" />
              <polygon points="50,5 50,95" />
              <polygon points="10,30 90,30" />
              <polygon points="10,70 90,70" />
              <line x1="10" y1="30" x2="50" y2="95" />
              <line x1="90" y1="30" x2="50" y2="95" />
              <line x1="10" y1="70" x2="50" y2="5" />
              <line x1="90" y1="70" x2="50" y2="5" />
              <circle cx="50" cy="50" r="14" strokeWidth="0.8" strokeDasharray="3,3" />
            </svg>
          </div>
        </div>

        {/* Content Container (Left-aligned) */}
        <div className="flex-1 flex flex-col justify-center gap-10 relative z-10 pt-6">
          
          {/* Heading - Extremely Large Swiss Typography */}
          <h1 className="text-[40px] sm:text-[44px] font-black tracking-tight text-[#111111] leading-[0.98] uppercase">
            Create<br />
            <span className="font-light text-[#666666]">Digital</span><br />
            Products<br />
            <span className="font-light text-[#666666]">For The</span><br />
            <span className="text-[#4F7CFF] font-black">Future</span>
          </h1>

          {/* Description - Exactly 2 lines max */}
          <p className="text-[14px] leading-[1.5] text-[#666666] max-w-[280px]">
            Engineering high-performance systems at the intersection of artificial intelligence and Swiss layout design.
          </p>

          {/* Stacked CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            {/* Primary */}
            <button 
              onClick={onViewProjectsClick}
              className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-full shadow-md active:scale-98 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Secondary */}
            <button 
              className="w-full py-4 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#111111] border border-transparent text-xs font-semibold rounded-full active:scale-98 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section id="features-section" className="px-6 py-16 bg-white border-t border-[#F5F5F7] z-10 relative">
        <div className="flex flex-col gap-8">
          
          {/* Section title label */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#4F7CFF] uppercase font-bold">02 / CORE CAPABILITIES</span>
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Architectural Focus</h2>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {features.map((feat) => (
              <div 
                key={feat.id}
                className="bg-white border border-[#F5F5F7] rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:border-[#E5E5EA] transition-all duration-300 flex flex-col gap-3"
              >
                {/* Header info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#111111] tracking-tight">{feat.title}</h3>
                </div>
                
                {/* Description - Exactly one-line description */}
                <p className="text-xs text-[#666666] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTTOM SECTION: EXPLORE MY WORK */}
      <section className="px-6 py-12 bg-white flex flex-col items-center justify-center border-t border-[#F5F5F7] z-10 relative">
        
        {/* Large arrow transition link */}
        <button 
          onClick={onViewProjectsClick}
          className="flex flex-col items-center justify-center gap-4 group cursor-pointer bg-transparent border-none outline-none py-6"
        >
          {/* Arrow */}
          <div className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-[#4F7CFF] group-hover:bg-[#4F7CFF]/5 transform group-hover:translate-y-1 transition-all duration-300 shadow-sm">
            <ArrowDownRight className="w-6 h-6 text-[#111111] group-hover:text-[#4F7CFF]" />
          </div>

          {/* Label */}
          <span className="text-xs font-bold tracking-[0.2em] text-[#111111] uppercase group-hover:text-[#4F7CFF] transition-colors">
            Explore My Work
          </span>
        </button>
      </section>

    </div>
  );
}
