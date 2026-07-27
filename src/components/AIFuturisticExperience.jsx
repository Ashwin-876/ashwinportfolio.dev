import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: 1,
    role: "Project Lead AI Engineer",
    company: "ICONIC HUB",
    period: "2026 — PRESENT",
    location: "Coimbatore, India • Remote",
    specialization: "AI AUTOMATION • EDUAI SYSTEMS • INTELLIGENT INTERFACES",
    impact: [
      "Led development of AI-powered smart learning systems",
      "Built intelligent workflow automation modules",
      "Managed frontend and backend architecture",
      "Designed scalable AI-integrated platforms"
    ],
    metrics: [
      { label: "AI Features", value: "15+" },
      { label: "Intelligent Modules", value: "5+" },
      { label: "System Performance", value: "98%" }
    ],
    color: "blue"
  },
  {
    id: 2,
    role: "AI Full Stack Developer",
    company: "Emedlogix Inc.",
    period: "2025",
    location: "Remote",
    specialization: "AI APPLICATIONS • FULL STACK SYSTEMS • SCALABLE ARCHITECTURES",
    impact: [
      "Developed AI-powered web applications",
      "Engineered intelligent analytics dashboards",
      "Built responsive frontend systems",
      "Enhanced platform scalability and automation"
    ],
    metrics: [
      { label: "Systems Built", value: "10+" },
      { label: "Features Integrated", value: "40+" },
      { label: "Client Satisfaction", value: "95%" }
    ],
    color: "blue"
  },
  {
    id: 3,
    role: "Digital Marketing Specialist",
    company: "SKILLMAVEN",
    period: "2025",
    location: "Remote",
    specialization: "DIGITAL STRATEGY • SEO • BRAND GROWTH",
    impact: [
      "Managed digital marketing campaigns and audience engagement",
      "Developed SEO strategies to improve online visibility",
      "Created social media branding and content marketing systems",
      "Analyzed campaign performance using modern analytics tools"
    ],
    metrics: [
      { label: "Marketing Campaigns", value: "20+" },
      { label: "SEO Strategies", value: "10+" },
      { label: "Engagement Rate", value: "92%" }
    ],
    color: "indigo"
  },
  {
    id: 4,
    role: "Web Development Engineer",
    company: "CODEALPHA",
    period: "2024",
    location: "Remote",
    specialization: "FRONTEND DEVELOPMENT • MODERN WEB SYSTEMS",
    impact: [
      "Developed responsive modern websites using React, HTML, CSS, and JavaScript",
      "Built reusable UI component systems with scalable architecture",
      "Designed interactive frontend experiences with smooth animations",
      "Optimized performance and responsive layouts across devices"
    ],
    metrics: [
      { label: "Web Projects", value: "10+" },
      { label: "UI Components", value: "5+" },
      { label: "Performance Score", value: "95%" }
    ],
    color: "blue"
  }
];

