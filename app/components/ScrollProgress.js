"use client";

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let requestAnimationFrameId;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const scrollPercent = docHeight > windowHeight ? (scrollY / (docHeight - windowHeight)) * 100 : 0;
      setProgress(scrollPercent);
    };

    const onScroll = () => {
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2px',
        backgroundColor: 'var(--teal)',
        boxShadow: '0 0 10px var(--teal)',
        zIndex: 999,
        transition: 'width 0.1s ease-out'
      }}
    />
  );
}
