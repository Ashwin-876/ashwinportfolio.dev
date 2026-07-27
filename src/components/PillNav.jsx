import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PillNav.css';

gsap.registerPlugin(ScrollTrigger);

const PillNav = ({
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#d1d1d1',
  pillColor = '#000000',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#555555',
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    const currentTls = tlRefs.current;
    const currentTweens = activeTweenRefs.current;
    const currentLogoTween = logoTweenRef.current;

    return () => {
      window.removeEventListener('resize', onResize);
      currentTls.forEach(tl => tl?.kill());
      currentTweens.forEach(t => t?.kill());
      currentLogoTween?.kill();
    };
  }, [items, ease, initialLoadAnimation]);

  // GSAP ScrollTrigger Sticky Scroll Shrink Animation
  useEffect(() => {
    const container = containerRef.current;
    const nav = navRef.current;
    const logoImg = logoImgRef.current;

    if (!container || !nav) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top+=10',
        end: 'top top+=85',
        scrub: 0.3,
        invalidateOnRefresh: true
      }
    });

    tl.fromTo(container, 
      { marginTop: '16px' },
      { marginTop: '6px', ease: 'none' }, 
      0
    );

    tl.fromTo(nav, 
      {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        borderColor: 'rgba(255, 255, 255, 0.45)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.2)'
      },
      {
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '6px',
        paddingRight: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        borderColor: 'rgba(255, 255, 255, 0.65)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        ease: 'none'
      }, 
      0
    );

    if (logoImg) {
      tl.fromTo(logoImg, 
        { width: '38px', height: '38px', borderRadius: '9px' },
        { width: '30px', height: '30px', borderRadius: '7px', ease: 'none' }, 
        0
      );
    }

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const handleEnter = i => {
    // If it's already active, don't play animation
    if (items[i].href === activeHref) return;
    
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    // If it's already active, don't reverse animation
    if (items[i].href === activeHref) return;
    
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (lines.length === 3) {
        if (newState) {
          gsap.to(lines[0], { rotation: 45, y: 4.5, duration: 0.3, ease });
          gsap.to(lines[1], { opacity: 0, duration: 0.2, ease });
          gsap.to(lines[2], { rotation: -45, y: -4.5, duration: 0.3, ease });
        } else {
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
          gsap.to(lines[1], { opacity: 1, duration: 0.2, ease });
          gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3, ease });
        }
      } else {
        if (newState) {
          gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
        } else {
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
        }
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  // Synchronize GSAP animations with activeHref changes (enables smooth sliding/highlight transitions on scroll)
  useEffect(() => {
    if (!items || !items.length) return;
    
    items.forEach((item, i) => {
      const tl = tlRefs.current[i];
      if (!tl) return;

      activeTweenRefs.current[i]?.kill();
      
      if (item.href === activeHref) {
        // Animate the active item to full highlight state
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        // Return other items to their default non-active states
        activeTweenRefs.current[i] = tl.tweenTo(0, {
          duration: 0.25,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  }, [activeHref, items]);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor
  };

  return (
    <div 
      ref={containerRef}
      className="pill-nav-container w-full max-w-[90rem] mx-auto px-6 sm:px-12 md:px-16 mt-4 flex justify-center z-[1000] fixed top-0 left-1/2 -translate-x-1/2 pointer-events-auto"
    >
      <nav 
        ref={navRef}
        className={"pill-nav " + className} 
        aria-label="Primary" 
        style={cssVars}
      >
        <a
          className="pill-logo flex items-center group"
          href={items?.[0]?.href || '#'}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          {/* Logo Image */}
          <div 
            ref={logoImgRef}
            className="pill-logo-img shadow-sm"
          >
            <img src="/logo.png" alt={logoAlt} className="w-full h-full object-contain" />
          </div>


          <span className="pill-logo-text block">
            PORTFOLIO
          </span>
        </a>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label flex items-center gap-2">
                      {item.highlight && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />}
                      {item.label}
                    </span>
                    <span className="pill-label-hover flex items-center gap-2" aria-hidden="true">
                      {item.highlight && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />}
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only ml-auto mr-4"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={{ ...cssVars, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ul className="mobile-menu-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', listStyle: 'none', padding: 0, margin: 0, gap: '0.45rem' }}>
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                  onClick={toggleMobileMenu}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: 'auto' }}
                >
                  {item.label}
                </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
