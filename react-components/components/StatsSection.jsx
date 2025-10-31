import React, { useEffect, useRef, useState } from 'react';

const StatsSection = () => {
  const countersColumnRef = useRef(null);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const hasSectionAnimatedRef = useRef(false);
  // Only animate once per page load
  const hasAnimatedRef = useRef(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const rightCol = countersColumnRef.current;

    // Utility to animate number using requestAnimationFrame
    const animateValue = (el, start, end, duration, format) => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.ceil(progress * (end - start) + start);
        el.textContent = current;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = end;
        }
      };
      window.requestAnimationFrame(step);
    };

    if (!rightCol) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setHasAnimated(true);
          counters.forEach(counter => {
            counter.textContent = '0';
            const format = counter.getAttribute('data-format') || 'plain';
            const rawTarget = parseInt(counter.getAttribute('data-target'), 10) || 0;
            if (format === 'K') {
              const targetSmall = rawTarget;
              animateValue(counter, 0, targetSmall, 1050, format); // 30% faster
            } else {
              const duration = Math.min(1750, Math.max(840, Math.floor(rawTarget * 0.21)));
              animateValue(counter, 0, rawTarget, duration, format);
            }
          });
        }
      });
    }, { threshold: 0.45 });

    observer.observe(rightCol);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Disable animation on mobile/tablet
    if (window.innerWidth < 992) {
      // Instantly show all elements as visible
      const mascotGif = document.querySelector('.ev-logo[src*="ntlf-mascot2.gif"]');
      const nasscomImage = document.querySelector('.ev-logo[src*="nasscom-date-left"]');
      const h1 = document.querySelector('.animated-h1');
      const words = h1?.querySelectorAll('span');
      const leftGroup = document.querySelector('.animated-left-group');
      const rightGroup = document.querySelector('.animated-right-group');

      if (mascotGif) mascotGif.classList.add('visible');
      if (nasscomImage) nasscomImage.classList.add('visible');
      if (words) words.forEach(span => span.classList.add('visible'));
      if (leftGroup) leftGroup.classList.add('visible');
      if (rightGroup) rightGroup.classList.add('visible');
      return; // Do not attach scroll animation
    }

    // Sequential animation for stats section
    const statsSection = document.querySelector('.stats-section');
    const mascotGif = document.querySelector('.ev-logo[src*="ntlf-mascot2.gif"]');
    const nasscomImage = document.querySelector('.ev-logo[src*="nasscom-date-left"]');
    const h1 = document.querySelector('.animated-h1');
    const words = h1?.querySelectorAll('span');
    const leftGroup = document.querySelector('.animated-left-group');
    const rightGroup = document.querySelector('.animated-right-group');

    if (!statsSection || !words) return;

    // Animation state to prevent re-animation after first complete
    let animationDone = false;

    const revealStatsOnScroll = () => {
      if (hasAnimated || animationDone) return; // Prevent re-animation even in same section
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Start animation when section is more visible (when top is at 90% of viewport)
        const startTrigger = window.innerHeight * 0.9;
        // Use similar timing as AboutSection
        const rawProgress = Math.min(1, Math.max(0, (startTrigger - rect.top) / (rect.height * 1.28)));
        const progress = Math.min(1, Math.max(0, rawProgress));

        // Phase 1: Show GIF first (0% to 20% of progress)
        if (progress <= 0.2) {
          if (mascotGif) mascotGif.classList.add('visible');
          // Keep others hidden
          if (nasscomImage) nasscomImage.classList.remove('visible');
          words.forEach(span => span.classList.remove('visible'));
          if (leftGroup) leftGroup.classList.remove('visible');
          if (rightGroup) rightGroup.classList.remove('visible');
        }
        // Phase 2: Show image after GIF (20% to 40% of progress)
        else if (progress <= 0.4) {
          if (mascotGif) mascotGif.classList.add('visible');
          if (nasscomImage) nasscomImage.classList.add('visible');
          // Keep others hidden
          words.forEach(span => span.classList.remove('visible'));
          if (leftGroup) leftGroup.classList.remove('visible');
          if (rightGroup) rightGroup.classList.remove('visible');
        }
        // Phase 3: Animate text word by word (40% to 70% of progress)
        else if (progress <= 0.7) {
          if (mascotGif) mascotGif.classList.add('visible');
          if (nasscomImage) nasscomImage.classList.add('visible');
          
          // Animate text words
          const textProgress = (progress - 0.4) / 0.3;
          const totalWords = words.length;
          const visibleWords = Math.floor(textProgress * totalWords);
          words.forEach((span, idx) => {
            if (idx < visibleWords) span.classList.add('visible');
            else span.classList.remove('visible');
          });
          
          // Keep button and right side hidden
          if (leftGroup) leftGroup.classList.remove('visible');
          if (rightGroup) rightGroup.classList.remove('visible');
        }
        // Phase 4: Show button (70% to 85% of progress)
        else if (progress <= 0.85) {
          if (mascotGif) mascotGif.classList.add('visible');
          if (nasscomImage) nasscomImage.classList.add('visible');
          words.forEach(span => span.classList.add('visible'));
          if (leftGroup) leftGroup.classList.add('visible');
          // Keep right side hidden
          if (rightGroup) rightGroup.classList.remove('visible');
        }
        // Phase 5: Show right side counter section (85% to 100% of progress)
        else {
          if (mascotGif) mascotGif.classList.add('visible');
          if (nasscomImage) nasscomImage.classList.add('visible');
          words.forEach(span => span.classList.add('visible'));
          if (leftGroup) leftGroup.classList.add('visible');
          if (rightGroup) rightGroup.classList.add('visible');
        }

        if (progress >= 1) {
          animationDone = true;
          setHasAnimated(true);
        }
      } else if (rect.bottom < 0 && animationDone) {
        // Section has been left after animation completed, do nothing
        return;
      } else if (!animationDone) {
        // Reset all when out of view
        if (mascotGif) mascotGif.classList.remove('visible');
        if (nasscomImage) nasscomImage.classList.remove('visible');
        words.forEach(span => span.classList.remove('visible'));
        if (leftGroup) leftGroup.classList.remove('visible');
        if (rightGroup) rightGroup.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', revealStatsOnScroll, { passive: true });
    revealStatsOnScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', revealStatsOnScroll);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const mascotGif = document.querySelector('.ev-logo[src*="ntlf-mascot2.gif"]');
      const nasscomImage = document.querySelector('.ev-logo[src*="nasscom-date-left"]');
      const h1 = document.querySelector('.animated-h1');
      const words = h1?.querySelectorAll('span');
      const leftGroup = document.querySelector('.animated-left-group');
      const rightGroup = document.querySelector('.animated-right-group');
      if (mascotGif) mascotGif.classList.add('visible');
      if (nasscomImage) nasscomImage.classList.add('visible');
      if (words) words.forEach(span => span.classList.add('visible'));
      if (leftGroup) leftGroup.classList.add('visible');
      if (rightGroup) rightGroup.classList.add('visible');
    }
  }, [hasAnimated]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasSectionAnimatedRef.current) {
          setInView(true);
          hasSectionAnimatedRef.current = true;
        }
      });
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div id="newSection" className="max-width container-fluid second-section ui-wrapper" style={{ display: 'none' }}>
        <div className="row">
          {/* (Navbar removed from here) */}
        </div>
      </div>

      {/* TICKET: Fixed container */}
      <section
        ref={sectionRef}
  className={`container-fluid stats-section section-slide-in${inView ? ' in-view' : ''}`}
        style={{ overflow: 'hidden' }}
      >
        <div className="">
          <div className="row g-0 align-items-stretch">
            {/* Left column */}
            <div className="col-lg-6 col-12 order-1 order-lg-1">
              <div className="left-content p-4 p-lg-5 h-100 d-flex flex-column">
                <div className="event-info d-flex align-items-center flex-lg-row text-lg-start text-center my-4">
                  <img 
                    className="ev-logo me-lg-1 mb-3 mb-lg-0" 
                    src="images/ntlf-mascot2.gif" 
                    alt="nasscom"
                    style={{ width: '27%' }}
                  />
                  <div className="ev-text">
                    <img 
                      className="ev-logo me-lg-1 mb-3 mb-lg-0" 
                      src="images/nasscom-date-left side.webp" 
                      alt="nasscom" 
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <h1 className="display-4 fw-normal mb-4 text-lg-start text-center animated-h1">
                  <span>A</span> <span>tech-driven</span> <span>future</span> <span>shaped</span>
                  <span>by</span> <span>human-centred</span> <span>imagination</span> <span>and </span>
                  <span>impact</span>
                </h1>
                <div className="animated-left-group d-flex flex-column align-items-lg-start align-items-center mb-4">
                  <button 
                    className="font-poppins button-font btn btn-primary rounded-pill px-4 py-2 fw-bold"
                    onClick={() => window.open('https://in.explara.com/e/ntlf2026', '_blank')}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right column - stacked counters */}
            <div className="col-lg-6 col-12 order-2 order-lg-2" id="countersColumn" ref={countersColumnRef}>
              <div className="stats-column d-flex flex-column h-100  p-4">
                <h3 className="postfix  text-start p-3" style={{fontSize: '2.474rem'}}>NTLF OVER THE YEARS</h3>
                
                <div className="stat-item flex-grow-1 d-flex align-items-center justify-content-between p-4 border-bottom border-light">
                  <div className="stat-number d-flex align-items-center">
                    <span className="counter me-2" data-target="60" data-format="K">0</span>
                    <span className="postfix">K+</span>
                  </div>
                  <div className="stat-label text-white fw-semibold">Attendees</div>
                </div>

                <div className="stat-item flex-grow-1 d-flex align-items-center justify-content-between p-4 border-bottom border-light">
                  <div className="stat-number d-flex align-items-center">
                    <span className="counter me-2" data-target="8000" data-format="plain">0</span>
                    <span className="postfix">+</span>
                  </div>
                  <div className="stat-label text-white fw-semibold">Companies</div>
                </div>

                <div className="stat-item flex-grow-1 d-flex align-items-center justify-content-between p-4 border-bottom border-light">
                  <div className="stat-number d-flex align-items-center">
                    <span className="counter me-2" data-target="3000" data-format="plain">0</span>
                    <span className="postfix">+</span>
                  </div>
                  <div className="stat-label text-white fw-semibold">Speakers</div>
                </div>

                <div className="stat-item flex-grow-1 d-flex align-items-center justify-content-between p-4 border-bottom border-light">
                  <div className="stat-number d-flex align-items-center">
                    <span className="counter me-2" data-target="600" data-format="plain">0</span>
                    <span className="postfix">+</span>
                  </div>
                  <div className="stat-label text-white fw-semibold">Showcases</div>
                </div>

                <div className="stat-item flex-grow-1 d-flex align-items-center justify-content-between p-4">
                  <div className="stat-number d-flex align-items-center">
                    <span className="counter me-2" data-target="40" data-format="plain">0</span>
                    <span className="postfix">+</span>
                  </div>
                  <div className="stat-label text-white fw-semibold">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .section-slide-in {
          opacity: 0;
          transform: translateX(-80px);
          transition: opacity 2s cubic-bezier(.77,0,.18,1), transform 2s cubic-bezier(.77,0,.18,1);
        }
        .section-slide-in.in-view {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  );
};

export default StatsSection;

// Yes, in this file, the animation sequence for the stats section is as follows:
// 1. When the section comes into view, the left side mascot GIF appears first.
// 2. Then the left side image appears.
// 3. Then the heading text animates word by word.
// 4. Then the button appears.
// 5. Finally, the right side counter section appears (with the animated numbers).

// This sequence is controlled by the revealStatsOnScroll function and the progress thresholds in the second useEffect.