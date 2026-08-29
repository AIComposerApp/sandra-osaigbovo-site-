import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface HeroCardProps {
  onBookClick?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onBookClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Gentle counter-translation range for scroll-driven video position
  const rawVideoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  // Spring physics delay for fluid organic motion
  const smoothVideoY = useSpring(rawVideoY, {
    stiffness: 35,
    damping: 22,
    mass: 0.9,
  });

  // Soft subtle zoom as user scrolls away
  const rawVideoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const smoothVideoScale = useSpring(rawVideoScale, {
    stiffness: 35,
    damping: 22,
  });

  const titleLines = ['Health & Wellness', 'Consultancy'];
  const subLines = ['specializing in functional', 'strength & movement'];

  // Gentle cubic bezier curve for word load reveal
  const transitionEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section ref={containerRef} className="relative w-full max-w-[1400px] lg:max-w-[98vw] mx-auto px-3 sm:px-6 lg:px-4 pt-1 pb-2 -mt-1 sm:-mt-2 lg:-mt-[0.5vw]">
      {/* Container matching StatementSection width exactly so margins align seamlessly */}
      <div className="w-full">
        <div className="relative w-full min-h-[calc(100vh-140px)] sm:min-h-[720px] lg:min-h-[760px] max-h-[680px] sm:max-h-none rounded-[1.3rem] sm:rounded-[1.8rem] bg-[#0A0A0A] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-none shadow-none">
          
          {/* Background Layer: Soft Fluid Parallax with Spring Inertia */}
          <motion.div
            style={{ y: smoothVideoY, scale: smoothVideoScale }}
            className="absolute -top-[10%] -left-[5%] w-[110%] h-[126%] z-0 overflow-hidden pointer-events-none transition-opacity duration-300"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100 pointer-events-none"
              src="https://lipedemaguru.com/wp-content/uploads/2025/10/LG-MAIN_1.webm"
            />

            {/* Soft gradient overlay for high text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
          </motion.div>

          {/* Top Heading Sequence (Top Left Alignment) */}
          <div className="relative z-20 flex flex-col items-start text-left max-w-3xl w-full">
            <h1 className="font-gothic-compact text-[2.2rem] sm:text-[64px] lg:text-[4.2rem] font-normal tracking-[-0.02em] text-white leading-[1.0] select-none flex flex-col items-start space-y-0.5">
              {titleLines.map((line, index) => (
                <span key={index} className="inline-block overflow-hidden pb-1">
                  {/* Motion active on desktop (lg:), instant on mobile for fast loading */}
                  <motion.span
                    initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { y: '100%', opacity: 0 } : { y: '0%', opacity: 1 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: index * 0.15,
                      ease: transitionEase,
                    }}
                    className="inline-block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom Area: Specialization & CTA Button */}
          {/* On Mobile/Tablet (< lg): standard stacked view */}
          {/* On Desktop (lg:): "specializing in Lipedema" on line 1, then Button + "management" on line 2 */}
          <div className="relative z-20 flex flex-col items-start text-left lg:items-end lg:text-right space-y-3.5 sm:space-y-6 mt-8 sm:mt-16 w-full">
            
            {/* Desktop Layout (hidden on mobile/tablet) */}
            <div className="hidden lg:flex flex-col items-end text-right w-full space-y-2">
              {/* Line 1: specializing in functional */}
              <div className="overflow-hidden pb-1">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.4, ease: transitionEase }}
                  className="font-gothic-compact text-[4.2rem] font-normal text-white/95 leading-[1.0] tracking-[-0.02em]"
                >
                  specializing in functional
                </motion.h2>
              </div>

              {/* Line 2: [ BOOK A CONSULTATION ] + strength & movement */}
              <div className="overflow-hidden pb-1">
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.52, ease: transitionEase }}
                  className="flex items-center space-x-5"
                >
                  <button
                    onClick={onBookClick}
                    className="bg-[#FBF2E9] hover:bg-[#F2E5D7] text-[#372426] font-bricolage text-sm font-extrabold tracking-wider uppercase px-8 py-3.5 rounded-full shadow-none transition-colors duration-300 cursor-pointer flex items-center justify-center group shrink-0"
                  >
                    <span className="roll-text-wrapper">
                      <span className="roll-text" data-text="BOOK A CONSULTATION">
                        BOOK A CONSULTATION
                      </span>
                    </span>
                  </button>

                  <h2 className="font-gothic-compact text-[4.2rem] font-normal text-white/95 leading-[1.0] tracking-[-0.02em]">
                    strength &amp; movement
                  </h2>
                </motion.div>
              </div>
            </div>

            {/* Mobile & Tablet Layout (hidden on desktop) */}
            <div className="lg:hidden flex flex-col items-start text-left space-y-3.5 sm:space-y-6 w-full">
              <div className="text-left max-w-3xl w-full">
                <h2 className="font-gothic-compact text-[2.2rem] sm:text-[64px] font-normal text-white/95 leading-[1.0] tracking-[-0.02em] flex flex-col items-start">
                  {subLines.map((line, index) => (
                    <span key={index} className="inline-block overflow-hidden pb-0.5">
                      <motion.span
                        initial={{ y: '0%', opacity: 1 }}
                        animate={{ y: '0%', opacity: 1 }}
                        className="inline-block"
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h2>
              </div>

              <div className="pt-1.5 w-full sm:w-auto flex justify-start">
                <button
                  onClick={onBookClick}
                  className="w-full sm:w-auto bg-[#FBF2E9] hover:bg-[#F2E5D7] text-[#372426] font-bricolage text-xs sm:text-sm font-extrabold tracking-wider uppercase px-7 sm:px-10 py-3.5 sm:py-4.5 rounded-[1.2rem] sm:rounded-full shadow-none transition-colors duration-300 cursor-pointer flex items-center justify-center space-x-2 group"
                >
                  <span className="roll-text-wrapper">
                    <span className="roll-text" data-text="BOOK A CONSULTATION">
                      BOOK A CONSULTATION
                    </span>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
