"use client";

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`btt ${isVisible ? 'btt-visible' : ''} btn-ghost`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        zIndex: 200,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        fontFamily: 'var(--mono)',
        fontSize: '1.2rem',
        padding: 0
      }}
    >
      ↑
    </button>
  );
}
