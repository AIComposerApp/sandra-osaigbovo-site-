import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: 'What is Sandra Osaigbovo Health & Wellness Consultancy?',
    answer:
      'Sandra Osaigbovo Health & Wellness Consultancy is a specialized practice focusing on functional strength, movement coaching, and sustainable lifestyle habit formation for women seeking long-term physical confidence and mobility.',
  },
  {
    id: 2,
    question: 'How does movement coaching differ from traditional personal training?',
    answer:
      'Movement coaching goes beyond workout reps by integrating functional strength, mobility work, habit architecture, and energy management tailored to your daily life demands.',
  },
  {
    id: 3,
    question: 'Can Sandra Osaigbovo help if I am recovering from an injury or stiffness?',
    answer:
      'Yes. Coaching programs emphasize safe movement patterns, mobility restoration, and progressive functional strength tailored to your body’s current state.',
  },
  {
    id: 4,
    question: 'What happens during a 1-Hour Consultation?',
    answer:
      'During the 1-hour session via Zoom or Google Meet, we evaluate your movement history, lifestyle challenges, physical goals, and outline a realistic action roadmap.',
  },
  {
    id: 5,
    question: 'Are sessions available online or in-person?',
    answer:
      'Consultations and 1-on-1 coaching sessions are conducted virtually via Google Meet or Zoom, making them accessible wherever you are located.',
  },
  {
    id: 6,
    question: 'How do I prepare for my initial consultation?',
    answer:
      'Simply come with an open mind, details regarding your current activity routine, physical challenges, and any specific goals or questions you wish to address.',
  },
  {
    id: 7,
    question: 'What is the Zumba & Fitness Masterclass?',
    answer:
      'A high-energy, fun, and inclusive group or individual movement session designed to boost cardio endurance, coordination, and mood while celebrating functional movement.',
  },
  {
    id: 8,
    question: 'How do I book a consultation session with Sandra Osaigbovo?',
    answer:
      'Click any "Book a Consultation" or "Book Now" button on the website to select your preferred date, time slot, and consultation type.',
  },
];

export const FaqSection: React.FC = () => {
  // Question #1 open by default
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const transitionEase = [0.16, 1, 0.3, 1];

  return (
    <section className="relative z-10 w-full bg-[#FBF2E9] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 select-none font-bricolage overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Title: Popular Questions */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="font-gothic-compact text-6xl sm:text-8xl lg:text-[9.5rem] font-normal text-[#372426] tracking-[-0.02em] leading-none">
            <span className="inline-block overflow-hidden pb-2 sm:pb-4">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: transitionEase }}
                className="inline-block"
              >
                Popular Questions
              </motion.span>
            </span>
          </h2>
        </div>

        {/* 8 Accordion FAQs */}
        <div className="space-y-4 sm:space-y-5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`transition-all duration-300 rounded-[1.2rem] sm:rounded-[1.5rem] ${
                  isOpen
                    ? 'bg-[#EFE1D4] border border-[#DECBB8] p-6 sm:p-8'
                    : 'bg-transparent border-b border-[#DECBB8]/80 px-4 sm:px-6 py-6 sm:py-7'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-gothic-compact text-2xl sm:text-3xl lg:text-[2.2rem] font-medium text-[#372426] leading-tight tracking-[-0.01em]">
                    {faq.question}
                  </span>

                  <span className="shrink-0 text-[#372426] transition-transform duration-300 transform">
                    {isOpen ? (
                      <Minus className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 rotate-180" />
                    ) : (
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </span>
                </button>

                {/* Accordion Expandable Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: transitionEase }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 sm:pt-6 text-sm sm:text-base lg:text-lg text-[#372426] font-semibold leading-relaxed max-w-4xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
