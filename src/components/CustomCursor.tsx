import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, highly responsive springs for trailing fluid motion
  const springConfig = { damping: 30, stiffness: 350, mass: 0.35 };
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
        scale: hovered ? 1.6 : 1.1,
        rotate: hovered ? 15 : -10,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="fixed pointer-events-none z-[9999] w-8 h-8 select-none"
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        {/* Left Sprout Leaf (animates out on hover) */}
        <motion.path
          d="M12 6C10.5 4 8.5 3.5 7.5 4C7 5 7.5 7 9.5 7.5C10.5 7.7 11.5 7 12 6Z"
          fill="#A3B899"
          stroke="#161616"
          strokeWidth="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="origin-[12px_6px]"
        />
        
        {/* Right Sprout Leaf (animates out on hover) */}
        <motion.path
          d="M12 6C13.5 4 15.5 3.5 16.5 4C17 5 16.5 7 14.5 7.5C13.5 7.7 12.5 7 12 6Z"
          fill="#A3B899"
          stroke="#161616"
          strokeWidth="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.05 }}
          className="origin-[12px_6px]"
        />

        {/* Flower Seed Body */}
        <path
          d="M12 6C9.5 9.5 8 13.5 8 16.5C8 18.9 9.8 20.5 12 20.5C14.2 20.5 16 18.9 16 16.5C16 13.5 14.5 9.5 12 6Z"
          fill="#DEDBC8"
          stroke="#161616"
          strokeWidth="1"
        />

        {/* Inner seed shell texture */}
        <path
          d="M12 8C11 11.5 10 14.5 10 16.5C10 17.5 10.8 18 12 18"
          stroke="#B5B2A0"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
