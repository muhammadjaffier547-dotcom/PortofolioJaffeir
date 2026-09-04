"use client";

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 1600;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => setIsHidden(true), 500);
        }, 200);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (isHidden) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      backgroundColor: 'var(--carbon, #0A0D10)',
      transition: 'opacity 0.5s ease-out, visibility 0.5s ease-out',
      opacity: isDone ? 0 : 1,
      visibility: isDone ? 'hidden' : 'visible'
    }}>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 'clamp(48px, 8vw, 72px)',
        fontWeight: 800,
        color: 'var(--teal, #4FD1C5)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        textShadow: '0 0 40px rgba(79,209,197,0.3)'
      }}>
        {count}%
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        letterSpacing: '0.16em',
        color: 'var(--slate, #7C8791)'
      }}>
        <span style={{
          width: '60px',
          height: '2px',
          background: `linear-gradient(90deg, var(--teal) ${count}%, var(--line, #232B33) ${count}%)`,
          borderRadius: '1px'
        }} />
        MEMUAT
      </div>
    </div>
  );
}
