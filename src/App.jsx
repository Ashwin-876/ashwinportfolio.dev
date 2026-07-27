import { useEffect, useRef, useState } from 'react';
import PremiumHero from './components/PremiumHero';
import PillNav from './components/PillNav';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import CircularGallery from './components/CircularGallery';
import CountUpStat from './components/CountUpStat';
import Shuffle from './components/Shuffle';
import Folder from './components/Folder';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import Lenis from 'lenis';
import TechStack from './components/TechStack';
import ContactCTA from './components/ContactCTA';
import ContactForm from './components/ContactForm';
import PremiumFooter from './components/PremiumFooter';
import AIProfileCard from './components/AIProfileCard';
import AIFuturisticExperience from './components/AIFuturisticExperience';
import SplitLoadingScreen from './components/SplitLoadingScreen';
import MinimalistMobilePortfolio from './components/MinimalistMobilePortfolio';
import EditorialMobilePortfolio from './components/EditorialMobilePortfolio';
import StorytellingPortfolio from './components/StorytellingPortfolio';
import AshwinMobilePortfolio from './components/AshwinMobilePortfolio';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

// Import local premium AI Developer WebGL showcase images
import aiNetworkImg from './assets/ai_network.webp';
import aiDashboardImg from './assets/ai_dashboard.webp';
import aiBrainImg from './assets/ai_brain.webp';
import aiGlobeImg from './assets/ai_globe.webp';
import aiCyberImg from './assets/ai_cyber.webp';
import aiFlowImg from './assets/ai_flow.webp';

// Silicon Valley Client Testimonials List
const testimonialsData = [
  {
    name: "Daniel Carter",
    role: "Founder, NovaLabs AI",
    text: "Ashwin's mastery of GSAP animations and Next.js is unparalleled. He transformed our complex landing page into a fluid, Awwwards-level interactive experience that loads instantly. Outstanding craftsmanship.",
    initial: "D",
    color: "from-blue-600 to-indigo-600"
  },
  {
    name: "Sophia Reynolds",
    role: "CEO, Visionary Studio",
    text: "Exceptional visual design coupled with high-performance React code. The attention to detail in the micro-interactions, smooth scrolling, and custom page transitions completely redefined our digital brand.",
    initial: "S",
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "Marcus Lee",
    role: "Product Lead, HyperScale",
    text: "We hired Ashwin to architect our advanced SaaS dashboard. He delivered a pixel-perfect, highly responsive interface with clean code, secure authentication, and seamless real-time AI dashboards.",
    initial: "M",
    color: "from-blue-500 to-teal-500"
  },
  {
    name: "Emily Watson",
    role: "Founder, PixelForge",
    text: "The motion design and parallax scroll effects created by Ashwin are breathtaking. He has a rare ability to bridge the gap between creative visual artistry and fast, production-ready frontend code.",
    initial: "E",
    color: "from-indigo-500 to-purple-600"
  },
  {
    name: "Ryan Mitchell",
    role: "CTO, QuantumByte",
    text: "Working with Ashwin was an absolute pleasure. His deep expertise in Tailwind CSS, GSAP, and full-stack performance optimization helped us achieve a perfect 100 PageSpeed score for our platform.",
    initial: "R",
    color: "from-cyan-600 to-indigo-500"
  },
  {
    name: "Olivia Brown",
    role: "Creative Director, ElevateX",
    text: "Ashwin is a true creative technologist. He engineered an incredibly engaging AI computer vision dashboard for our team that surpassed all our UX and engineering requirements. Highly recommended.",
    initial: "O",
    color: "from-indigo-600 to-blue-500"
  }
];

// Silicon Valley WebGL Gallery Items List
const galleryItems = [
  { image: aiNetworkImg, text: 'Neural Synapse Core' },
  { image: aiDashboardImg, text: 'ML Coding Interface' },
  { image: aiBrainImg, text: 'Cognitive Cybernetic Brain' },
  { image: aiGlobeImg, text: 'Global Data Cyberspace' },
  { image: aiCyberImg, text: 'Cyber Command Room' },
  { image: aiFlowImg, text: 'Algorithmic Flow Grid' }
];

// Register GSAP ScrollTrigger & Observer
gsap.registerPlugin(ScrollTrigger, Observer);

