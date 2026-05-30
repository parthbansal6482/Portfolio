import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, highly responsive springs for trailing fluid motion
  const springConfig = { damping: 30, stiffness: 380, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide custom cursor on mobile/touch interfaces
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide standard cursor globally via JS as backup
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: hovered ? 1.45 : 1.05,
        rotate: hovered ? 10 : -8,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 15 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-8 h-8 select-none"
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]">
        {/* Underlay Sprout Stem (emerges on hover) */}
        <motion.path
          d="M12 18V6"
          stroke="#A3B899"
          strokeWidth="1.25"
          strokeLinecap="round"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          style={{ transformOrigin: '12px 18px' }}
        />

        {/* Left Sprout Leaf (sprouts from stem tip on hover) */}
        <motion.path
          d="M12 6C10.5 4 8.5 3.5 7.5 4C7 5 7.5 7 9.5 7.5C10.5 7.7 11.5 7 12 6Z"
          fill="#A3B899"
          stroke="#161616"
          strokeWidth="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hovered ? 1.05 : 0, opacity: hovered ? 1 : 0, rotate: hovered ? -8 : 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 14, delay: 0.08 }}
          style={{ transformOrigin: '12px 6px' }}
        />
        
        {/* Right Sprout Leaf (sprouts from stem tip on hover) */}
        <motion.path
          d="M12 6C13.5 4 15.5 3.5 16.5 4C17 5 16.5 7 14.5 7.5C13.5 7.7 12.5 7 12 6Z"
          fill="#A3B899"
          stroke="#161616"
          strokeWidth="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hovered ? 1.05 : 0, opacity: hovered ? 1 : 0, rotate: hovered ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 14, delay: 0.12 }}
          style={{ transformOrigin: '12px 6px' }}
        />

        {/* Symmetrical Left Seed Shell Half (splits left on hover) */}
        <motion.path
          d="M12 6C9.5 9.5 8 13.5 8 16.5C8 18.9 9.8 20.5 12 20.5Z"
          fill="#DEDBC8"
          stroke="#161616"
          strokeWidth="0.85"
          animate={{
            rotate: hovered ? -14 : 0,
            x: hovered ? -1.8 : 0,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 16 }}
          style={{ transformOrigin: '12px 20.5px' }}
        />

        {/* Symmetrical Right Seed Shell Half (splits right on hover) */}
        <motion.path
          d="M12 6C14.5 9.5 16 13.5 16 16.5C16 18.9 14.2 20.5 12 20.5Z"
          fill="#DEDBC8"
          stroke="#161616"
          strokeWidth="0.85"
          animate={{
            rotate: hovered ? 14 : 0,
            x: hovered ? 1.8 : 0,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 16 }}
          style={{ transformOrigin: '12px 20.5px' }}
        />
      </svg>
    </motion.div>
  );
}
