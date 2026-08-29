import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ConsultationOption } from '../types';
import { CONSULTATIONS } from '../data/content';

interface BookConsultationSectionProps {
  onOpenBook?: (consultation?: ConsultationOption) => void;
}

export const BookConsultationSection: React.FC<BookConsultationSectionProps> = ({ onOpenBook }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track cursor position for Nectar View Indicator
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll progress across section for Card 1 scaling under Card 2 on desktop
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Card 1 subtle scale-down and soft fade when Card 2 overlays on desktop
  const card1Scale = useTransform(scrollYProgress, [0.35, 0.75], [1, 0.94]);
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0.88]);

  const generalConsultation = CONSULTATIONS[0];
  const surgeryConsultation = CONSULTATIONS[1];

  const transitionEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section ref={sectionRef} className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20">
      {/* Nectar View Indicator Custom Floating Cursor - Blooming Scale & Line-Drawn Arrow */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{
          scale: cursorActive ? 1 : 0.2,
          opacity: cursorActive ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="fixed top-0 left-0 z-[400] pointer-events-none flex items-center justify-center rounded-full bg-[#372426] text-[#EFE1D4] shadow-2xl"
        style={{
          width: '84px',
          height: '84px',
          x: cursorPos.x - 42,
          y: cursorPos.y - 42,
        }}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: cursorActive ? 1 : 0,
              opacity: cursorActive ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: cursorActive ? 0.08 : 0,
            }}
          />
        </svg>
      </motion.div>

      {/* Section Title with Hero-Style Line Mask Reveal */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="font-gothic-compact text-5xl sm:text-7xl lg:text-[9.5rem] font-normal text-[#372426] tracking-[-0.02em] leading-none select-none">
          <span className="inline-block overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: transitionEase }}
              className="inline-block"
            >
              Book a Consultation
            </motion.span>
          </span>
        </h2>
      </div>

      {/* Cards Container:
          - Clean spacing across all screens (space-y-4 sm:space-y-5 lg:space-y-20)
          - On Desktop (>= lg): Card 1 is observed with increased distance before Card 2 slides over it
      */}
      <div className="max-w-2xl lg:max-w-3xl mx-auto flex flex-col space-y-4 sm:space-y-5 lg:space-y-20 relative z-10">
        {/* Card 1: General Consultation */}
        <motion.div
          style={isDesktop ? { scale: card1Scale, opacity: card1Opacity } : undefined}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: transitionEase }}
          className="bg-[#EDE2D7] rounded-[1.3rem] sm:rounded-[1.8rem] p-6 sm:p-8 lg:p-10 border border-[#DECBB8]/90 shadow-none relative z-10 lg:sticky lg:top-28 transition-colors"
        >
          {/* Card Title with Hero-Style Text Reveal & Title-Only Hover Target */}
          <div className="mb-6 sm:mb-10 inline-block">
            <h3
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              className="font-gothic-compact text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#372426] tracking-[-0.02em] leading-[1.0] cursor-pointer inline-block"
            >
              <span className="inline-block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: transitionEase }}
                  className="inline-block"
                >
                  Fitness &amp; Zumba Masterclass
                </motion.span>
              </span>
            </h3>
          </div>

          {/* Animated Divider 1 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-[1.5px] bg-[#372426]/35 origin-left mb-6 sm:mb-8"
          />

          {/* Card Details: Price & Features (Two-way / Two-column on all screens) */}
          <div className="grid grid-cols-12 gap-3 sm:gap-6 items-start my-4 sm:my-10">
            {/* Price Column */}
            <div className="col-span-5">
              <div className="font-gothic-compact text-4xl sm:text-7xl lg:text-[4.8rem] font-normal text-[#372426] tracking-[-0.02em] leading-[0.95] sm:leading-none flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span>150</span>
                <span className="text-2xl sm:text-5xl lg:text-[3.5rem]">USD</span>
              </div>
            </div>

            {/* Features List Column */}
            <div className="col-span-7 space-y-1.5 sm:space-y-2 text-xs sm:text-base lg:text-lg font-bricolage text-[#372426] font-semibold leading-relaxed">
              <p>1 Hour Consultation</p>
              <p>Zoom or Google Meet</p>
              <p>Optional: 4-week tailored workout schedule with guidance</p>
              <p>Optional: Nutritional habit tracking template with review</p>
            </div>
          </div>

          {/* Animated Divider 2 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="w-full h-[1.5px] bg-[#372426]/35 origin-left mb-6 sm:mb-8"
          />

          {/* CTA Button */}
          <button
            onClick={() => onOpenBook(generalConsultation)}
            className="w-full bg-[#372426] text-[#FBF2E9] rounded-full py-4 sm:py-5 text-center font-bold tracking-widest uppercase text-xs sm:text-sm shadow-none cursor-pointer flex items-center justify-center space-x-2 group"
          >
            <span className="roll-text-wrapper">
              <span className="roll-text" data-text="BOOK NOW">
                BOOK NOW
              </span>
            </span>
          </button>
        </motion.div>

        {/* Card 2: Corporate Wellness Activation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: transitionEase }}
          className="bg-[#DFCFC0] rounded-[1.3rem] sm:rounded-[1.8rem] p-6 sm:p-8 lg:p-10 border border-[#CEBCAE]/90 shadow-none relative z-[110] lg:sticky lg:top-28 hover:border-[#372426]/30 transition-colors"
        >
          {/* Card Title with Hero-Style Text Reveal & Title-Only Hover Target */}
          <div className="mb-6 sm:mb-10 inline-block">
            <h3
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              className="font-gothic-compact text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#372426] tracking-[-0.02em] leading-[1.0] cursor-pointer inline-block"
            >
              {['Corporate Wellness', 'Activation'].map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.12, ease: transitionEase }}
                    className="inline-block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h3>
          </div>

          {/* Animated Divider 1 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-[1.5px] bg-[#372426]/35 origin-left mb-6 sm:mb-8"
          />

          {/* Card Details: Price & Features (Two-way / Two-column on all screens) */}
          <div className="grid grid-cols-12 gap-3 sm:gap-6 items-start my-4 sm:my-10">
            {/* Price Column */}
            <div className="col-span-5">
              <div className="font-gothic-compact text-4xl sm:text-7xl lg:text-[4.8rem] font-normal text-[#372426] tracking-[-0.02em] leading-[0.95] sm:leading-none flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span>150</span>
                <span className="text-2xl sm:text-5xl lg:text-[3.5rem]">USD</span>
              </div>
            </div>

            {/* Features List Column */}
            <div className="col-span-7 space-y-1.5 sm:space-y-2 text-xs sm:text-base lg:text-lg font-bricolage text-[#372426] font-semibold leading-relaxed">
              <p>1 Hour Consultation</p>
              <p>Zoom or Google Meet</p>
              <p>Optional: Team energy assessment report with follow up</p>
              <p>Optional: Group physical habit challenge roadmap</p>
            </div>
          </div>

          {/* Animated Divider 2 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="w-full h-[1.5px] bg-[#372426]/35 origin-left mb-6 sm:mb-8"
          />

          {/* CTA Button */}
          <button
            onClick={() => onOpenBook(surgeryConsultation)}
            className="w-full bg-[#372426] text-[#FBF2E9] rounded-full py-4 sm:py-5 text-center font-bold tracking-widest uppercase text-xs sm:text-sm shadow-none cursor-pointer flex items-center justify-center space-x-2 group"
          >
            <span className="roll-text-wrapper">
              <span className="roll-text" data-text="BOOK NOW">
                BOOK NOW
              </span>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
