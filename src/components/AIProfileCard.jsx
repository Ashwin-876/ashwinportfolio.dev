import { useRef } from 'react';
import { ArrowRight, Fingerprint, Database, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const AIProfileCard = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  };

  return (
    <div className="relative group w-full h-full flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
      
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full bg-white/80 backdrop-blur-2xl border border-white/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(59,130,246,0.15)] group-hover:border-blue-200/50"
      >
        {/* Holographic corner reflection */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-300/30 to-violet-300/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />

        <div className="flex flex-col gap-10 relative z-10">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 p-5 rounded-2xl group-hover:border-blue-100 transition-colors shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5">
                <Database size={64} />
              </div>
              <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">2+</span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Years Building<br/>AI Systems</span>
            </div>
            
            <div className="flex flex-col gap-1 bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 p-5 rounded-2xl group-hover:border-violet-100 transition-colors shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5">
                <Sparkles size={64} />
              </div>
              <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">40+</span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mt-1">AI & Full Stack<br/>Projects</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-500 flex items-center gap-2">
                <Fingerprint size={12} />
                Core Focus
              </span>
              <span className="text-sm md:text-base font-semibold text-black leading-snug">AI Automation • Computer Vision • Intelligent UI Systems</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Primary Focus</span>
              <span className="text-sm font-medium text-neutral-700">AI-Powered Applications & Cinematic User Experiences</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Location</span>
              <span className="text-sm font-medium text-neutral-700">India / Worldwide Remote</span>
            </div>
          </div>

          <a href="https://drive.google.com/file/d/1PN-RSDWIezNSxlpOBCeG0ZKhRj4ORaje/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="group/btn w-full bg-black/95 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 font-bold text-xs tracking-[0.15em] uppercase transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-black hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] overflow-hidden relative shadow-[0_10px_20px_rgba(0,0,0,0.1)] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/30 to-blue-600/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">DOWNLOAD RESUME</span>
            <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-500 ease-out" />
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default AIProfileCard;
