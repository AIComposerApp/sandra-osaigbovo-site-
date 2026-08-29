import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  consultationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  consultationsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopNavItems: { id: ActiveTab; label: string; badge?: number; isAction?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'consultations', label: 'Consultations', badge: consultationsCount },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Book & Contact', isAction: true },
  ];

  const mobileNavItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'about' as const, label: 'About' },
    { id: 'consultations' as const, label: 'General Consultations', badge: consultationsCount },
    { id: 'contact' as const, label: 'Contact' },
    { id: 'book_action' as const, label: 'Book & Consultation', isAction: true },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id as ActiveTab);
    setMobileMenuOpen(false);
  };

  const handleMobileClick = (item: typeof mobileNavItems[number]) => {
    setActiveTab(item.id as ActiveTab);
    setMobileMenuOpen(false);
  };

  // Custom bezier curve from specification: cubic-bezier(0.2, 0.75, 0.5, 1)
  const menuEase = [0.2, 0.75, 0.5, 1.0];

  const socialLinks = ['Facebook', 'Instagram', 'Youtube', 'LinkedIn'];

  return (
    <header id="top" className="sticky top-0 z-40 bg-[#FBF2E9] transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[68px] flex items-center justify-between">
        
        {/* Brand Logo with exact dark plum #372426 & emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center text-left focus:outline-none cursor-pointer z-50"
        >
          <span className="font-bricolage text-2xl sm:text-3xl font-extrabold tracking-tight text-[#372426] group-hover:opacity-85 transition-opacity flex items-center">
            Sandra
            <img
              src="https://res.cloudinary.com/divndlntm/image/upload/v1785459681/ChatGPT_Image_Jul_31_2026_02_00_32_AM_mv7bbr.png"
              alt="Sandra Osaigbovo Emblem"
              className="w-7 h-7 sm:w-9 sm:h-9 mx-2 object-contain inline-block group-hover:rotate-12 transition-transform duration-300 shrink-0"
            />
            Osaigbovo
          </span>
        </button>

        {/* Desktop Navigation (lg:flex) with exact typography specs */}
        <nav className="hidden lg:flex items-center space-x-8 lg:space-x-10 text-[20px] font-bricolage font-normal tracking-[-0.2px] normal-case text-[#372426]">
          {desktopNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 focus:outline-none flex items-center space-x-1.5 cursor-pointer group ${
                  isActive
                    ? 'text-[#372426] font-semibold'
                    : 'text-[#372426]/80 hover:text-[#372426]'
                }`}
              >
                <span className="roll-text-wrapper">
                  <span className="roll-text" data-text={item.label}>
                    {item.label}
                  </span>
                </span>
                {item.badge !== undefined && (
                  <span className="text-sm font-medium opacity-80">
                    ({item.badge})
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile & Tablet Coordinated Morphing Toggle Button (lg:hidden) */}
        <div className="lg:hidden flex items-center relative z-[60]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`morph-toggle-btn ${mobileMenuOpen ? 'is-open' : ''}`}
            aria-label="Toggle Navigation Menu"
            title="Toggle Navigation Menu"
          >
            {/* The Hamburger (.lines-button) consisting of three horizontal bars */}
            <div className="lines-button">
              <span />
              <span />
              <span />
            </div>

            {/* The Close Icon (.close-wrap) consisting of two diagonal bars (.close-line1 and .close-line2) */}
            <div className="close-wrap">
              <span className="close-line1" />
              <span className="close-line2" />
            </div>
          </button>
        </div>
      </div>

      {/* Off-Canvas Full-Width Overlay Menu (#slide-out-widget-area) on Mobile & Tablet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Full Screen Instant Container (width: 100% full screen) */}
            <div
              id="slide-out-widget-area"
              className="open fixed inset-0 z-50 w-full h-full min-h-screen lg:hidden font-bricolage pointer-events-auto"
            >
              {/* Background Element (#slide-out-widget-area-bg) handling the 0.55s opacity fade-in reveal */}
              <motion.div
                id="slide-out-widget-area-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute inset-0 bg-[#FBF2E9] shadow-2xl"
              />

              {/* Panel Content Wrapper positioned higher up for airy layout */}
              <div className="relative z-10 h-full max-w-4xl mx-0 px-6 sm:px-12 md:px-16 pt-20 sm:pt-24 pb-10 flex flex-col justify-start space-y-8 overflow-y-auto">
                
                {/* Main Menu Links — Bolder font weight, positioned higher up */}
                <div className="mt-2">
                  <ul className="menu space-y-4 sm:space-y-6 flex flex-col items-start">
                    {mobileNavItems.map((item, index) => {
                      const isActive = activeTab === item.id;
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 35 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15, transition: { duration: 0.2, delay: 0.05 } }}
                          transition={{
                            y: { duration: 0.85, ease: menuEase, delay: 0.18 + index * 0.07 },
                            opacity: { duration: 0.5, ease: 'linear', delay: 0.18 + index * 0.07 },
                          }}
                          className="w-full"
                        >
                          <button
                            onClick={() => handleMobileClick(item)}
                            className="text-left py-1 text-[28px] sm:text-[38px] leading-[1.15] font-semibold tracking-[-0.6px] text-[#372426] flex items-center space-x-3.5 transition-opacity duration-370 hover:opacity-85 normal-case cursor-pointer group"
                          >
                            <span className={`menu-underline-link whitespace-nowrap ${isActive ? 'is-active' : ''}`}>
                              <span className="roll-text-wrapper">
                                <span className="roll-text" data-text={item.label}>
                                  {item.label}
                                </span>
                              </span>
                            </span>
                            {item.badge !== undefined && (
                              <span className="text-sm sm:text-base bg-[#E8D9C9] text-[#372426] px-3 py-0.5 rounded-full font-medium shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Vertical smaller social media links underneath with lower visibility */}
                <div className="pt-4 flex flex-col space-y-3 items-start text-sm sm:text-base font-normal text-[#372426]/60">
                  {socialLinks.map((social, sIdx) => (
                    <motion.a
                      key={social}
                      href={`#${social.toLowerCase()}`}
                      onClick={(e) => e.preventDefault()}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + sIdx * 0.05 }}
                      className="cursor-pointer group hover:text-[#372426] transition-colors"
                    >
                      <span className="menu-underline-link text-[#372426]/70 group-hover:text-[#372426]">
                        {social}
                      </span>
                    </motion.a>
                  ))}
                </div>

              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