// Custom Interactive Canvas Floating Particles Component
function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    const properties = {
      bgColor: 'transparent',
      particleColor: 'rgba(59, 130, 246, 0.12)', // Soft blue transparent nodes
      particleRadius: 2.2,
      particleCount: 75,
      maxVelocity: 0.6,
      lineLength: 140,
    };

    const handleResize = () => {
      if (canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
        this.velocityY = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
      }

      position() {
        if (this.x + this.velocityX > w || this.x + this.velocityX < 0) {
          this.velocityX = -this.velocityX;
        }
        if (this.y + this.velocityY > h || this.y + this.velocityY < 0) {
          this.velocityY = -this.velocityY;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - (length / properties.lineLength);
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.08})`; // Soft network lines
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    let animationFrameId;
    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (let i in particles) {
        particles[i].position();
        particles[i].draw();
      }
      drawLines();
      animationFrameId = requestAnimationFrame(loop);
    }

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-screen h-screen pointer-events-none z-0" />;
}

// Exactly 6 Premium Services Data
const servicesData = [
  { 
    id: "01", 
    name: "Web Development", 
    desc: "Building ultra-fast responsive websites using Next.js, React, GSAP, Tailwind CSS, and scalable frontend architectures optimized for performance and modern user experience.",
    tech: ["Next.js", "React", "GSAP", "Tailwind CSS", "Performance"],
    bgClass: "bg-blue-600 group-hover:bg-blue-500",
    shadowClass: "shadow-[0_20px_50px_rgba(37,99,235,0.15)] group-hover:shadow-[0_32px_100px_rgba(37,99,235,0.3)] border-blue-400/30 group-hover:border-blue-300/50",
    textClass: "text-white",
    descClass: "text-blue-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "02", 
    name: "App Development", 
    desc: "Designing cross-platform mobile applications with Flutter and React Native integrated with cloud databases, authentication systems, and AI-powered features.",
    tech: ["Flutter", "React Native", "Cloud Databases", "Auth", "AI Features"],
    bgClass: "bg-emerald-600 group-hover:bg-emerald-500",
    shadowClass: "shadow-[0_20px_50px_rgba(5,150,105,0.15)] group-hover:shadow-[0_32px_100px_rgba(5,150,105,0.3)] border-emerald-400/30 group-hover:border-emerald-300/50",
    textClass: "text-white",
    descClass: "text-emerald-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "03", 
    name: "UI/UX Design", 
    desc: "Crafting premium Apple-inspired interfaces with minimal layouts, smooth interactions, advanced prototyping, and pixel-perfect design systems.",
    tech: ["Apple-Inspired", "Minimal Layouts", "Prototyping", "Design Systems"],
    bgClass: "bg-purple-600 group-hover:bg-purple-500",
    shadowClass: "shadow-[0_20px_50px_rgba(147,51,234,0.15)] group-hover:shadow-[0_32px_100px_rgba(147,51,234,0.3)] border-purple-400/30 group-hover:border-purple-300/50",
    textClass: "text-white",
    descClass: "text-purple-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "04", 
    name: "AI Solutions", 
    desc: "Developing intelligent AI systems including chatbots, computer vision, recommendation engines, automation tools, and generative AI integrations.",
    tech: ["Chatbots", "Computer Vision", "Automation", "Generative AI"],
    bgClass: "bg-amber-600 group-hover:bg-amber-500",
    shadowClass: "shadow-[0_20px_50px_rgba(217,119,6,0.15)] group-hover:shadow-[0_32px_100px_rgba(217,119,6,0.3)] border-amber-400/30 group-hover:border-amber-300/50",
    textClass: "text-white",
    descClass: "text-amber-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "05", 
    name: "SaaS Development", 
    desc: "Building scalable SaaS platforms with dashboards, authentication, subscriptions, payment gateways, analytics, and secure backend infrastructures.",
    tech: ["Dashboards", "Auth", "Subscriptions", "Payment", "Analytics"],
    bgClass: "bg-rose-600 group-hover:bg-rose-500",
    shadowClass: "shadow-[0_20px_50px_rgba(225,29,72,0.15)] group-hover:shadow-[0_32px_100px_rgba(225,29,72,0.3)] border-rose-400/30 group-hover:border-rose-300/50",
    textClass: "text-white",
    descClass: "text-rose-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  },
  { 
    id: "06", 
    name: "Motion Design", 
    desc: "Creating cinematic web experiences using GSAP, Framer Motion, Lenis smooth scrolling, split text animations, parallax effects, and immersive transitions.",
    tech: ["GSAP", "Framer Motion", "Lenis", "Parallax", "Transitions"],
    bgClass: "bg-indigo-600 group-hover:bg-indigo-500",
    shadowClass: "shadow-[0_20px_50px_rgba(79,70,229,0.15)] group-hover:shadow-[0_32px_100px_rgba(79,70,229,0.3)] border-indigo-400/30 group-hover:border-indigo-300/50",
    textClass: "text-white",
    descClass: "text-indigo-50",
    tagClass: "bg-white/10 border-white/20 text-white group-hover:bg-white/20",
    glowClass: "bg-white/10"
  }
];

// Custom Premium Service Card Component with magnetic mouse effects
function ServiceCard({ srv, isGrid }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Use quickTo for massive performance boost on mouse move tracking
  // This prevents creating hundreds of new tweens per second, which causes GC micro-stutter
  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotXTo = useRef(null);
  const rotYTo = useRef(null);
  const glowXTo = useRef(null);
  const glowYTo = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Set initial perspective so quickTo can animate 3D transforms properly
    gsap.set(cardRef.current, { transformPerspective: 1000 });
    
    // Initialize high-performance GSAP setters
    xTo.current = gsap.quickTo(cardRef.current, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(cardRef.current, "y", { duration: 0.4, ease: "power3.out" });
    rotXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.4, ease: "power3.out" });
    rotYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.4, ease: "power3.out" });
    
    if (glowRef.current) {
      glowXTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.2, ease: "power2.out" });
      glowYTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.2, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e) => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !xTo.current) return;
    
    // Calculate position relative to the static wrapper
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pipe values directly into the high-performance setters
    xTo.current(x * 0.15);
    yTo.current(y * 0.15);
    rotXTo.current(-y * 0.05);
    rotYTo.current(x * 0.05);

    if (glowRef.current && glowXTo.current) {
      glowXTo.current(e.clientX - rect.left);
      glowYTo.current(e.clientY - rect.top);
      // Ensure glow is visible
      gsap.to(glowRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
    }
  };

  const handleMouseLeave = () => {
    if (!xTo.current) return;

    // Reset card translation and rotation smoothly using the same cached tweens
    xTo.current(0);
    yTo.current(0);
    rotXTo.current(0);
    rotYTo.current(0);

    // Hide glow spotlight smoothly
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
    }
  };

  // Safe fallback for transition so we don't accidentally transition transforms
  const safeTransitionStyle = { transition: "border-color 0.5s ease-out, box-shadow 0.5s ease-out" };

  if (isGrid) {
    return (
      <div 
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full group"
      >
      <div 
        ref={cardRef}
        style={safeTransitionStyle}
        className={`grid-service-card relative p-8 md:p-10 border rounded-[32px] ${srv.bgClass} flex flex-col justify-between gap-6 ${srv.shadowClass} cursor-default overflow-hidden select-none h-full min-h-[420px] w-full transition-all duration-500`}
      >
        {/* Dynamic Cursor-Tracking Glow Spotlight (Inside the Card) */}
        <div 
          ref={glowRef}
          className={`absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 ${srv.glowClass} rounded-full blur-[60px] pointer-events-none opacity-0 left-0 top-0`}
        />
        
        {/* Subtle Static Ambient Glow Blob (Under the Card/Behind Card) */}
        <div className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full ${srv.glowClass} blur-[40px] group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

        <div className="flex flex-col gap-4 relative z-10">
          <span className={`${srv.descClass} opacity-80 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300`}>
            {srv.id} / SERVICE CARD
          </span>
          <h3 className={`${srv.textClass} text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300`}>
            {srv.name}
          </h3>
          <p className={`${srv.descClass} font-light text-sm sm:text-base leading-relaxed mt-2`}>
            {srv.desc}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {srv.tech.map((t) => (
            <span key={t} className={`border text-[10px] px-3 py-1.5 rounded-full font-mono uppercase tracking-wider ${srv.tagClass} transition-colors duration-300`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      </div>
    );
  }

  return (
    <div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[95vw] lg:max-w-[1400px] group min-h-[500px] md:min-h-[600px] mx-auto"
    >
      <div 
        ref={cardRef}
        style={safeTransitionStyle}
        className={`relative w-full h-full p-12 md:p-20 border rounded-[40px] ${srv.bgClass} flex flex-col md:flex-row md:items-center justify-between gap-12 md:gap-20 ${srv.shadowClass} cursor-default overflow-hidden select-none transition-all duration-500`}
      >
        {/* Dynamic Cursor-Tracking Glow Spotlight (Inside the Card) */}
        <div 
          ref={glowRef}
          className={`absolute w-[36rem] h-[36rem] -translate-x-1/2 -translate-y-1/2 ${srv.glowClass} rounded-full blur-[90px] pointer-events-none opacity-0 left-0 top-0`}
        />
        
        {/* Subtle Static Ambient Glow Blob (Under the Card/Behind Card) */}
        <div className={`absolute -right-36 -bottom-36 w-80 h-80 rounded-full ${srv.glowClass} blur-[60px] group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

        <div className="flex flex-col gap-6 max-w-lg relative z-10 w-full">
          <span className={`${srv.descClass} opacity-80 font-mono text-xs md:text-sm font-bold tracking-[0.25em] uppercase transition-colors duration-300`}>
            {srv.id} / SERVICE CARD
          </span>
          <h3 className={`${srv.textClass} text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-300`}>
            {srv.name}
          </h3>
        </div>
        
        <div className="flex flex-col gap-8 max-w-md md:items-end md:text-right relative z-10 w-full">
          <p className={`${srv.descClass} font-light text-base md:text-lg leading-relaxed`}>
            {srv.desc}
          </p>
          <div className="flex flex-wrap gap-2.5 md:justify-end">
            {srv.tech.map((t) => (
              <span key={t} className={`border text-[10px] md:text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-wider ${srv.tagClass} transition-colors duration-300`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('#home');
  const [previewMode, setPreviewMode] = useState('immersive'); // 'immersive', 'minimal-stats', 'editorial-swiss', 'storytelling-plane', 'ashwin-portrait'
  const [phoneFrameColor, setPhoneFrameColor] = useState('dark'); // 'dark' or 'light'
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Force scroll restoration to manual and scroll to the top of the page on refresh/load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // Reset location hash to home if present
    if (window.location.hash && window.location.hash !== '#home') {
      window.location.hash = '#home';
    }
  }, []);

  const pillNavItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICES', href: '#services' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'HIRE ME', href: '#hire', highlight: true } // highlight prop is custom to add the blue dot
  ];

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const [loading, setLoading] = useState(true);
  const [servicesViewMode, setServicesViewMode] = useState('stack');
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Active Section Scroll Tracking using IntersectionObserver (highly robust & immune to CSS transforms/pinning)
  useEffect(() => {
    if (loading) return;

    const sections = ['#home', '#about', '#experience', '#projects', '#services', '#testimonials', '#contact'];
    const sectionVisibility = {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        // Calculate the actual visible height of this section within the viewport
        sectionVisibility[id] = entry.intersectionRatio * entry.boundingClientRect.height;
      });

      // Select the section with the largest visible footprint on screen
      let maxVisibleHeight = -1;
      let activeId = '#home';

      sections.forEach((id) => {
        const visibleHeight = sectionVisibility[id] || 0;
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          activeId = id;
        }
      });

      if (maxVisibleHeight > 0) {
        // Map the experience timeline sub-section back to the parent 'ABOUT' link
        if (activeId === '#experience') {
          setActiveSection('#about');
        } else {
          setActiveSection(activeId);
        }
      }
    }, {
      root: null,
      rootMargin: '-10% 0px -20% 0px', // Focus region in the middle 70% of the screen
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    });

    sections.forEach((id) => {
      const el = document.querySelector(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  // Lenis Smooth Scroll Setup (disabled for mobile and 3D Mode to prevent scroll lag and layout stutter)
  useEffect(() => {
    if (previewMode !== 'immersive') return;

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1.1
    });

    window.lenis = lenis;

    // Synchronize Lenis scroll updates with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis frame updates via GSAP's ticker to keep pinning and smooth-scrolling in perfect synchronization
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.lenis = null;
    };
  }, [previewMode]);

  // Intercept all local hash links and scroll smoothly using Lenis (or browser fallback)
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (window.lenis) {
            window.lenis.scrollTo(targetEl, {
              offset: 0,
              duration: 1.2,
              ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
          
          setActiveSection(href);
          window.history.pushState(null, null, href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);


  // Horizontal Scroll Setup (exactly 10 projects track on both desktop and mobile)
  useEffect(() => {
    if (loading) return;

    const sections = horizontalRef.current;
    if (!sections) return;

    const totalSnaps = isDesktop ? 10 : 9;

    // Create a single GSAP timeline driven by ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 3,
        snap: {
          snapTo: 1 / totalSnaps,
          duration: { min: 0.2, max: 0.8 },
          delay: 0.02,
          ease: "power2.out"
        },
        start: "top top",
        end: () => `+=${sections.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.round(progress * totalSnaps);
          setCurrentProjectIndex(activeIndex);
        }
      }
    });

    // 1. Translate the horizontal track container (duration: 1)
    tl.to(sections, {
      x: () => -(sections.scrollWidth - window.innerWidth),
      ease: "none",
      duration: 1
    }, 0);

    // 2. Add all card scale, fade, and parallax transitions directly to this single timeline
    const cards = sections.querySelectorAll('.project-card');
    
    cards.forEach((card, idx) => {
      const centerP = idx / totalSnaps;
      
      // Calculate start and end offsets relative to when the card is centered
      const entryStart = Math.max(0, centerP - 0.08);
      const exitEnd = Math.min(1, centerP + 0.08);

      // Card scale & fade entry (duration runs from entryStart to centerP)
      tl.fromTo(card,
        { scale: 0.94, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: centerP - entryStart },
        entryStart
      );

      // Card scale & fade exit (duration runs from centerP to exitEnd)
      tl.to(card,
        { scale: 0.94, opacity: 0.8, ease: "power2.inOut", duration: exitEnd - centerP },
        centerP
      );

      // Parallax effect on inner container
      const inner = card.querySelector('.project-parallax-inner');
      if (inner) {
        const parallaxStart = Math.max(0, centerP - 0.15);
        const parallaxEnd = Math.min(1, centerP + 0.15);
        tl.fromTo(inner,
          { x: 35 },
          { x: -35, ease: "none", duration: parallaxEnd - parallaxStart },
          parallaxStart
        );
      }
    });

    // Touch Observer for mobile swipe support
    let obs;
    if (!isDesktop) {
      obs = Observer.create({
        target: triggerRef.current,
        type: "touch,pointer",
        onChangeX: (self) => {
          // Translate horizontal swipes to vertical scroll adjustments
          const scrollAmount = -self.deltaX * 1.6;
          window.scrollBy({
            top: scrollAmount,
            behavior: 'auto'
          });
        }
      });
    }

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      if (obs) obs.kill();
    };
  }, [loading, isDesktop]);

  // Scroll Progress and Reveal Timelines
  useEffect(() => {
    if (loading) return;

    const progressTween = gsap.to(scrollIndicatorRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    const revealTweens = [];
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
      const tween = gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      revealTweens.push(tween);
    });

    return () => {
      progressTween.kill();
      if (progressTween.scrollTrigger) progressTween.scrollTrigger.kill();
      revealTweens.forEach(t => {
        t.kill();
        if (t.scrollTrigger) t.scrollTrigger.kill();
      });
    };
  }, [loading]);

  // Recalculate ScrollTrigger markers on view mode toggle
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [servicesViewMode]);

  // GSAP stagger reveal for grid view service cards
  useEffect(() => {
    if (loading || servicesViewMode !== 'grid') return;

    const cards = document.querySelectorAll('.grid-service-card');
    if (!cards.length) return;

    const tween = gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#services-grid-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [loading, servicesViewMode]);

  // GSAP stagger reveal for testimonial reviews cards
  useEffect(() => {
    if (loading) return;

    const cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const tween = gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.9, 
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#testimonials-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [loading]);



  // Exactly 10 Sample Projects Data
  const projectsData = [
    {
      num: "01",
      title: "AI Power Line Detection System",
      desc: "Advanced AI-powered infrastructure monitoring platform that detects vegetation growth, damaged electrical components, and dangerous obstacles near power transmission lines using CNN models, OpenCV image processing, and real-time analytics dashboards for smart grid maintenance and safety management.",
      tech: ["Python", "TensorFlow", "OpenCV", "React", "Firebase", "Node.js"],
      color: "from-blue-400 to-indigo-500",
      status: "Completed Successfully",
      performance: ["98% Detection Accuracy", "40% Faster Monitoring"]
    },
    {
      num: "02",
      title: "FreshNova Food Expiry Tracker",
      desc: "Modern AI-powered food management platform that tracks food expiry dates, sends intelligent notifications, recommends recipes using available ingredients, and helps reduce food waste through predictive AI suggestions and cloud synchronization.",
      tech: ["React Native", "Firebase", "Node.js", "MongoDB", "Express"],
      color: "from-cyan-400 to-teal-500",
      status: "Live Product",
      performance: ["15K+ Active Users", "4.9★ User Rating"]
    },
    {
      num: "03",
      title: "Smart IoT Home Automation",
      desc: "Next-generation IoT-powered smart home ecosystem for controlling lights, appliances, sensors, and security systems with real-time monitoring, voice assistant integration, cloud automation, and intelligent energy optimization dashboards.",
      tech: ["Arduino", "MQTT", "React", "ESP32", "Firebase", "Node.js"],
      color: "from-indigo-400 to-purple-500",
      status: "Production Ready",
      performance: ["99.9% System Stability", "60% Energy Optimization"]
    },
    {
      num: "04",
      title: "AI Resume Analyzer Platform",
      desc: "AI-powered resume analysis platform that scans resumes, evaluates ATS compatibility, identifies missing skills, and provides intelligent career improvement suggestions using OpenAI models, NLP technologies, and smart recommendation systems.",
      tech: ["React", "Python", "Flask", "OpenAI API", "MongoDB", "Tailwind CSS"],
      color: "from-rose-400 to-pink-500",
      status: "Live SaaS Platform",
      performance: ["92% ATS Accuracy", "20K+ Resume Scans"]
    },
    {
      num: "05",
      title: "Crypto Dashboard Analytics App",
      desc: "Advanced cryptocurrency analytics dashboard with live market tracking, AI-powered predictions, portfolio management, interactive trading charts, and real-time financial insights for modern crypto investors and traders.",
      tech: ["Next.js", "Tailwind CSS", "Chart.js", "Firebase", "CoinGecko API"],
      color: "from-amber-400 to-orange-500",
      status: "Live SaaS Dashboard",
      performance: ["120K+ Monthly Users", "99.8% Server Uptime"]
    },
    {
      num: "06",
      title: "Modern Portfolio Website",
      desc: "Interactive futuristic portfolio experience featuring immersive GSAP animations, smooth scrolling transitions, cinematic layouts, 3D motion effects, premium storytelling sections, and advanced UI interactions.",
      tech: ["React", "GSAP", "Framer Motion", "Three.js", "Lenis Scroll"],
      color: "from-emerald-400 to-teal-500",
      status: "Award-Winning Concept",
      performance: ["95+ Lighthouse Score", "Ultra Smooth 120FPS"]
    },
    {
      num: "07",
      title: "Smart Attendance System using Face Recognition",
      desc: "AI-powered face recognition attendance management platform with real-time identity verification, automated reporting, cloud analytics, and intelligent monitoring using advanced computer vision technologies.",
      tech: ["Python", "OpenCV", "TensorFlow", "MongoDB", "Flask"],
      color: "from-violet-400 to-fuchsia-500",
      status: "Production Ready",
      performance: ["98% Face Detection Accuracy", "85% Faster Attendance Process"]
    },
    {
      num: "08",
      title: "AI Chatbot Assistant",
      desc: "Advanced conversational AI assistant with contextual understanding, voice interaction, multilingual support, smart automation workflows, and intelligent real-time responses powered by NLP technologies and OpenAI APIs.",
      tech: ["React", "Node.js", "OpenAI API", "Express", "MongoDB"],
      color: "from-sky-400 to-blue-500",
      status: "Live AI Platform",
      performance: ["500K+ AI Conversations", "95% User Satisfaction"]
    },
    {
      num: "09",
      title: "Finance Tracker Dashboard",
      desc: "Modern personal finance management dashboard with expense analytics, budgeting tools, savings insights, cloud synchronization, interactive financial charts, and intelligent tracking systems.",
      tech: ["React", "Firebase", "Tailwind CSS", "Chart.js", "Node.js"],
      color: "from-red-400 to-rose-500",
      status: "Live SaaS Dashboard",
      performance: ["50K+ Monthly Users", "4.9★ User Rating"]
    },
    {
      num: "10",
      title: "Cyberpunk Gaming Landing Page",
      desc: "Immersive futuristic gaming landing page experience with cinematic GSAP animations, advanced WebGL effects, interactive 3D visuals, smooth transitions, and cyberpunk-inspired premium UI interactions.",
      tech: ["React", "GSAP", "Three.js", "WebGL", "Framer Motion"],
      color: "from-purple-500 to-cyan-500",
      status: "Creative Concept Project",
      performance: ["120FPS Smooth Animations", "98+ Lighthouse Performance"]
    }
  ];

  // Exactly 15 client partners
  const clientPartners = [
    "TechNova Solutions", "FutureX Labs", "CloudSync AI", "Nexora Digital", "QuantumByte Technologies",
    "Vertex Innovations", "NovaSphere Digital", "AlphaCore Systems", "ZenithX Labs", "PixelForge Studio",
    "Orion Tech Solutions", "BlueNova AI", "HyperLink Digital", "VisionCraft Agency", "Nexify Technologies"
  ];

  // Render the interactive storytelling paper airplane full page view
  if (!loading && previewMode === 'storytelling-plane') {
    return (
      <div className="relative w-full min-h-screen bg-white">
        <StorytellingPortfolio />
      </div>
    );
  }

  // Render minimal mobile view inside iphone preview on desktop (supporting multiple designs)
  if (!loading && (previewMode === 'minimal-stats' || previewMode === 'editorial-swiss' || previewMode === 'ashwin-portrait') && isDesktop) {
    const isSwiss = previewMode === 'editorial-swiss';
    const isPortrait = previewMode === 'ashwin-portrait';
    const isMinimal = previewMode === 'minimal-stats';
    return (
      <div className="min-h-screen w-screen bg-[#F5F5F7] font-sans flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
        {/* Background Soft Blurs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4F7CFF]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Main Container */}
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 z-10">
          
          {/* Left Side: Editorial description of the page */}
          <div className="flex flex-col text-center md:text-left max-w-sm md:max-w-md gap-5">
            <div className="inline-flex self-center md:self-start items-center gap-2 px-3 py-1 bg-white border border-neutral-200/50 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4F7CFF]"></span>
              <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                {isSwiss ? 'Swiss Editorial Design' : isPortrait ? 'Portrait Mobile Design' : 'Minimalist Mobile Design'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
              {isSwiss ? 'Swiss Editorial Style' : isPortrait ? 'Portrait Landing Page' : 'Apple-Inspired Portfolio'}
            </h2>
            
            <p className="text-sm text-neutral-500 leading-relaxed font-light">
              {isSwiss 
                ? 'An elegant, high-impact editorial landing page inspired by Swiss Design, Stripe keynote layouts, and modern Framer portfolios. Features bold typography and geometric wireframe art.'
                : isPortrait 
                ? 'A premium mobile-first landing page layout featuring a rounded hero profile card taking up 55% of the screen height, with clean, stacked minimalist typography and buttons below.'
                : 'A premium, high-contrast minimalist landing page designed specifically for mobile viewports (390×844px). Focuses on pure white space, elegant Inter typography, and clean layouts.'}
            </p>
            
            {/* Design variant selector tab inside description area */}
            <div className="flex flex-wrap bg-neutral-200/50 p-1 rounded-full border border-neutral-300/10 mt-2 self-center md:self-start gap-1">
              <button 
                onClick={() => setPreviewMode('minimal-stats')}
                className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer border-none ${isMinimal ? 'bg-white text-[#4F7CFF] shadow-sm' : 'text-neutral-500 hover:text-black bg-transparent'}`}
              >
                Apple Minimal
              </button>
              <button 
                onClick={() => setPreviewMode('editorial-swiss')}
                className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer border-none ${isSwiss ? 'bg-white text-[#4F7CFF] shadow-sm' : 'text-neutral-500 hover:text-black bg-transparent'}`}
              >
                Swiss Editorial
              </button>
              <button 
                onClick={() => setPreviewMode('ashwin-portrait')}
                className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer border-none ${isPortrait ? 'bg-white text-[#4F7CFF] shadow-sm' : 'text-neutral-500 hover:text-black bg-transparent'}`}
              >
                Portrait Mobile
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button 
                  onClick={() => setPreviewMode('immersive')}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-full shadow-sm hover:shadow active:scale-98 transition-all cursor-pointer flex items-center gap-1.5 border-none"
                >
                  <span>Desktop Immersive View</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => setPhoneFrameColor(phoneFrameColor === 'dark' ? 'light' : 'dark')}
                  className="px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full shadow-sm hover:bg-[#F5F5F7] active:scale-98 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Device: {phoneFrameColor === 'dark' ? 'Titanium Dark' : 'Titanium Light'}</span>
                </button>
              </div>
              
              <span className="text-[11px] text-neutral-400 font-mono text-center md:text-left mt-1">
                📱 Tip: Try scrolling inside the device mockup to experience the full landing page.
              </span>
            </div>
          </div>

          {/* Right Side: The Phone Simulator */}
          <div className="relative flex items-center justify-center phone-simulator-wrapper">
            {/* The Phone Mockup */}
            <div className={`w-[416px] h-[870px] rounded-[52px] border-[12px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ${
              phoneFrameColor === 'dark' 
                ? 'bg-[#1e1e1f] border-[#2d2d30] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.4)]' 
                : 'bg-[#f4f4f5] border-[#d4d4d8] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15)]'
            }`}>
              {/* Screen Viewport Container (exact 390x844) */}
              <div className="w-[390px] h-[844px] rounded-[40px] bg-white overflow-hidden relative border border-neutral-100 flex flex-col shadow-inner">
                
                {/* iOS Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between z-50 pointer-events-none select-none text-black font-semibold text-[11px]">
                  {/* Time */}
                  <div>12:20</div>
                  
                  {/* Dynamic Island */}
                  <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center">
                    {/* Camera hole detail */}
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800/40 ml-auto mr-3"></div>
                  </div>
                  
                  {/* Status Icons */}
                  <div className="flex items-center gap-1">
                    {/* Signal */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 3c-1.2 0-2.4.4-3.4 1.1L2.2 12.3c-.3.3-.3.8 0 1.1s.8.3 1.1 0l6.4-8.2c.7-.5 1.5-.7 2.3-.7s1.6.2 2.3.7l6.4 8.2c.3.3.8.3 1.1 0s.3-.8 0-1.1L15.4 4.1C14.4 3.4 13.2 3 12 3z"/>
                    </svg>
                    {/* Wifi */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M4.8 13.8a10 10 0 0 1 14.4 0 M2 11a14 14 0 0 1 20 0"/>
                    </svg>
                    {/* Battery */}
                    <div className="w-5 h-2.5 border border-black rounded-sm p-0.5 flex items-center">
                      <div className="h-full w-3/4 bg-black rounded-2xs"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile Portfolio Content Frame */}
                <div className="flex-1 w-full h-full overflow-hidden">
                  {isSwiss ? (
                    <EditorialMobilePortfolio />
                  ) : isPortrait ? (
                    <AshwinMobilePortfolio />
                  ) : (
                    <MinimalistMobilePortfolio />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Switch floating toggle at bottom-left */}
        <button 
          onClick={() => setPreviewMode('immersive')}
          className="fixed bottom-6 left-6 z-50 px-4 py-2 bg-white/80 hover:bg-white text-neutral-800 border border-neutral-200/50 rounded-full shadow-lg backdrop-blur-md text-[11px] font-bold tracking-wider uppercase active:scale-95 transition-all cursor-pointer"
        >
          ← Return to Main Desktop Site
        </button>
      </div>
    );
  }

  // Render minimal mobile views full screen on actual mobile devices
  if (!loading && (previewMode === 'minimal-stats' || previewMode === 'editorial-swiss' || previewMode === 'ashwin-portrait') && !isDesktop) {
    const isSwiss = previewMode === 'editorial-swiss';
    const isPortrait = previewMode === 'ashwin-portrait';
    return (
      <div className="relative w-screen h-screen bg-white">
        {isSwiss ? (
          <EditorialMobilePortfolio />
        ) : isPortrait ? (
          <AshwinMobilePortfolio />
        ) : (
          <MinimalistMobilePortfolio />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] font-sans overflow-x-hidden">
      {loading && <SplitLoadingScreen onComplete={() => {
        setLoading(false);
        window.scrollTo(0, 0);
      }} />}

      {/* Floating Canvas Particle Network Background */}
      {!loading && <CanvasBackground />}
      
      <PillNav 
        items={pillNavItems}
        activeHref={activeSection}
        baseColor="#ffffff"
        pillColor="#111111"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#555555"
        initialLoadAnimation={false}
      />

      <PremiumHero />

      {/* Dynamic Scroll Progress Bar */}
      <div 
        ref={scrollIndicatorRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500 w-full z-[99] origin-left scale-x-0"
      />


      {/* 1. AI ENGINEER ABOUT ME SECTION */}
      <section id="about" className="relative py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10 flex flex-col gap-14 overflow-hidden">
        
        {/* Background Ambient Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="scroll-reveal flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left gap-5 relative w-full mb-8">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-5 py-2 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span>01 / AI ENGINEER</span>
          </div>
          
          <div className="relative inline-block group cursor-default">
            <Shuffle
              text="Crafting AI-powered immersive experiences."
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black max-w-3xl leading-[1.1]"
              shuffleDirection="up"
              duration={0.6}
              stagger={0.05}
              animationMode="evenodd"
              shuffleTimes={3}
              textAlign="left"
            />
            {/* Cinematic sweeping underline */}
            <div className="absolute -bottom-8 left-0 w-24 h-[4px] bg-gradient-to-r from-blue-600 via-violet-500 to-transparent group-hover:w-[80%] transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-4">
          
          {/* LEFT COLUMN: Text, Badges, Timeline, Terminal */}
          <div className="lg:col-span-7 flex flex-col gap-10 scroll-reveal">
            
            {/* Paragraphs */}
            <div className="flex flex-col gap-6 text-neutral-700 font-light text-lg md:text-xl leading-relaxed">
              <p>
                I design and engineer intelligent digital systems that combine artificial intelligence, cinematic interfaces, and scalable full-stack architectures. My focus lies in building futuristic products powered by automation, computer vision, and seamless user experiences.
              </p>
              <p>
                From AI-driven platforms to immersive frontend systems, I create high-performance solutions using modern technologies — delivering products that feel both intelligent and visually refined.
              </p>
              <p className="text-neutral-500 text-base md:text-lg">
                My approach blends minimal design principles with advanced AI engineering, creating experiences that are intuitive, responsive, and emotionally engaging. Every project is crafted to balance aesthetics, performance, and intelligent functionality.
              </p>
            </div>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap gap-3.5 mt-4">
              {['AI Systems', 'Neural UI', 'Automation', 'Computer Vision', 'Intelligent Interfaces', 'Vision AI', 'Machine Learning', 'Smart Workflows'].map((badge) => (
                <div key={badge} className="px-5 py-2.5 bg-white/60 backdrop-blur-md border border-neutral-200/60 rounded-full text-xs sm:text-sm font-semibold text-neutral-700 shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 cursor-default">
                  {badge}
                </div>
              ))}
            </div>

          </div>
          
          {/* RIGHT COLUMN: Glassmorphism AI Profile Card */}
          <div className="lg:col-span-5 w-full h-full min-h-[500px] scroll-reveal">
            <AIProfileCard />
          </div>
          
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION */}
      <section id="experience" className="relative py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10 flex flex-col gap-10 overflow-hidden border-t border-neutral-100/50">
        
        {/* Section Header */}
        <div className="scroll-reveal flex flex-col items-center text-center gap-5 relative w-full mb-4">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-5 py-2 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span>02 / EXPERIENCE</span>
          </div>
          
          <div className="flex flex-col items-center gap-6 max-w-4xl">
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Building intelligent systems through immersive engineering."
                tag="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black leading-tight"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Cinematic sweeping underline (Centered) */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[80%] transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
            </div>
            
            <p className="text-neutral-500 font-light text-base md:text-lg max-w-2xl mt-4">
              Crafting AI-powered platforms, automation systems, and futuristic digital experiences.
            </p>
          </div>
        </div>

        <AIFuturisticExperience />
      </section>

      {/* 2. PREMIUM SKILLS SECTION */}
      <TechStack />

      {/* 3. FEATURED PROJECTS: Horizontal scrolling pinned panels (exactly 10 projects!) */}
      <div id="projects" ref={triggerRef} className="relative bg-black overflow-hidden h-screen w-full z-10">
        <div 
          ref={horizontalRef}
          className="h-full flex flex-nowrap items-center will-change-transform gap-4 lg:gap-12"
          style={{ 
            width: "max-content",
            paddingLeft: isDesktop ? "calc((100vw - 440px) / 2)" : "4vw",
            paddingRight: isDesktop ? "calc((100vw - 440px) / 2)" : "4vw"
          }}
        >
          {/* Section Introduction */}
          <div className="flex flex-col gap-4 w-[92vw] sm:w-[400px] flex-shrink-0 project-card select-none">
            <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">03 / SHOWCASE</span>
            <h2 className="text-white text-3xl sm:text-5xl font-light tracking-tight leading-[1.1]">Selected<br />Featured<br />Projects.</h2>
            <p className="text-neutral-400 font-light text-xs sm:text-sm mt-2 max-w-xs leading-relaxed">
              Scroll downward to slide through Ashwin's 10 sample applications.
            </p>
          </div>

          {/* Render exactly 10 horizontal scrolling project cards */}
          {projectsData.map((project) => (
            <div 
              key={project.num}
              className="project-card w-[92vw] sm:w-[440px] h-[72vh] min-h-[480px] sm:min-h-[560px] flex-shrink-0 bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[2rem] flex flex-col justify-between group hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] snap-center snap-always will-change-transform overflow-hidden relative"
            >
              {/* Inner Parallax Container */}
              <div className="project-parallax-inner flex flex-col justify-between h-full w-full pointer-events-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono bg-gradient-to-r ${project.color} bg-clip-text text-transparent font-semibold tracking-wider`}>
                      PROJECT {project.num}
                    </span>
                    <span className="text-xs text-white/30 font-mono">02 / 05 / 2026</span>
                  </div>
                  
                  <h3 className="text-white text-2xl sm:text-3xl font-light tracking-tight group-hover:text-blue-300 transition-colors mt-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed mt-2">
                    {project.desc}
                  </p>

                  {/* Performance & Status Metrics */}
                  <div className="flex flex-col gap-2 mt-4">
                    {project.performance && project.performance.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color}`} />
                        <span className="text-white/80 text-xs sm:text-sm font-mono">{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack badges */}
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    {project.tech.map((badge) => (
                      <span key={badge} className="bg-white/5 border border-white/10 text-white/80 text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-mono">
                        {badge}
                      </span>
                    ))}
                    {project.status && (
                      <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-mono font-semibold">
                        • {project.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges and links */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
                  <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                    Live Demo
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Source Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Project Scroll Progress Indicator Overlay */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center gap-2 px-6 pointer-events-none">
          <div className="flex items-center justify-center gap-3">
            <span className="text-white text-xs font-mono tracking-widest">
              {String(Math.min(10, Math.max(1, currentProjectIndex))).padStart(2, '0')}
            </span>
            <div className="w-32 h-[2px] bg-white/20 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-blue-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${(Math.min(10, Math.max(1, currentProjectIndex)) / 10) * 100}%` }}
              />
            </div>
            <span className="text-white/40 text-xs font-mono tracking-widest">10</span>
          </div>
        </div>
      </div>

      {/* 4. CLIENTS SECTION: Infinite client marquee slider containing exactly 15 partners */}
      <section id="clients" className="relative py-24 bg-white border-b border-neutral-200/50 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-10">
          <div className="scroll-reveal flex flex-col items-center justify-center text-center gap-5 relative w-full mb-10">
            <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>04 / PARTNERS</span>
            </div>
            
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Futuristic alliances."
                tag="h2"
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Glowing animated HUD underline */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[150%] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
          </div>
        </div>

        {/* Infinite Marquee Slider with 15 clients */}
        <div className="relative flex w-full overflow-x-hidden mt-10 pointer-events-auto py-5 bg-neutral-50/50 border-y border-neutral-100 group">
          <div className="animate-marquee group-hover:[animation-play-state:paused] flex gap-12 md:gap-16 items-center pr-12">
            {clientPartners.map((client, idx) => (
              <div key={`client-${idx}`} className="flex items-center gap-3 px-6 py-4 bg-white border border-neutral-200 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.12)] hover:border-blue-300 transition-all duration-300 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-black font-bold tracking-wider text-lg md:text-xl uppercase whitespace-nowrap">{client}</span>
              </div>
            ))}
            
            {/* Duplicated List for seamless loops */}
            {clientPartners.map((client, idx) => (
              <div key={`client-dup-${idx}`} className="flex items-center gap-3 px-6 py-4 bg-white border border-neutral-200 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.12)] hover:border-blue-300 transition-all duration-300 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-black font-bold tracking-wider text-lg md:text-xl uppercase whitespace-nowrap">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION: Premium Apple-inspired stacked or grid service cards */}
      <section id="services" className="relative py-28 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto z-10 flex flex-col gap-16">
        <div className="scroll-reveal flex flex-col items-center justify-center text-center gap-8 relative w-full mb-6">
          
          {/* Centered HUD Header */}
          <div className="flex flex-col items-center justify-center gap-5 relative w-full">
            <div className="flex items-center gap-3 text-blue-600 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>05 / SERVICES</span>
            </div>
            
            <div className="relative inline-block group cursor-default">
              <Shuffle
                text="Interactive Creative Solutions."
                tag="h2"
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
                shuffleDirection="up"
                duration={0.6}
                stagger={0.05}
                animationMode="evenodd"
                shuffleTimes={3}
                textAlign="center"
              />
              {/* Glowing animated HUD underline */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-[150%] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
          </div>
          
          {/* Segmented Selector Pill Control */}
          <div className="flex bg-neutral-100/80 p-1 rounded-full border border-neutral-200/40 shadow-[0_2px_10px_rgba(0,0,0,0.01)] relative z-30 mt-4">
            <button 
              onClick={() => setServicesViewMode('stack')}
              className={`px-5 py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${servicesViewMode === 'stack' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-black'}`}
            >
              Stacked View
            </button>
            <button 
              onClick={() => setServicesViewMode('grid')}
              className={`px-5 py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${servicesViewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-black'}`}
            >
              Grid View
            </button>
          </div>
        </div>

        {servicesViewMode === 'stack' ? (
          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={120} 
            itemScale={0.02} 
            itemStackDistance={35} 
            stackPosition="24%" 
            scaleEndPosition="12%" 
            baseScale={0.88} 
            blurAmount={0}
          >
            {servicesData.map((srv) => (
              <ScrollStackItem key={srv.id}>
                <ServiceCard srv={srv} isGrid={false} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div id="services-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {servicesData.map((srv) => (
              <ServiceCard key={srv.id} srv={srv} isGrid={true} />
            ))}
          </div>
        )}
      </section>

      {/* 6. CLIENT REVIEWS SECTION: Silicon Valley Dark Showcase */}
      <section id="testimonials" className="relative py-32 bg-black border-y border-neutral-900 z-10">
        {/* Futuristic glowing backdrop gradients */}
        <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 flex flex-col gap-20 relative z-10">
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">TRUSTED BY FOUNDERS GLOBALLY</span>
              <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-tight">Client Reviews</h2>
            </div>
            <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-md leading-relaxed">
              Partnering with forward-thinking leaders globally to build high-performance creative interfaces, complex SaaS platforms, AI dashboards, and modern animated websites.
            </p>
          </div>

          {/* Premium Staggered Testimonials Showcase (both Desktop and Mobile) */}
          <div className="w-full relative pointer-events-auto mt-10">
            <StaggerTestimonials />
          </div>

          <div 
            className="scroll-reveal pt-20 mt-12 relative z-10 w-screen overflow-hidden"
            style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
          >
            <div className="relative flex w-full overflow-x-hidden py-4 pointer-events-auto group">
              <div className="animate-stats-marquee group-hover:[animation-play-state:paused] flex gap-16 md:gap-24 items-center pr-16 md:pr-24">
                {[
                  { value: "120+", label: "PROJECTS COMPLETED", desc: "Modern web & creative solutions" },
                  { value: "40+", label: "GLOBAL CLIENTS", desc: "Trusted by startups worldwide" },
                  { value: "99%", label: "CLIENT SATISFACTION", desc: "Delivering quality & performance" },
                  { value: "4+", label: "HACKATHONS WON", desc: "National-level innovation challenges" },
                  { value: "15+", label: "AWARDS WON", desc: "National & international recognitions" },
                  { value: "24/7", label: "SUPPORT AVAILABLE", desc: "Fast response & maintenance support" },
                  { value: "2+", label: "YEARS LEARNING", desc: "UI/UX, frontend & animations" }
                ].map((stat, idx) => (
                  <CountUpStat 
                    key={`stat-1-${idx}`} 
                    valueStr={stat.value} 
                    label={stat.label} 
                    desc={stat.desc} 
                  />
                ))}
                
                {/* Duplicated List for seamless looping */}
                {[
                  { value: "120+", label: "PROJECTS COMPLETED", desc: "Modern web & creative solutions" },
                  { value: "40+", label: "GLOBAL CLIENTS", desc: "Trusted by startups worldwide" },
                  { value: "99%", label: "CLIENT SATISFACTION", desc: "Delivering quality & performance" },
                  { value: "4+", label: "HACKATHONS WON", desc: "National-level innovation challenges" },
                  { value: "15+", label: "AWARDS WON", desc: "National & international recognitions" },
                  { value: "24/7", label: "SUPPORT AVAILABLE", desc: "Fast response & maintenance support" },
                  { value: "2+", label: "YEARS LEARNING", desc: "UI/UX, frontend & animations" }
                ].map((stat, idx) => (
                  <CountUpStat 
                    key={`stat-2-${idx}`} 
                    valueStr={stat.value} 
                    label={stat.label} 
                    desc={stat.desc} 
                  />
                ))}
              </div>
            </div>
          </div>

          {isDesktop && (
            <div className="pt-28 mt-12 w-full flex flex-col gap-10 relative z-10">
              <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">06 / CREATIVE SHOWCASE</span>
                  <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight leading-tight">3D WebGL Showcase</h2>
                </div>
                <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-md leading-relaxed">
                  Drag horizontally or scroll to rotate this high-performance WebGL cylindrical gallery. Engineered with OGL shaders for real-time wave deformations.
                </p>
              </div>

              {/* True 100vw full-bleed — breaks out of every parent container */}
              <div
                className="scroll-reveal h-[560px] overflow-hidden bg-neutral-950 relative"
                style={{
                  width: '100vw',
                  marginLeft: 'calc(50% - 50vw)'
                }}
              >
                <CircularGallery 
                  items={galleryItems}
                  bend={3} 
                  textColor="#22d3ee" 
                  borderRadius={0.05} 
                  font="bold 28px JetBrains Mono, monospace" 
                  scrollSpeed={2.5}
                  autoScrollSpeed={0.05}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
      <ContactForm />

      {/* 8. FOOTER */}
      <PremiumFooter />
    </div>
  );
}
