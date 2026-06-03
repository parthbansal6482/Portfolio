import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the fast tracking core dot (high stiffness, low mass)
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 600, mass: 0.15 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 600, mass: 0.15 });

  // Check for mobile/touch interfaces once on mount
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // 1. Manage Event Listeners (Once on mount)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsVisible((prev) => {
        if (!prev) {
          // Instantly snap springs on first mouse entrance to avoid sliding from (-100, -100)
          dotX.set(e.clientX);
          dotY.set(e.clientY);
          return true;
        }
        return true;
      });
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const clickable = target.closest('a, button, [role="button"], .cursor-pointer, [data-cursor]');
      setHovered(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, mouseX, mouseY, dotX, dotY]);

  // 2. Manage Body Cursor Visibility
  useEffect(() => {
    if (isTouchDevice) return;

    if (isVisible) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none">
      {/* Central Core Dot (Inverted mix-blend-difference, remains white on hover) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference"
      />
    </div>
  );
}
