import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navItems = [
    { label: "About", href: "/#our-story" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" }
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("/#our-story");

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Manage Active Section based on Manual Scroll Position
  useEffect(() => {
    const checkActiveSection = () => {
      const sections = ["our-story", "skills", "projects", "contact"];
      let current = "/#our-story";
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section overlaps the upper 30% of the viewport
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            current = `/#${id}`;
          }
        }
      }

      // Check if user has scrolled to the absolute bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = "/#contact";
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', checkActiveSection, { passive: true });
    // Run once on mount
    checkActiveSection();

    return () => window.removeEventListener('scroll', checkActiveSection);
  }, []);

  // 2. Manage Inactivity Hide (Show on any scroll, hide after 3s of no interaction)
  useEffect(() => {
    const resetTimer = () => {
      setIsVisible(true);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      
      // Only hide if we are scrolled down past 50px and not hovering
      if (!isHovered && window.scrollY > 50) {
        timeoutId.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Wake up navbar if mouse moves near the top of the screen
      if (window.scrollY > 50 && e.clientY < 120) {
        resetTimer();
      }
    };

    window.addEventListener('scroll', resetTimer, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
    if (window.scrollY > 50) {
      timeoutId.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 0, x: '-50%' }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        x: '-50%' 
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ left: '50%' }}
      className="fixed top-6 z-50 bg-[#101010]/80 backdrop-blur-md rounded-full px-2 py-1.5 border border-[#DEDBC8]/15"
    >
      <div className="flex items-center gap-1">
        {navItems.map((item, index) => {
          const isHoveredItem = hoveredIndex === index;
          const isActive = activeSection === item.href;
          const shouldShowBg = isHoveredItem || (isActive && hoveredIndex === null);

          return (
            <a
              key={index}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                color: shouldShowBg 
                  ? '#000000' 
                  : 'rgba(225, 224, 204, 0.65)'
              }}
              className="relative px-4 py-1.5 text-[10px] sm:text-xs font-mono font-medium tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300"
            >
              {shouldShowBg && (
                <motion.span
                  layoutId="navbar-active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                />
              )}
              {item.label}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}


