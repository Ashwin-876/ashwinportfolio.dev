import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import completeSfx from '../assets/audio/complete.wav';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail, label: "Email", value: "ashwinshaijus@gmail.com", href: "mailto:ashwinshaijus@gmail.com" },
  { icon: FaLinkedin, label: "LinkedIn", value: "linkedin.com/in/ashwinshaiju", href: "https://linkedin.com/in/ashwinshaiju" },
  { icon: FaGithub, label: "GitHub", value: "github.com/Ashwin-876", href: "https://github.com/Ashwin-876" },
  { icon: FaInstagram, label: "Instagram", value: "instagram.com/ashwin_876_", href: "https://instagram.com/ashwin_876_" },
  { icon: MapPin, label: "Location", value: "Chennai, India", href: null },
];

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.25)' : 'rgba(139, 92, 246, 0.25)', // Cyan or violet
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
      });
    }

    let isVisible = false;
    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Softer concentric outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.25', '0.08');
        ctx.fill();

        // Inner solid particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animationId) {
          draw();
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    }, { threshold: 0.01 });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
    />
  );
};

// Premium Futuristic Success Popup Component
const SuccessPopup = ({ onClose, audioSrc }) => {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  useEffect(() => {
    // Play complete chime sound effect
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.volume = 0.4;
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
    }

    // Particle burst effect inside the popup card boundaries
    const canvas = particlesCanvasRef.current;
    let animationId;
    let burstParticles = [];
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const handleCanvasResize = () => {
        if (canvas && canvas.parentElement) {
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
        }
      };
      
      handleCanvasResize();

      // Spawn burst particles centered around the success icon area
      const spawnX = canvas.width / 2;
      const spawnY = 88; // Approximate Y coordinate of success icon
      
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 0.8;
        burstParticles.push({
          x: spawnX,
          y: spawnY,
          radius: Math.random() * 2 + 0.6,
          color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.85)' : 'rgba(139, 92, 246, 0.85)',
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5, // slightly drifting upwards
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012
        });
      }

      const drawBurst = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render and update each particle
        burstParticles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            burstParticles.splice(idx, 1);
            return;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          
          // Modify opacity
          const baseColor = p.color.substring(0, p.color.lastIndexOf(',') + 1);
          ctx.fillStyle = `${baseColor} ${p.alpha.toFixed(2)})`;
          
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        animationId = requestAnimationFrame(drawBurst);
      };
      
      drawBurst();
    }

    // GSAP Cinematic Entrance Animations
    const timeline = gsap.timeline();
    
    // Dim and blur background overlay
    timeline.fromTo(overlayRef.current,
      { backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" },
      { backdropFilter: "blur(14px)", backgroundColor: "rgba(0, 0, 0, 0.65)", duration: 0.65, ease: "power3.out" }
    );

    // Bounce and scale popup card
    timeline.fromTo(cardRef.current,
      { scale: 0.8, opacity: 0, y: 35 },
      { scale: 1, opacity: 1, y: 0, duration: 0.75, ease: "back.out(1.5)" },
      "-=0.45"
    );

    // Rotate success checkmark icon
    timeline.fromTo(iconRef.current,
      { rotate: -210, scale: 0, opacity: 0 },
      { rotate: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.6)" },
      "-=0.45"
    );

    const handleExit = () => {
      const exitTimeline = gsap.timeline({
        onComplete: onClose
      });
      
      exitTimeline.to(cardRef.current, {
        scale: 0.82,
        opacity: 0,
        y: 25,
        duration: 0.5,
        ease: "power3.inOut"
      });

      exitTimeline.to(overlayRef.current, {
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");
    };

    // Auto dismiss after 3.8s
    const dismissTimer = setTimeout(handleExit, 3800);

    // Save close function ref on element so it can be called on manual button clicks
    overlayRef.current.closePopup = handleExit;

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(dismissTimer);
    };
  }, [audioSrc, onClose]);

  return (
    <div 
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) overlayRef.current.closePopup();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto"
    >
      <div 
        ref={cardRef}
        className="relative w-full max-w-[400px] bg-[#09090e] border border-cyan-500/20 rounded-[24px] p-8 text-center shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden"
      >
        {/* Cinematic glow overlays inside popup */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-cyan-500/10 rounded-full blur-[45px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-violet-500/10 rounded-full blur-[45px] pointer-events-none" />
        
        {/* Internal burst canvas particles */}
        <canvas ref={particlesCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Glowing Checkmark Box */}
          <div 
            ref={iconRef}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/15 to-violet-500/15 border border-cyan-400/35 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-5 relative"
          >
            {/* Pulsing ring inside icon */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-[6px] animate-pulse" />
            <svg 
              className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h4 className="text-lg font-bold tracking-tight text-white mb-2 font-sans">
            Message Sent Successfully
          </h4>
          <p className="text-xs sm:text-[13px] font-light text-neutral-400 max-w-[270px] leading-relaxed mb-6 font-sans">
            Thanks for reaching out. I’ll respond within 24 hours.
          </p>

          {/* Visual Progress Timer Bar */}
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-cyan-400 to-violet-500 animate-[progress-countdown_3.5s_linear_forwards]" />
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress-countdown {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}} />
    </div>
  );
};

