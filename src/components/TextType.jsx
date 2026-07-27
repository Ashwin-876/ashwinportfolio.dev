'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextType = ({
  text = 'Ashwin',
  as: Component = 'span',
  initialDelay = 0, // ms delay before starting
  duration = 0.9, // in seconds
  className = '',
  // Swallow unused typewriter props to avoid HTML DOM attribute pollution:
  typingSpeed,
  loop,
  showCursor,
  cursorCharacter,
  cursorClassName,
  ...props
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Set initial layout states to prevent flash of unstyled content
    gsap.set(textRef.current, {
      opacity: 0,
      y: 10,
      filter: 'blur(8px)',
      clipPath: 'inset(0% 100% 0% 0%)'
    });

    const delay = initialDelay / 1000; // convert to seconds

    const revealTween = gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: duration,
      delay: delay,
      ease: 'power2.out'
    });

    return () => {
      revealTween.kill();
    };
  }, [text, initialDelay, duration]);

  return (
    <Component
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        display: 'inline-block',
        willChange: 'transform, opacity, filter, clip-path'
      }}
      {...props}
    >
      {text}
    </Component>
  );
};

export default TextType;
