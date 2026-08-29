import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CONSULTATIONS } from '../data/content';

export const FooterBanner: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotateDegrees = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const smoothRotation = useSpring(rotateDegrees, { stiffness: 120, damping: 20 });

  return (
    <footer ref={sectionRef} className="w-full bg-[#FBF2E9] text-[#372426] pt-12 pb-8 px-4 sm:px-6 lg:px-12 select-none font-bricolage border-t border-[#E8D9C9]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 5 Columns Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-6 text-sm sm:text-base">
          {/* Column 1: Expertise */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-base sm:text-lg text-[#372426]">Expertise</h4>
            <ul className="space-y-2 text-[#372426]/80 font-normal">
              <li>
                <button
                  type="button"
                  className="hover:text-[#372426] transition-colors text-left cursor-pointer"
                >
                  Fitness &amp; Zumba Masterclass
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#372426] transition-colors text-left cursor-pointer"
                >
                  Corporate Wellness Activation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-base sm:text-lg text-[#372426]">Company</h4>
            <ul className="space-y-2 text-[#372426]/80 font-normal">
              <li>
                <button type="button" className="hover:text-[#372426] transition-colors cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-[#372426] transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-[#372426] transition-colors cursor-pointer">
                  Book &amp; Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-base sm:text-lg text-[#372426]">Social</h4>
            <ul className="space-y-2 text-[#372426]/80 font-normal">
              <li>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} className="hover:text-[#372426] transition-colors">
                  Linkedin
                </a>
              </li>
              <li>
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="hover:text-[#372426] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#facebook" onClick={(e) => e.preventDefault()} className="hover:text-[#372426] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#youtube" onClick={(e) => e.preventDefault()} className="hover:text-[#372426] transition-colors">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-base sm:text-lg text-[#372426]">Legal</h4>
            <ul className="space-y-2 text-[#372426]/80 font-normal">
              <li>
                <button type="button" className="hover:text-[#372426] transition-colors cursor-pointer text-left">
                  Privacy Policy &amp; Legal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="font-extrabold text-base sm:text-lg text-[#372426]">Contact</h4>
            <ul className="space-y-2 text-[#372426]/80 font-normal">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#372426] transition-colors break-all"
                >
                  hello@sandraosaigbovo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line 2 with Centered "BOOK A CONSULTATION" Pill Button */}
        <div className="relative my-8 sm:my-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#372426]/30"></div>
          </div>
          <button
            type="button"
            className="relative z-10 bg-[#372426] text-[#FBF2E9] font-bricolage text-xs sm:text-sm font-extrabold uppercase px-8 py-3.5 rounded-full hover:bg-[#251819] transition-colors cursor-pointer tracking-wider shadow-sm group"
          >
            <span className="roll-text-wrapper">
              <span className="roll-text" data-text="BOOK A CONSULTATION">
                BOOK A CONSULTATION
              </span>
            </span>
          </button>
        </div>

        {/* Massive Sandra * Osaigbovo Title in display typography */}
        <div className="w-full flex justify-center items-center py-4">
          <div className="font-bricolage text-[9vw] sm:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] font-black text-[#372426] leading-none tracking-tight flex items-center justify-center whitespace-nowrap opacity-95">
            <span>Sandra</span>
            
            {/* Cloudinary Emblem PNG Image with Scroll-driven Rotation */}
            <motion.div
              style={{ rotate: smoothRotation }}
              className="w-[0.80em] h-[0.80em] mx-[0.08em] inline-flex items-center justify-center shrink-0"
            >
              <img
                src="https://res.cloudinary.com/divndlntm/image/upload/v1785459681/ChatGPT_Image_Jul_31_2026_02_00_32_AM_mv7bbr.png"
                alt="Sandra Osaigbovo emblem"
                className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
              />
            </motion.div>
            
            <span>Osaigbovo</span>
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="pt-8 pb-4 text-center max-w-4xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm text-[#372426]/75 leading-relaxed font-normal">
            Sandra Osaigbovo consultations are educational and lifestyle-focused. They are not a substitute for medical advice, diagnosis, or treatment. For health-related decisions, please consult your healthcare provider.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 text-xs font-semibold text-[#372426]/80 border-t border-[#372426]/15">
            <span>&copy; 2026 Sandra Osaigbovo™. All Rights Reserved. Any unauthorized use is expressly prohibited.</span>
            <span>Made in ARCR</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

