import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval;
    let fakeProgress = 1;
    // Simulate progress until window load
    const updateProgress = () => {
      if (fakeProgress < 95) {
        fakeProgress += Math.random() * 2 + 1; // random step
        setProgress(Math.min(95, Math.floor(fakeProgress)));
      }
    };
    interval = setInterval(updateProgress, 20);

    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setVisible(false), 500); // fade out
    };
    window.addEventListener('load', handleLoad);
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const [displayed, setDisplayed] = useState(progress);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    if (progress !== displayed) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayed(progress);
        setAnimating(false);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, displayed]);

  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#c8c5c5ff',
      zIndex: 20000,
      transition: 'opacity 0.5s',
      opacity: visible ? 1 : 0
    }}>
      <div
        className="open-sans loader-percentage"
        style={{
          position: 'absolute',
          left: '1%',
          bottom: '2%',
          color: '#ED783C',
          fontSize: '12vw',
          fontWeight: 700,
          userSelect: 'none',
          pointerEvents: 'none',
          overflow: 'hidden',
          height: '10.5rem',
          lineHeight: '10.5rem',
        }}
      >
        <span
          key={progress}
          style={{
            display: 'inline-block',
            transform: animating ? 'translateY(100%)' : 'translateY(0)',
            animation: animating ? 'slideUpLoader 0.35s cubic-bezier(.77,0,.18,1)' : 'none',
          }}
        >
          {progress}%
        </span>
        <style>{`
          @keyframes slideUpLoader {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;
