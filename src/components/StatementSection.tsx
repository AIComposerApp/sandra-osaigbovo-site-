import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { WhenWeCanHelpTicker } from './WhenWeCanHelpTicker';

interface StatementSectionProps {
  onOpenAbout?: () => void;
  onOpenBook?: () => void;
}

// Subcomponent for serene, continuous scroll-driven word reveal on desktop
interface SereneWordProps {
  text: string;
  italic?: boolean;
  underline?: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const SereneWord: React.FC<SereneWordProps> = ({
  text,
  italic,
  underline,
  index,
  total,
  progress,
}) => {
  const rangeWidth = 0.5;
  const start = (index / total) * (1 - rangeWidth);
  const end = start + rangeWidth;

  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const blurValue = useTransform(progress, [start, end], [8, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
      }}
      className={`inline-block transition-opacity duration-150 ${
        italic
          ? 'text-[#372426] italic font-instrument font-normal text-4xl sm:text-6xl lg:text-[4rem] xl:text-[4.6rem] px-2'
          : underline
          ? 'text-[#372426]/90 underline decoration-[#E2D3C3] decoration-2 underline-offset-4'
          : 'text-[#372426]'
      }`}
    >
      {text}
    </motion.span>
  );
};

export const StatementSection: React.FC<StatementSectionProps> = ({
  onOpenAbout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statementTextRef = useRef<HTMLDivElement>(null);
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  // 1. Seamless emblem rotation driven directly by scroll
  const { scrollYProgress: containerScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateDegrees = useTransform(containerScrollProgress, [0, 1], [0, 450]);
  const smoothRotation = useSpring(rotateDegrees, { stiffness: 120, damping: 20 });

  // 2. Continuous scroll progress for statement text on desktop
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: statementTextRef,
    offset: ['start 85%', 'center 35%'],
  });

  // 3. Desktop middle card scroll-driven translation (slides UP smoothly underneath text)
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: desktopSectionRef,
    offset: ['start end', 'end start'],
  });

  // Smoother mouse wheel inertia physics on desktop
  const rawMiddleY = useTransform(desktopScrollProgress, [0.08, 0.78], [150, -130]);
  const smoothMiddleY = useSpring(rawMiddleY, {
    stiffness: 30,
    damping: 24,
    mass: 1.1,
  });

  // 4. Subtle scroll-driven Y motion for mobile & tablet card
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileCardRef,
    offset: ['start end', 'end start'],
  });
  const rawMobileY = useTransform(mobileScrollProgress, [0, 1], [18, -18]);
  const smoothMobileY = useSpring(rawMobileY, {
    stiffness: 40,
    damping: 22,
  });

  // Statement lines structured strictly to match requested line breakdown pattern
  const statementLines = [
    [
      { text: 'Sandra' },
      { text: 'Osaigbovo' },
      { text: 'supports' },
      { text: 'women' },
    ],
    [
      { text: 'navigating' },
      { text: 'physical' },
      { text: 'stagnation,', underline: true },
    ],
    [
      { text: 'low' },
      { text: 'energy,' },
      { text: 'and' },
      { text: 'mobility' },
      { text: 'challenges,' },
    ],
    [
      { text: 'alongside' },
      { text: 'internal struggles', italic: true },
    ],
    [
      { text: 'like' },
      { text: 'fading' },
      { text: 'consistency' },
      { text: 'or' },
    ],
    [
      { text: 'self-image' },
      { text: 'concerns.' },
    ],
  ];

  const totalWordsCount = statementLines.reduce((acc, line) => acc + line.length, 0);

  return (
    <section
      id="logofull"
      ref={containerRef}
      className="w-full relative pt-2 sm:pt-4 pb-8 sm:pb-16 select-none font-bricolage overflow-x-hidden"
    >
      {/* 1. Brand Logo Reveal (#logofull) - Visible ONLY on desktop (lg:), edge-to-edge max-w-none */}
      <div className="hidden lg:flex w-full justify-center items-center pt-2 pb-6 mb-6 px-4">
        <div className="font-bricolage text-[10.8vw] font-black text-[#372426] leading-none tracking-tight flex items-center justify-center whitespace-nowrap border-none outline-none shadow-none w-full">
          <span>Sandra</span>

          {/* Seamless rotating Cloudinary emblem */}
          <motion.div
            style={{ rotate: smoothRotation }}
            className="w-[0.80em] h-[0.80em] mx-[0.06em] inline-flex items-center justify-center shrink-0"
          >
            <img
              src="https://res.cloudinary.com/divndlntm/image/upload/v1785459681/ChatGPT_Image_Jul_31_2026_02_00_32_AM_mv7bbr.png"
              alt="Sandra Osaigbovo emblem"
              className="w-full h-full object-contain pointer-events-none drop-shadow-none"
            />
          </motion.div>

          <span>Osaigbovo</span>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10">

        {/* ======================================================== */}
        {/* MOBILE & TABLET VIEW (< lg): Stacked Cards with subtle scroll motion */}
        {/* ======================================================== */}
        <div ref={mobileCardRef} className="block lg:hidden my-2 px-1 space-y-4">
          
          {/* Top Big Statement Card with subtle motion */}
          <motion.div
            style={{ y: smoothMobileY }}
            className="middle-card-shine bg-[#EBDCCB] rounded-[1.3rem] sm:rounded-[1.8rem] p-6 sm:p-10 flex flex-col justify-between border border-[#DECBB8]/80 shadow-none w-full max-w-2xl mx-auto"
          >
            {/* Statement text inside the mobile/tablet card */}
            <div className="text-center mb-6">
              <h2 className="font-gothic-compact text-3xl sm:text-5xl font-normal text-[#372426] leading-[1.08] tracking-[-0.02em]">
                Sandra Osaigbovo supports women<br />
                navigating physical stagnation,<br />
                low energy, and mobility challenges,<br />
                alongside internal struggles<br />
                like fading consistency or<br />
                self-image concerns.
              </h2>
            </div>

            {/* Educational description text */}
            <div className="text-center mb-8 px-1">
              <p className="font-bricolage text-xs sm:text-base text-[#372426]/80 font-normal leading-relaxed">
                Our movement-informed coaching helps you understand your body’s unique power, manage lifestyle changes through realistic habits like strength training and nutrition, and build resilience to navigate your fitness journey with confidence.
              </p>
            </div>

            {/* Full-width action button at bottom of card */}
            <button
              onClick={onOpenAbout}
              className="w-full bg-[#372426] text-[#FBF2E9] font-bricolage text-xs sm:text-sm font-extrabold uppercase py-4 px-6 rounded-full shadow-none cursor-pointer group"
            >
              <span className="roll-text-wrapper">
                <span className="roll-text" data-text="MORE ABOUT SANDRA OSAIGBOVO">
                  MORE ABOUT SANDRA OSAIGBOVO
                </span>
              </span>
            </button>
          </motion.div>

          {/* Two Stat Cards Side-by-Side directly underneath with top & bottom lines */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Left Stat Card: 95% */}
            <div className="bg-[#F2E5D7] rounded-[1.3rem] sm:rounded-[1.8rem] p-5 sm:p-8 flex flex-col justify-between border border-[#E5D5C5]/80 shadow-none min-h-[190px] sm:min-h-[230px]">
              <div>
                {/* Line above 95% */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mb-3 sm:mb-5" />
                <h4 className="font-gothic-compact text-5xl sm:text-7xl font-normal text-[#372426] tracking-[-0.02em]">
                  95%
                </h4>
                {/* Line underneath 95% before text */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mt-3 sm:mt-5 mb-3 sm:mb-4" />
              </div>
              <div>
                <p className="font-bricolage text-sm sm:text-base font-bold text-[#372426] leading-tight">
                  Clients reported Improved Mobility
                </p>
              </div>
            </div>

            {/* Right Stat Card: 450+ */}
            <div className="bg-[#F2E5D7] rounded-[1.3rem] sm:rounded-[1.8rem] p-5 sm:p-8 flex flex-col justify-between border border-[#E5D5C5]/80 shadow-none min-h-[190px] sm:min-h-[230px]">
              <div>
                {/* Line above 450+ */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mb-3 sm:mb-5" />
                <h4 className="font-gothic-compact text-5xl sm:text-7xl font-normal text-[#372426] tracking-[-0.02em]">
                  450+
                </h4>
                {/* Line underneath 450+ before text */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mt-3 sm:mt-5 mb-3 sm:mb-4" />
              </div>
              <div>
                <p className="font-bricolage text-sm sm:text-base font-bold text-[#372426] leading-tight">
                  Happy &amp; Thriving Clients
                </p>
              </div>
            </div>
          </div>

        </div>


        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= lg): Statement text on top, middle card scroll-driven UP animation */}
        {/* ======================================================== */}
        <div ref={desktopSectionRef} className="hidden lg:block relative pt-4">
          
          {/* Serene, Continuous Word-by-Word Scroll Reveal Statement Animation */}
          <div ref={statementTextRef} className="relative z-20 max-w-4xl mx-auto text-center px-2 py-6 sm:py-12 pointer-events-none">
            <h2 className="font-gothic-compact text-4xl sm:text-6xl lg:text-[3.8rem] xl:text-[4.4rem] font-normal text-[#372426] leading-[1.05] tracking-[-0.02em] max-w-4xl mx-auto space-y-1 sm:space-y-2">
              {(() => {
                let currentWordIndex = 0;
                return statementLines.map((line, lineIdx) => (
                  <div key={lineIdx} className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                    {line.map((wordObj, wIdx) => {
                      const idx = currentWordIndex++;
                      return (
                        <SereneWord
                          key={wIdx}
                          text={wordObj.text}
                          italic={wordObj.italic}
                          underline={wordObj.underline}
                          index={idx}
                          total={totalWordsCount}
                          progress={textScrollProgress}
                        />
                      );
                    })}
                  </div>
                ));
              })()}
            </h2>
          </div>

          {/* 3 Stats Cards Grid on Desktop */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8 items-end pt-2 w-full relative z-10">
            
            {/* Left Stat Card: 95% (Pinned/Stationary) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full bg-[#F2E5D7] rounded-xl lg:rounded-[1rem] p-8 sm:p-10 flex flex-col justify-between border border-[#E5D5C5]/80 shadow-none min-h-[380px] lg:min-h-[420px]"
            >
              <div>
                {/* Line above 95% */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mb-6" />
                <h4 className="font-gothic-compact text-7xl lg:text-8xl font-normal text-[#372426] tracking-[-0.02em]">
                  95%
                </h4>
                {/* Line underneath 95% before text */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mt-6 mb-5" />
              </div>
              <div>
                <p className="font-bricolage text-lg lg:text-xl font-bold text-[#372426] leading-tight">
                  Clients reported Improved Mobility
                </p>
              </div>
            </motion.div>

            {/* Center Card: Elongated vertically, sliding UP underneath statement text on scroll */}
            <motion.div
              style={{ y: smoothMiddleY }}
              className="w-full middle-card-shine bg-[#EBDCCB] rounded-xl lg:rounded-[1rem] p-8 sm:p-10 flex flex-col justify-between items-center text-center border border-[#DECBB8]/80 shadow-none min-h-[620px] lg:min-h-[680px] -mt-36"
            >
              {/* Spacer so the top stays clean while statement text floats above */}
              <div className="flex-1" />

              {/* Smaller text positioned close to the button at the bottom */}
              <div className="space-y-4 max-w-sm mb-6 pt-12">
                <p className="font-bricolage text-sm lg:text-base text-[#372426]/80 font-normal leading-relaxed">
                  Our movement-informed coaching helps you understand your body’s unique power, manage lifestyle changes through realistic habits like strength training and nutrition, and build resilience to navigate your fitness journey with confidence.
                </p>
              </div>

              <div className="w-full">
                <button
                  onClick={onOpenAbout}
                  className="w-full bg-[#372426] text-[#FBF2E9] font-bricolage text-xs sm:text-sm font-extrabold uppercase px-6 py-4 rounded-full shadow-none cursor-pointer group"
                >
                  <span className="roll-text-wrapper">
                    <span className="roll-text" data-text="MORE ABOUT SANDRA OSAIGBOVO">
                      MORE ABOUT SANDRA OSAIGBOVO
                    </span>
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Right Stat Card: 450+ (Pinned/Stationary) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full bg-[#F2E5D7] rounded-xl lg:rounded-[1rem] p-8 sm:p-10 flex flex-col justify-between border border-[#E5D5C5]/80 shadow-none min-h-[380px] lg:min-h-[420px]"
            >
              <div>
                {/* Line above 450+ */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mb-6" />
                <h4 className="font-gothic-compact text-7xl lg:text-8xl font-normal text-[#372426] tracking-[-0.02em]">
                  450+
                </h4>
                {/* Line underneath 450+ before text */}
                <div className="w-full h-[1.5px] bg-[#372426]/35 mt-6 mb-5" />
              </div>
              <div>
                <p className="font-bricolage text-lg lg:text-xl font-bold text-[#372426] leading-tight">
                  Happy &amp; Thriving Clients
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 4. Next Section Banner Title ("When we can help") with Full-Width Ticker Carousel */}
      <div className="pt-12 sm:pt-20 pb-4 w-full">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10 text-center">
          <h2 className="font-gothic-compact text-4xl sm:text-7xl lg:text-[9.5rem] font-normal text-[#372426] tracking-[-0.02em] leading-none mb-4 sm:mb-8">
            When we can help
          </h2>
        </div>
        
        {/* Edge-to-Edge Ticker going completely off-screen on desktop & all screen sizes */}
        <div className="w-full overflow-hidden">
          <WhenWeCanHelpTicker />
        </div>
      </div>
    </section>
  );
};
