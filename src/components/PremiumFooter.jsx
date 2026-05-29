import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaTwitter, 
  FaDribbble, 
  FaBehance, 
  FaTelegramPlane, 
  FaDiscord, 
  FaReddit, 
  FaWhatsapp, 
  FaPinterest 
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Ashwin-876' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/ashwinshaiju' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/ashwin_876_' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://x.com/ashwin_876' },
  { name: 'Dribbble', icon: FaDribbble, href: '#' },
  { name: 'Behance', icon: FaBehance, href: 'https://www.behance.net/ashwins55' },
  { name: 'Telegram', icon: FaTelegramPlane, href: 'https://t.me/ashwin_876' },
  { name: 'Discord', icon: FaDiscord, href: 'https://discord.com/users/ashwin_876' },
  { name: 'Reddit', icon: FaReddit, href: 'https://www.reddit.com/user/Icy_Writing_4874/' },
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/qr/RFSEXBRXXQOBF1' },
  { name: 'Gmail', icon: SiGmail, href: 'mailto:ashwinshaijus@gmail.com' },
  { name: 'Pinterest', icon: FaPinterest, href: 'https://in.pinterest.com/ashwinshaijuu/' },
];

export default function PremiumFooter() {
  const containerRef = useRef(null);
  const socialRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll reveal
    const elements = containerRef.current.querySelectorAll('.footer-reveal');
    const revealTween = gsap.fromTo(elements,
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Social icons staggered drop-in
    const socialTween = gsap.fromTo(socialRefs.current,
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Magnetic effect for social icons
    const cleanups = [];
    socialRefs.current.forEach((icon) => {
      if (!icon) return;
      const xTo = gsap.quickTo(icon, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(icon, "y", { duration: 0.4, ease: "power3.out" });

      const handleMouseMove = (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo(x * 0.4);
        yTo(y * 0.4);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      icon.addEventListener("mousemove", handleMouseMove);
      icon.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        icon.removeEventListener("mousemove", handleMouseMove);
        icon.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      revealTween.kill();
      if (revealTween.scrollTrigger) revealTween.scrollTrigger.kill();
      socialTween.kill();
      if (socialTween.scrollTrigger) socialTween.scrollTrigger.kill();
      cleanups.forEach(c => c());
    };
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full bg-[#fafafa] overflow-hidden pt-16 pb-8 z-20">
      
      {/* TOP GLOWING DIVIDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[2px]" />
        {/* Shimmer sweep on divider */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_3s_infinite]" />
      </div>

      {/* AMBIENT BACKGROUND EFFECTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-16 flex flex-col items-center justify-between min-h-[30vh] relative z-10">
        
        {/* TOP SECTION */}
        <div className="flex flex-col items-center text-center gap-8 mb-12">
          
          {/* Availability Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="footer-reveal inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-black/5 px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] hover:border-cyan-400/30 transition-all duration-500"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            </span>
            <span className="text-black/80 text-[11px] font-bold tracking-[0.25em] uppercase">
              Available for New Projects
            </span>
          </motion.div>

          {/* Luxury Statement */}
          <h2 className="footer-reveal text-black/90 text-xl md:text-2xl font-light tracking-tight max-w-2xl mt-2">
            Crafting immersive AI-powered <br className="hidden md:block"/> digital experiences.
          </h2>
        </div>

        {/* CENTER SECTION - BIG SOCIAL ICONS */}
        <div className="flex flex-nowrap justify-start lg:justify-center items-center gap-2.5 sm:gap-3.5 md:gap-4.5 lg:gap-5.5 mb-16 w-full max-w-6xl overflow-x-auto lg:overflow-x-visible hide-scrollbar px-6 py-2">
          {socials.map((social, i) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => socialRefs.current[i] = el}
              className="relative group p-2" // Padding increases magnetic hit area
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/50 backdrop-blur-2xl border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:bg-white/80 group-hover:border-cyan-400/30 group-hover:shadow-[0_30px_60px_rgba(34,211,238,0.2)] overflow-hidden">
                
                {/* Active Hover Glow Ripple */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:via-blue-400/10 group-hover:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <social.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-black/70 group-hover:text-black transition-colors duration-300 relative z-10" />
                
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] opacity-50 z-20 skew-x-[-20deg]" />
              </div>
              
              {/* Floating Label */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 pointer-events-none">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="footer-reveal w-full flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-black/[0.05]">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] overflow-hidden flex-shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-black tracking-[0.3em] text-sm md:text-base uppercase group-hover:text-blue-600 transition-colors duration-300">
              Ashwin S
            </span>
          </div>

          {/* Copyright & Text */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
            <span className="text-black/40 text-xs md:text-sm font-light tracking-wide">
              © {new Date().getFullYear()} Ashwin S. All rights reserved.
            </span>
            <span className="text-black/30 text-[10px] md:text-xs font-light tracking-[0.05em]">
              Designed & developed with futuristic AI aesthetics.
            </span>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}} />
    </footer>
  );
}
