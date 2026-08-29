import React from 'react';
import { motion } from 'motion/react';

interface OurAdvantagesSectionProps {
  onOpenBook?: () => void;
}

// Custom line-art icons matching the exact aesthetic in the screenshot
const EducationalIcon = () => (
  <svg className="w-8 h-8 text-[#372426]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 12 C16 18, 14 24, 20 28 C26 24, 24 18, 20 12 Z" />
    <path d="M14 22 C18 20, 22 20, 26 22" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

const PersonalizedIcon = () => (
  <svg className="w-8 h-8 text-[#372426]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 12 C11 18, 11 26, 15 30 C19 26, 19 18, 15 12 Z" />
    <path d="M25 12 C21 18, 21 26, 25 30 C29 26, 29 18, 25 12 Z" />
  </svg>
);

const HolisticIcon = () => (
  <svg className="w-8 h-8 text-[#372426]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="20" cy="20" rx="10" ry="14" />
    <path d="M20 10 L20 30" />
    <path d="M14 18 C17 16, 23 16, 26 18" />
  </svg>
);

const SpecializedIcon = () => (
  <svg className="w-8 h-8 text-[#372426]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 10 C16 16, 14 22, 20 28 C26 22, 24 16, 20 10 Z" />
    <path d="M12 22 C18 20, 22 26, 20 28" />
    <path d="M28 22 C22 20, 18 26, 20 28" />
  </svg>
);

const StepByStepIcon = () => (
  <svg className="w-8 h-8 text-[#372426]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="20,8 28,12 32,20 28,28 20,32 12,28 8,20 12,12" />
    <circle cx="20" cy="20" r="4" />
  </svg>
);

export const OurAdvantagesSection: React.FC<OurAdvantagesSectionProps> = ({ onOpenBook }) => {
  const transitionEase = [0.16, 1, 0.3, 1];

  const allCards = [
    {
      title: 'Holistic Strength Frameworks',
      desc: 'Tailored movement plans, energy-aligned habit tracking, and progress coaching designed specifically for women.',
      icon: <HolisticIcon />,
    },
    {
      title: 'Habit & Movement Integrations',
      desc: 'Evidence-backed strength routines, realistic nutritional structure, and physical mobility routines built for daily life.',
      icon: <EducationalIcon />,
    },
    {
      title: 'Personalized Consistency Support',
      desc: '1-on-1 accountability, continuous habit adjustments, and compassionate guidance to navigate life changes with confidence.',
      icon: <PersonalizedIcon />,
    },
    {
      isCta: true,
    },
  ];

  return (
    <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[98vw] mx-auto px-3 sm:px-6 lg:px-4 py-6 sm:py-10 lg:py-16 select-none">
      
      {/* Canvas Background Container: Holds Header at top + Cards grid below in normal flow */}
      <div className="relative w-full rounded-[1.3rem] sm:rounded-[1.8rem] lg:rounded-[2rem] overflow-hidden bg-[#D8C7B7] p-4 sm:p-8 lg:p-12 border border-[#C2B1A1]/60 shadow-none">
        
        {/* Subtle Warm Background Image */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600"
            alt="Wellness texture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top-Aligned "Our Advantages" Header with Line Mask Reveal */}
        <div className="relative z-10 text-center pt-2 sm:pt-3 lg:pt-4 mb-6 sm:mb-10 lg:mb-14">
          <h2 className="font-gothic-compact text-4xl sm:text-7xl lg:text-[9.5rem] font-normal text-[#FBF2E9] tracking-[-0.02em] leading-none drop-shadow-sm select-none">
            <span className="inline-block overflow-hidden pb-1 sm:pb-3">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: transitionEase }}
                className="inline-block"
              >
                Our Advantages
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Cards Grid: Placed below header with comfortable space, Low - High - Low stagger */}
        <div className="relative z-10 max-w-[1360px] mx-auto [perspective:800px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            
            {allCards.map((card, idx) => {
              // Low - High - Low Stagger Pattern on Desktop:
              // Column 0 (Idx 0, 3): Lower -> lg:pt-12
              // Column 1 (Idx 1, 4): Higher -> lg:pt-0
              // Column 2 (Idx 2, 5): Lower -> lg:pt-12
              const colIndex = idx % 3;
              const zigzagClass = colIndex === 1 ? 'lg:pt-0' : 'lg:pt-12';

              return (
                <div key={idx} className={`w-full ${zigzagClass}`}>
                  <motion.div
                    initial={{ opacity: 0, rotateX: -65, y: 30 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 1.0,
                      delay: idx * 0.12,
                      ease: transitionEase,
                    }}
                    style={{
                      transformOrigin: 'center center',
                      transformStyle: 'preserve-3d',
                    }}
                    className="bg-[#EFE1D4] rounded-[1.2rem] sm:rounded-[1.6rem] p-5 sm:p-7 lg:p-8 flex flex-col justify-between border border-[#DECBB8]/80 shadow-none hover:border-[#372426]/30 transition-colors h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] transform-gpu"
                  >
                    {card.isCta ? (
                      <div className="flex flex-col justify-center items-center h-full w-full py-4">
                        <button
                          onClick={onOpenBook}
                          className="bg-[#372426] text-[#FBF2E9] font-bricolage text-xs sm:text-sm font-extrabold tracking-wider uppercase px-8 sm:px-10 py-4.5 rounded-full shadow-none cursor-pointer flex items-center justify-center space-x-2 group w-full sm:w-auto"
                        >
                          <span className="roll-text-wrapper">
                            <span className="roll-text" data-text="BOOK A CONSULTATION">
                              BOOK A CONSULTATION
                            </span>
                          </span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Card Header: Title & SVG Icon in Oval Badge */}
                        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                          <h3 className="font-gothic-compact text-2xl sm:text-3xl lg:text-[2.8rem] font-normal text-[#372426] leading-[1.05] tracking-[-0.02em]">
                            {card.title}
                          </h3>
                          
                          <div className="w-11 h-14 sm:w-13 sm:h-16 rounded-full border border-[#372426]/20 flex items-center justify-center shrink-0 bg-[#EFE1D4]">
                            {card.icon}
                          </div>
                        </div>

                        {/* Card Description */}
                        <p className="font-bricolage text-sm sm:text-base lg:text-lg text-[#372426] font-semibold leading-relaxed max-w-xs">
                          {card.desc}
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>

      </div>

    </section>
  );
};
