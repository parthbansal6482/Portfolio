import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const lastScrollY = useRef(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Manage Active Section based on Scroll and Location
  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveSection("/#projects");
      return;
    }

    const sections = ["our-story", "skills", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`/#${id}`);
            }
          });
        },
        { rootMargin: "-40% 0px -40% 0px" } // trigger active state when section takes up the center of the viewport
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [location.pathname]);

  // 2. Manage Scroll-to-Hide behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible near the very top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = null;
        }
        lastScrollY.current = currentScrollY;
        return;
      }

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide navbar immediately (unless hovered)
        if (!isHovered) {
          setIsVisible(false);
        }
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);

        // Hide after inactivity if mouse is not hovering
        if (!isHovered) {
          timeoutId.current = setTimeout(() => {
            setIsVisible(false);
          }, 3000); // hides after 3 seconds of scroll inactivity
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    // If scroll position is not at the top, start the timer to hide
    if (window.scrollY >= 50) {
      timeoutId.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500); // hide quicker after mouse leaves
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