const TimelineParticleCanvas = () => {
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
        color: Math.random() > 0.4 ? 'rgba(59, 130, 246, 0.22)' : 'rgba(99, 102, 241, 0.18)',
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
      });
    }

    let isVisible = false;
    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
};

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.08)',
      borderColor: 'rgba(59, 130, 246, 0.25)'
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: x,
        top: y,
        opacity: 0.8,
        duration: 0.2
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
      borderColor: 'rgba(255, 255, 255, 0.8)'
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.5
      });
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row w-full items-start justify-between gap-6 lg:gap-12 relative z-10 exp-row group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
      {/* Year Pill & Company (Side Column) */}
      <div className={`w-full lg:w-[44%] flex flex-col ${isEven ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'} justify-start pt-6 lg:pt-14 hidden lg:flex opacity-0 exp-side`}>
        {/* Premium Year Pill Badge */}
        <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 bg-white/80 backdrop-blur-md border border-blue-100/80 px-4 py-1.5 rounded-full mb-3.5 shadow-[0_2px_8px_rgba(59,130,246,0.04)] hover:border-blue-200 transition-colors duration-300">
          {exp.period}
        </span>
        <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight font-sans leading-none">{exp.company}</h3>
        <p className="text-xs font-semibold text-neutral-400 mt-2 flex items-center gap-1">
          <MapPin size={12} className="text-neutral-300" />
          {exp.location}
        </p>
      </div>

      {/* Center Glassmorphic Node Wrapper */}
      <div className="absolute left-6 lg:left-1/2 top-[38px] lg:top-[110px] -translate-y-1/2 -translate-x-1/2 w-7 h-7 z-20 flex items-center justify-center pointer-events-none">
        {/* Outer glass circle (28px) */}
        <div className="exp-node w-full h-full rounded-full bg-white/45 backdrop-blur-[8px] border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.05),0_0_10px_rgba(59,130,246,0.05),inset_0_1px_1px_rgba(255,255,255,0.35)] flex items-center justify-center group-hover:border-blue-500/80 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-500 pointer-events-auto relative">
          {/* Pulsing ring background */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />
          
          {/* Inner soft glow */}
          <div className="absolute inset-0.5 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Small blue center dot */}
          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] z-10" />
        </div>
      </div>

      {/* Main Frosted Glass Card */}
      <div className={`w-[88%] ml-[12%] lg:ml-0 lg:w-[44%] lg:pt-[68px] perspective-1000 opacity-0 exp-card ${isEven ? 'origin-left' : 'origin-right'}`}>
        
        {/* Mobile Header (Only visible on Mobile/Tablet) */}
        <div className="flex flex-col lg:hidden mb-4 pl-1">
          <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 mb-1">{exp.period}</span>
          <h3 className="text-xl font-black text-neutral-900">{exp.company}</h3>
          <p className="text-[11px] font-medium text-neutral-400 flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="text-neutral-300" />
            {exp.location}
          </p>
        </div>

        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-white/50 backdrop-blur-xl border border-white/80 p-5 sm:p-7 rounded-[22px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] group-hover:border-blue-200/50 transition-all duration-500 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Radial Mouse Follow Glow */}
          <div 
            ref={glowRef}
            className="absolute w-56 h-56 bg-gradient-to-br from-blue-300/15 to-indigo-300/15 rounded-full blur-3xl opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 -z-10"
          />

          <div className="relative z-10 flex flex-col gap-4">
            
            {/* Title Block */}
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight leading-tight">{exp.role}</h4>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-blue-500 mt-2 leading-none">{exp.specialization}</p>
            </div>

            {/* Bullet Points */}
            <div className="flex flex-col gap-2.5 mt-1">
              {exp.impact.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-[13px] font-normal text-neutral-600 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-2.5 pt-4.5 border-t border-neutral-100/80 mt-2">
              {exp.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-sm sm:text-base font-black text-blue-600 tracking-tight leading-none">{metric.value}</span>
                  <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-extrabold font-mono mt-1 leading-none">{metric.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

const AIFuturisticExperience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rows = containerRef.current.querySelectorAll('.exp-row');
    const centralLine = containerRef.current.querySelector('.neural-line-fill');

    // Initial setup
    gsap.set(centralLine, { height: 0 });

    const triggers = [];

    const lineTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 25%",
      end: "bottom 70%",
      scrub: 1.2,
      animation: gsap.to(centralLine, {
        height: "100%",
        ease: "none"
      })
    });
    triggers.push(lineTrigger);

    // Reveal animations for each row (alternating side entry on desktop, purely vertical on mobile)
    rows.forEach((row, i) => {
      const card = row.querySelector('.exp-card');
      const side = row.querySelector('.exp-side');
      const node = row.querySelector('.exp-node');

      const isEven = i % 2 === 0;
      const isMobileLayout = window.innerWidth < 1024;

      // Cards slide in from alternating sides
      gsap.set(card, { 
        x: isMobileLayout ? 0 : (isEven ? 40 : -40), 
        opacity: 0,
        y: 20
      });
      
      // Side elements slide from opposite side
      gsap.set(side, { 
        x: isMobileLayout ? 0 : (isEven ? -30 : 30), 
        opacity: 0,
        y: 10
      });

      gsap.set(node, { scale: 0, opacity: 0 });

      const trigger = ScrollTrigger.create({
        trigger: row,
        start: "top 82%",
        animation: gsap.timeline()
          .to(node, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" })
          .to(card, { x: 0, y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.25")
          .to(side, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5")
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => {
        t.kill();
        if (t.animation) t.animation.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-12">
      
      {/* Background decorations matching description */}
      <div className="absolute top-[10%] left-[20%] w-[380px] h-[380px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-indigo-400/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      
      {/* Very soft grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 opacity-70" />
      
      {/* Micro-noise texture */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none -z-10 will-change-transform" style={{ transform: 'translate3d(0,0,0)', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Canvas Particle Loop */}
      <TimelineParticleCanvas />

      {/* Inner relative container for line and cards stream to guarantee sub-pixel alignment */}
      <div className="relative w-full px-6 sm:px-8">
        {/* Central Neural Progress Line */}
        <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-[1px] bg-neutral-200 -translate-x-1/2 rounded-full overflow-hidden">
          <div className="neural-line-fill w-full bg-blue-500/60" />
        </div>

        {/* Cards Stream */}
        <div className="flex flex-col gap-12 lg:gap-18 relative z-10">
          {experienceData.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AIFuturisticExperience;