export default function ContactForm() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobileViewport = window.innerWidth < 768;

    // Scroll reveal for the whole container
    const revealTween = gsap.fromTo(containerRef.current, 
      { opacity: 0, y: isMobileViewport ? 35 : 100 },
      {
        opacity: 1, 
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Staggered reveal for contact cards
    const cards = containerRef.current.querySelectorAll('.contact-card');
    const staggerTween = gsap.fromTo(cards,
      { opacity: 0, x: isMobileViewport ? 0 : -50, y: isMobileViewport ? 30 : 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Floating idle animation for cards
    const floatTweens = [];
    cards.forEach((card, i) => {
      const t = gsap.to(card, {
        y: -5,
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.2
      });
      floatTweens.push(t);
    });

    return () => {
      revealTween.kill();
      if (revealTween.scrollTrigger) revealTween.scrollTrigger.kill();
      staggerTween.kill();
      if (staggerTween.scrollTrigger) staggerTween.scrollTrigger.kill();
      floatTweens.forEach(t => t.kill());
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_28bs9us',
      'template_wtrgyam',
      formRef.current,
      'MDJ4RATeoTsWfv5NA'
    )
    .then(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      if (formRef.current) formRef.current.reset();
    })
    .catch((error) => {
      console.error('EmailJS submission failed:', error);
      setIsSubmitting(false);
      alert('Could not deliver message securely. Please try again or email directly.');
    });
  };

  return (
    <section className="relative w-full bg-black py-16 z-10 overflow-hidden" id="contact-form">
      {/* Cinematic noise texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none z-10" />
      
      {/* Premium subtle grid texture */}
      <div className="absolute inset-0 dark-grid-bg pointer-events-none z-0" />

      {/* Floating particles */}
      <ParticleCanvas />

      {/* Ambient background visuals */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[110px] mix-blend-screen pointer-events-none animate-float-blob" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[130px] mix-blend-screen pointer-events-none animate-float-blob-reverse" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[90px] mix-blend-screen pointer-events-none animate-float-blob" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Contact Cards & Info */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full w-fit animate-float-badge shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                Available for Freelance & AI Projects
              </span>
            </div>
            <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight mt-1">
              Let's start a <br/>
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">conversation.</span>
            </h3>
            <p className="text-neutral-400 font-light text-xs max-w-xs leading-relaxed">
              Drop me a message below or reach out through my social profiles. Typically responds within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 relative">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target={link.href ? "_blank" : undefined}
                rel={link.href ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02, x: 10 }}
                className={`contact-card relative flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all duration-300 group ${!link.href && 'cursor-default'}`}
              >
                {/* Glowing Outline Hover Effect */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-[1px] -z-10 pointer-events-none" />

                <div className="w-9.5 h-9.5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
                  <link.icon className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 group-hover:text-cyan-400 font-bold transition-colors">{link.label}</span>
                  {link.value && (
                    <span className="text-xs text-neutral-400 mt-0.5 group-hover:text-neutral-200 transition-colors font-mono">{link.value}</span>
                  )}
                </div>
              </motion.a>
            ))}
            
            {/* Holographic Orb behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-[55px] -z-10 mix-blend-screen" />
          </div>

          {/* AI Info Status Footer */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest pl-2">
            <span>Status: ONLINE</span>
            <span>•</span>
            <span>SECURE GATEWAY</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Premium Glassmorphism Form */}
        <div className="lg:col-span-7 w-full relative">
          
          {/* Neon Border Glow Backing */}
          <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-40 pointer-events-none" />
          
          <div className="relative w-full bg-[#070709] border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Internal reflections & ambient lights */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none animate-pulse-slow" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4.5 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 group">
                  <label htmlFor="from_name" className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold ml-0.5 group-focus-within:text-cyan-400 transition-colors">Full Name</label>
                  <input 
                    id="from_name"
                    type="text" 
                    name="from_name"
                    required 
                    placeholder="John Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-xs placeholder-neutral-500 outline-none focus:border-cyan-400 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5 group">
                  <label htmlFor="from_email" className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold ml-0.5 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
                  <input 
                    id="from_email"
                    type="email" 
                    name="from_email"
                    required 
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-xs placeholder-neutral-500 outline-none focus:border-cyan-400 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 group">
                <label htmlFor="project_type" className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold ml-0.5 group-focus-within:text-cyan-400 transition-colors">Project Type</label>
                <div className="relative">
                  <select 
                    id="project_type"
                    required
                    name="project_type"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-xs outline-none focus:border-cyan-400 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 appearance-none cursor-pointer font-mono"
                  >
                    <option value="" className="bg-[#070709] text-neutral-400">Select type...</option>
                    <option value="Web Development" className="bg-[#070709] text-white">Web Development</option>
                    <option value="AI Integration" className="bg-[#070709] text-white">AI Integration / Dashboard</option>
                    <option value="UI/UX Design" className="bg-[#070709] text-white">UI/UX Design</option>
                    <option value="Other" className="bg-[#070709] text-white">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 group">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold ml-0.5 group-focus-within:text-cyan-400 transition-colors">Message</label>
                <textarea 
                  id="message"
                  rows="4"
                  required 
                  name="message"
                  placeholder="Tell me about your vision, timeline, and goals..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-xs placeholder-neutral-500 outline-none focus:border-cyan-400 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 resize-none font-mono"
                />
              </div>

              <div className="mt-3"> 
                <button 
                  type="submit"
                  disabled={isSubmitting || showPopup}
                  className={`relative w-full md:w-auto px-10 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center gap-2.5 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 group disabled:opacity-75 disabled:cursor-not-allowed ${isSubmitting ? 'animate-pulse shadow-[0_0_35px_rgba(6,182,212,0.85)]' : ''}`}
                >
                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  
                  {/* Spinner circle loader */}
                  {isSubmitting && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}

                  <span className="relative z-10 text-white font-bold tracking-[0.2em] text-xs uppercase drop-shadow-md">
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </span>
                  
                  {!isSubmitting && (
                    <Send className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300 drop-shadow-md" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Render success popup portal when showPopup state is true */}
      {showPopup && (
        <SuccessPopup 
          audioSrc={completeSfx} 
          onClose={() => setShowPopup(false)} 
        />
      )}

    </section>
  );
}
