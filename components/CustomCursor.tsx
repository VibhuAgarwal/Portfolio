
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'https://esm.sh/framer-motion@^11.0.0';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('.glass') !== null ||
        target.closest('button') !== null ||
        target.closest('a') !== null;
      
      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Ring */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -20,
          top: -20,
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.15)',
          backgroundColor: isHovering ? 'rgba(56, 189, 248, 0.05)' : 'rgba(255, 255, 255, 0)',
        }}
        className="fixed rounded-full border-[1px] mix-blend-difference"
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -3,
          top: -3,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? '#38bdf8' : '#ffffff',
        }}
        className="fixed w-[6px] h-[6px] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
      />

      {/* Trailing Accent Particles (Subtle) */}
      <AnimatePresence>
        {isHovering && (
           <motion.div
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0 }}
             style={{
               translateX: cursorX,
               translateY: cursorY,
               left: -30,
               top: -30,
             }}
             className="fixed w-[60px] h-[60px] border border-sky-500/10 rounded-full animate-pulse pointer-events-none"
           />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
