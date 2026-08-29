import React, { useRef, useState, useEffect } from 'react';

type CardItem =
  | { type: 'text'; id: string; title: string; challengeNum?: string }
  | { type: 'image'; id: string; src: string; alt: string; challengeNum?: string };

const ROW_1_ITEMS: CardItem[] = [
  {
    type: 'text',
    id: 'r1-1',
    title: 'Fading Routine &\nLow Energy',
  },
  {
    type: 'image',
    id: 'r1-2',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    alt: 'Energy & movement',
  },
  {
    type: 'text',
    id: 'r1-3',
    title: 'Stiffness &\nMobility Issues',
  },
  {
    type: 'image',
    id: 'r1-4',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    alt: 'Mobility & stretching',
  },
];

const ROW_2_ITEMS: CardItem[] = [
  {
    type: 'image',
    id: 'r2-1',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    alt: 'Consistency & strength',
  },
  {
    type: 'text',
    id: 'r2-2',
    title: 'Accountability &\nConsistency Challenges',
  },
  {
    type: 'image',
    id: 'r2-3',
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    alt: 'Physical transition',
  },
  {
    type: 'text',
    id: 'r2-4',
    title: 'Post-Injury or\nAging Physical\nTransitions',
  },
];

interface SingleTickerRowProps {
  items: CardItem[];
  direction: 1 | -1; // 1 = right, -1 = left
  initialOffset?: number;
}

const SingleTickerRow: React.FC<SingleTickerRowProps> = ({ items, direction, initialOffset = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef<number>(initialOffset);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);

  // Repeat items 4 times for smooth continuous infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.75; // pixels per frame

    const animate = (currentTime: number) => {
      const delta = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      // Item width calculations based on window screen size
      let itemWidth = 432; // desktop: 420px + 12px gap
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          itemWidth = 222; // mobile: 210px + 12px gap
        } else if (window.innerWidth < 1024) {
          itemWidth = 332; // tablet: 320px + 12px gap
        }
      }

      const singleSetWidth = items.length * itemWidth;

      // Auto-scroll runs continuously unless held/dragged
      if (!isDraggingRef.current) {
        offsetRef.current += direction * speed * (delta / 16.6);
      }

      // Wrap around bounds for infinite loop
      if (direction === -1) {
        if (offsetRef.current <= -singleSetWidth) {
          offsetRef.current += singleSetWidth;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= singleSetWidth;
        }
      } else {
        if (offsetRef.current >= 0) {
          offsetRef.current -= singleSetWidth;
        } else if (offsetRef.current < -singleSetWidth * 2) {
          offsetRef.current += singleSetWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [items.length, direction]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsPointerDown(true);
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    offsetRef.current = startOffsetRef.current + deltaX;
  };

  const handlePointerUpOrLeave = (e?: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsPointerDown(false);

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (e && e.pointerType === 'touch'));

    if (isMobile) {
      // On mobile: immediately resume smooth scrolling when touch is released
      isDraggingRef.current = false;
    } else {
      // On desktop: wait 3 seconds (3000ms) after hold/release before continuing auto-scroll
      resumeTimeoutRef.current = setTimeout(() => {
        isDraggingRef.current = false;
      }, 3000);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(e) => handlePointerUpOrLeave(e)}
      onPointerCancel={(e) => handlePointerUpOrLeave(e)}
      onMouseLeave={(e) => handlePointerUpOrLeave(e as unknown as React.PointerEvent)}
      className={`relative w-full cursor-grab ${isPointerDown ? 'cursor-grabbing' : ''} touch-pan-y overflow-hidden select-none py-1.5`}
    >
      <div
        ref={trackRef}
        className="flex space-x-3 transition-none will-change-transform items-center"
        style={{ transform: `translate3d(${initialOffset}px, 0, 0)` }}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-[210px] h-[210px] sm:w-[320px] sm:h-[260px] lg:w-[420px] lg:h-[280px] shrink-0 rounded-[1.3rem] sm:rounded-[1.8rem] overflow-hidden flex flex-col justify-center items-center p-4 sm:p-8 relative shadow-none border border-black/5"
            style={{
              backgroundColor: item.type === 'text' ? '#EDE2D7' : 'transparent',
            }}
          >
            {item.type === 'text' ? (
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-2">
                <h3 className="font-gothic-compact text-[1.4rem] sm:text-3xl lg:text-[2.6rem] font-normal text-[#372426] leading-[1.0] tracking-[-0.02em] whitespace-pre-line">
                  {item.title}
                </h3>
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WhenWeCanHelpTicker: React.FC = () => {
  return (
    /* Full screen width edge-to-edge container that goes out the screen without padding clipping */
    <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col space-y-3 sm:space-y-4 my-4 sm:my-8 overflow-hidden">
      {/* Top Ticker Row - Moves Left */}
      <SingleTickerRow items={ROW_1_ITEMS} direction={-1} initialOffset={0} />

      {/* Bottom Ticker Row - Moves Right (Reverse Direction) */}
      <SingleTickerRow items={ROW_2_ITEMS} direction={1} initialOffset={-600} />
    </div>
  );
};
