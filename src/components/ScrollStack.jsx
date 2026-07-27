import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className="scroll-stack-card-wrapper">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const wrappersRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const wrapperOffsetsRef = useRef([]);
  const endElementTopRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const measureOffsets = useCallback(() => {
    if (!cardsRef.current.length) return;

    wrapperOffsetsRef.current = cardsRef.current.map((card, i) => {
      const wrapper = wrappersRef.current[i];
      const targetEl = wrapper || card;
      if (useWindowScroll) {
        const rect = targetEl.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return targetEl.offsetTop;
      }
    });

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    if (endElement) {
      if (useWindowScroll) {
        const rect = endElement.getBoundingClientRect();
        endElementTopRef.current = rect.top + window.scrollY;
      } else {
        endElementTopRef.current = endElement.offsetTop;
      }
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const cardOffsets = wrapperOffsetsRef.current;
    const endElementTop = endElementTopRef.current;

    // Run measurement if offsets haven't been cached yet
    if (cardOffsets.length !== cardsRef.current.length) {
      measureOffsets();
    }

    // Calculate the top card index once outside the loop for performance
    let topCardIndex = 0;
    for (let j = 0; j < cardsRef.current.length; j++) {
      const jCardTop = cardOffsets[j] !== undefined ? cardOffsets[j] : 0;
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (scrollTop >= jTriggerStart) {
        topCardIndex = j;
      }
    }

    // BATCHED WRITES: Apply all styling properties in a separate loop
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsets[i] !== undefined ? cardOffsets[i] : 0;
      
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      // GPU-accelerated opacity fade for depth instead of heavy CPU filter: blur
      let opacity = 1;
      if (i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        opacity = Math.max(0.3, 1 - depthInStack * 0.15); // e.g. 1.0 -> 0.85 -> 0.70 -> 0.55 -> 0.40 -> 0.30
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = { translateY, scale, rotation, blur, opacity };
      const lastTransform = lastTransformsRef.current.get(i);

      const hasChanged =
        !lastTransform ||
        lastTransform.translateY !== translateY ||
        lastTransform.scale !== scale ||
        lastTransform.rotation !== rotation ||
        lastTransform.blur !== blur ||
        lastTransform.opacity !== opacity;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        card.style.opacity = newTransform.opacity;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    measureOffsets
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      // Use GSAP ScrollTrigger to hook into the global Lenis loop synchronously!
      // This eliminates the 1-frame RAF lag that causes shaking.
      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: handleScroll
      });
      
      // Keep a reference to kill it later
      animationFrameRef.current = st;
      return null;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertia: 0.6
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    
    const wrappers = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card-wrapper')
        : scroller.querySelectorAll('.scroll-stack-card-wrapper')
    );

    cardsRef.current = cards;
    wrappersRef.current = wrappers;
    const transformsCache = lastTransformsRef.current;

    // Apply spacing to wrappers instead of cards if wrappers exist
    const elementsToSpace = wrappers.length === cards.length ? wrappers : cards;

    elementsToSpace.forEach((el, i) => {
      if (i < elementsToSpace.length - 1) {
        el.style.marginBottom = `${itemDistance}px`;
      }
    });

    cards.forEach((card) => {
      card.style.willChange = 'transform, filter, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    measureOffsets();
    updateCardTransforms();

    const handleResize = () => {
      measureOffsets();
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);
    ScrollTrigger.addEventListener('refresh', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener('refresh', handleResize);
      
      if (animationFrameRef.current) {
        if (animationFrameRef.current.kill) {
          animationFrameRef.current.kill();
        } else {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      wrappersRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    measureOffsets
  ]);

  return (
    <div className={`scroll-stack-scroller ${useWindowScroll ? 'window-scroll' : ''} ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
