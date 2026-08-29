import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroCard } from './components/HeroCard';
import { StatementSection } from './components/StatementSection';
import { BookConsultationSection } from './components/BookConsultationSection';
import { OurAdvantagesSection } from './components/OurAdvantagesSection';
import { FaqSection } from './components/FaqSection';
import { FooterBanner } from './components/FooterBanner';
import { ActiveTab } from './types';
import { CONSULTATIONS } from './data/content';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Initialize Lenis smooth scroll engine for fluid, unhurried page motion
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#FBF2E9] text-[#372426] flex flex-col justify-between font-bricolage antialiased">
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        consultationsCount={CONSULTATIONS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-between">
        
        {/* Hero Section Card with Parallax Video Loop & Framing */}
        <HeroCard />

        {/* Section Directly Underneath Hero: #logofull & Statement Section with Stats */}
        <StatementSection />

        {/* Next Section: Book a Consultation with Negative Margin Overlap & Nectar Indicator */}
        <BookConsultationSection />

        {/* Our Advantages Section with Layered Stacking & Negative Margin Overlay */}
        <OurAdvantagesSection />

        {/* Popular Questions FAQ Section */}
        <FaqSection />

        {/* Complete Footer Section with Navigation, 5-Column Links, Divider Button & Banner */}
        <FooterBanner />

      </main>
    </div>
  );
}
