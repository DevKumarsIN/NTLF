import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasCompleted = false;
    let loadingSteps = [
      { step: 'Initializing...', progress: 15 },
      { step: 'Loading styles...', progress: 30 },
      { step: 'Loading components...', progress: 50 },
      { step: 'Loading images...', progress: 70 },
      { step: 'Preparing content...', progress: 85 },
      { step: 'Finalizing...', progress: 95 }
    ];
    let currentStepIndex = 0;
    
    // Function to smoothly animate to target progress
    const smoothProgress = () => {
      if (currentProgress < targetProgress && !hasCompleted) {
        currentProgress += Math.random() * 2 + 0.5; // Random increment for natural feel
        if (currentProgress >= targetProgress) {
          currentProgress = targetProgress;
        }
        setProgress(Math.floor(currentProgress));
      }
    };
    
    // Set up smooth progress animation
    interval = setInterval(smoothProgress, 50);
    
    // Simulate loading steps with realistic timing
    const progressSteps = () => {
      if (currentStepIndex < loadingSteps.length && !hasCompleted) {
        targetProgress = loadingSteps[currentStepIndex].progress;
        currentStepIndex++;
        
        // Schedule next step
        const nextStepDelay = Math.random() * 800 + 400; // 400-1200ms random delay
        setTimeout(progressSteps, nextStepDelay);
      } else if (!hasCompleted) {
        // Final step to 100%
        setTimeout(() => {
          if (!hasCompleted) {
            targetProgress = 100;
            setTimeout(() => {
              hasCompleted = true;
              setTimeout(() => setVisible(false), 800);
            }, 500);
          }
        }, 300);
      }
    };
    
    // Start the loading simulation
    setTimeout(progressSteps, 200);

    // Listen for actual DOM content loaded and window load events
    const handleDOMContentLoaded = () => {
      if (currentStepIndex < 3) { // If still in early loading phases
        targetProgress = Math.max(targetProgress, 60); // Jump to at least 60%
      }
    };
    
    const handleWindowLoad = () => {
      if (!hasCompleted) {
        targetProgress = 95; // Almost complete when window loads
        setTimeout(() => {
          if (!hasCompleted) {
            hasCompleted = true;
            targetProgress = 100;
            setTimeout(() => setVisible(false), 800);
          }
        }, 500);
      }
    };
    
    // Set a safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      if (!hasCompleted) {
        hasCompleted = true;
        setProgress(100);
        setTimeout(() => setVisible(false), 500);
      }
    }, 6000); // Maximum 6 seconds
    
    // Add event listeners
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded(); // Already loaded
    }
    window.addEventListener('load', handleWindowLoad);
    
    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  // Smooth animation for progress updates
  const [displayed, setDisplayed] = useState(0);
  
  useEffect(() => {
    // Smoothly animate displayed value toward actual progress
    if (displayed !== progress) {
      const difference = progress - displayed;
      const step = Math.max(1, Math.abs(difference) / 10);
      
      const timer = setTimeout(() => {
        if (displayed < progress) {
          setDisplayed(prev => Math.min(progress, prev + step));
        } else if (displayed > progress) {
          setDisplayed(prev => Math.max(progress, prev - step));
        }
      }, 50);
      
      return () => clearTimeout(timer);
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
          style={{
            display: 'inline-block',
            transition: 'all 0.3s ease-out',
          }}
        >
          {Math.floor(displayed)}%
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
