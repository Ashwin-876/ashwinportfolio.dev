import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Briefcase, 
  Cpu, 
  FolderGit2, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  Code,
  CheckCircle,
  Mail,
  Send,
  MessageSquare
} from 'lucide-react';

export default function MinimalistMobilePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Stats data
  const stats = [
    {
      id: 'projects',
      value: '10+',
      label: 'Projects',
      icon: <FolderGit2 className="w-5 h-5 text-[#4F7CFF]" />,
    },
    {
      id: 'experience',
      value: '3+',
      label: 'Years',
      icon: <Briefcase className="w-5 h-5 text-[#4F7CFF]" />,
    },
    {
      id: 'tech',
      value: '20+',
      label: 'Tech Stack',
      icon: <Cpu className="w-5 h-5 text-[#4F7CFF]" />,
    },
  ];

  // Minimal projects data
  const projects = [
    {
      title: "AI Power Line Detection",
      category: "Computer Vision",
      tags: ["Python", "OpenCV", "YOLOv8"],
      link: "#"
    },
    {
      title: "Neural Coding Assistant",
      category: "Generative AI",
      tags: ["Next.js", "Gemini API", "Tailwind"],
      link: "#"
    },
    {
      title: "FinTech SaaS Dashboard",
      category: "Full Stack",
      tags: ["React", "Node.js", "Chart.js"],
      link: "#"
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1200);
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-inter w-full min-h-full bg-white text-[#111111] relative overflow-y-auto flex flex-col select-none antialiased scroll-smooth hide-scrollbar pb-16">
      
      {/* 1. FLOATING NAVIGATION BAR */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 bg-white/75 backdrop-blur-md border border-[#F5F5F7]/80 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
        {/* Minimal Logo */}
        <button 
          onClick={() => scrollToSection('home')}
          className="text-xl font-bold tracking-tight text-[#111111] hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
        >
          A<span className="text-[#4F7CFF]">.</span>
        </button>

        {/* Circular Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F5F5F7] border border-transparent shadow-sm text-[#111111] hover:bg-[#E8E8ED] active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-24 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <div className="flex flex-col gap-6 text-left">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#666666] border-b border-[#F5F5F7] pb-2">Navigation</span>
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-medium text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('projects-section')}
            className="text-2xl font-medium text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('stats-section')}
            className="text-2xl font-medium text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Statistics
          </button>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="text-2xl font-medium text-left text-[#111111] hover:text-[#4F7CFF] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            Contact
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#F5F5F7] pt-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-[#666666] font-medium">Available for selective roles</span>
          </div>
          <span className="text-[10px] font-mono text-[#666666]">© 2026 Ashwin. All rights reserved.</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section id="home" className="px-6 pt-24 pb-8 relative flex flex-col justify-center min-h-[90vh]">
        {/* Soft Background Gradient Circle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#4F7CFF]/10 to-transparent rounded-full blur-[70px] pointer-events-none z-0" />
        
        <div className="flex flex-col gap-6 relative z-10 pt-4">
          {/* Badge */}
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-[#F5F5F7] border border-[#E5E5EA] rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-[#4F7CFF]" />
            <span className="text-[10px] font-semibold tracking-wide text-[#666666] uppercase">
              AI Engineer • Full Stack Developer
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[32px] font-bold tracking-tight text-[#111111] leading-[1.15]">
            Building Modern<br />
            <span className="bg-gradient-to-r from-[#4F7CFF] to-[#80A0FF] bg-clip-text text-transparent">
              Digital Experiences
            </span><br />
            That Inspire
          </h1>

          {/* Description - Max 3 lines */}
          <p className="text-[14px] leading-[1.5] text-[#666666] max-w-sm">
            I engineer high-performance systems and build premium 
            user interfaces, bridging the gap between intelligent AI 
            logic and pixel-perfect interactive web experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3.5 mt-2">
            <button 
              onClick={() => scrollToSection('projects-section')}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#4F7CFF] to-[#3B66F5] hover:opacity-95 text-white text-xs font-semibold rounded-full shadow-[0_4px_12px_rgba(79,124,255,0.2)] active:scale-98 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => scrollToSection('contact-section')}
              className="flex-1 py-3 px-4 bg-white border border-[#E5E5EA] text-[#111111] hover:bg-[#F5F5F7] text-xs font-semibold rounded-full active:scale-98 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="w-5 h-8 border border-[#E5E5EA] rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-[#4F7CFF] rounded-full animate-bounce" />
          </div>
          <span className="text-[8px] font-mono tracking-widest uppercase text-[#666666]">
            Scroll Down
          </span>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section id="stats-section" className="px-6 py-12 bg-white border-t border-[#F5F5F7]">
        <div className="grid grid-cols-3 gap-2.5 w-full">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white border border-[#F5F5F7] rounded-[20px] p-3.5 flex flex-col items-center text-center justify-center gap-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(79,124,255,0.04)] transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold tracking-tight text-[#111111]">
                  {stat.value}
                </span>
                <span className="text-[9px] font-medium tracking-wide uppercase text-[#666666] leading-none">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SELECTED PROJECTS */}
      <section id="projects-section" className="px-6 py-12 bg-[#F5F5F7] border-y border-[#E5E5EA]/50 rounded-[28px] mx-3 my-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Selected Projects</h2>
            <span className="text-[10px] font-mono tracking-wider text-[#666666] uppercase">01 / 03</span>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[20px] p-5 border border-[#E5E5EA]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#666666] uppercase">{proj.category}</span>
                    <h3 className="text-base font-bold text-[#111111] mt-0.5">{proj.title}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F7] group-hover:bg-[#4F7CFF] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono font-medium px-2 py-0.5 bg-[#F5F5F7] text-[#666666] rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact-section" className="px-6 py-12 bg-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">Get in Touch</h2>
            <p className="text-xs text-[#666666]">Let's collaborate on intelligent AI integrations and full stack experiences.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-3.5">
            <div>
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-[14px] text-xs focus:bg-white focus:border-[#4F7CFF] outline-none transition-all duration-200"
              />
            </div>
            
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-[14px] text-xs focus:bg-white focus:border-[#4F7CFF] outline-none transition-all duration-200"
              />
            </div>

            <div>
              <textarea 
                placeholder="Message" 
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-[14px] text-xs focus:bg-white focus:border-[#4F7CFF] outline-none transition-all duration-200 resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className={`w-full py-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-full shadow-sm hover:shadow active:scale-98 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
