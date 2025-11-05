import React, { useEffect, useRef } from 'react';

const PillarsSection = () => {
  const stackRef = useRef(null);

  useEffect(() => {
    // Animate "The Pillars" heading text
    const pillarsSection = document.querySelector('.pillars-heading-section');
    const pillarsH2Spans = document.querySelectorAll('.animated-pillars-h2 span');

    const animatePillarsTextOnScroll = () => {
      if (!pillarsSection || !pillarsH2Spans.length) return;
      const rect = pillarsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Start animation when section is more visible (when top is at 90% of viewport)
        const startTrigger = window.innerHeight * 0.9;
        // Use similar timing as other sections
        const rawProgress = Math.min(1, Math.max(0, (startTrigger - rect.top) / (rect.height * 1.28)));
        const progress = Math.min(1, Math.max(0, rawProgress));
        
        // Animate h2 word by word
        const h2Total = pillarsH2Spans.length;
        const h2Visible = Math.floor(progress * h2Total);
        pillarsH2Spans.forEach((span, idx) => {
          if (idx < h2Visible) span.classList.add('visible');
          else span.classList.remove('visible');
        });
      } else {
        pillarsH2Spans.forEach(span => span.classList.remove('visible'));
      }
    };

    window.addEventListener('scroll', animatePillarsTextOnScroll, { passive: true });
    animatePillarsTextOnScroll();

    // Cleanup for pillars text animation
    const cleanupPillarsAnimation = () => {
      window.removeEventListener('scroll', animatePillarsTextOnScroll);
    };

    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll('.feature-card'));
    const headings = Array.from(stack.querySelectorAll('.sticky-mini-heading'));

    const CARD_HEIGHT = 420;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    let stackProgress = 0;
    const MAX_INDEX = cards.length - 1;
    let wheelAttached = false;

    // Desktop: frame-by-frame scroll effect
    if (window.innerWidth >= 992) {
      const renderStack = (progress) => {
        const base = Math.floor(progress);
        const frac = progress - base;

        cards.forEach((card, i) => {
          let ty = 0, scale = 1, opacity = 1, z = 10;
          
          // Special handling for 4th card overlap effect
          if (progress > MAX_INDEX && i === MAX_INDEX) {
            // 4th card overlaps the entire section
            const overlapProgress = progress - MAX_INDEX;
            ty = -overlapProgress * 100; // Move up to cover the section
            scale = 1; // No zoom effect
            opacity = 1;
            z = 1000; // Highest z-index to cover everything
          } else if (i === base) {
            ty = -frac * CARD_HEIGHT * 0.1;
            scale = 1;
            opacity = 1;
            z = 20;
          } else if (i === base + 1 && frac > 0 && progress <= MAX_INDEX) {
            // Next card only appears when scrolling starts (frac > 0)
            // Slides up from bottom based on scroll progress
            ty = CARD_HEIGHT - (frac * CARD_HEIGHT);
            scale = 1;
            opacity = 1;
            z = 25; // Higher z-index to cover current card
          } else if (progress > i) {
            ty = (i - progress) * CARD_HEIGHT * 0.1;
            scale = 0.98;
            opacity = 0.5;
            z = 5 + i;
          } else {
            const dist = i - base;
            ty = (dist * CARD_HEIGHT);
            opacity = 0; // Hidden until it's time to appear
            z = 10 - dist;
          }
          
          // Add smooth transitions to reduce jitter
          card.style.transition = 'transform 0.08s ease-out, opacity 0.08s ease-out';
          card.style.transform = `translateY(${ty}px) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.zIndex = z;
        });

        // Show sticky heading only when its card is fully behind (progress >= idx + 1)
        headings.forEach((h, idx) => {
          // Show heading when card is fully behind (progress >= idx + 1)
          // Skip 4th card heading (idx === 3) since it overlaps the section
          if (progress >= idx + 1 && idx < 3) {
            h.classList.add('visible');
          } else {
            h.classList.remove('visible');
          }
        });
      };

      renderStack(stackProgress);

      // Smooth wheel handling with proper bidirectional scrolling
      let wheelTimeout;
      let isWheeling = false;
      
      const onWheel = (e) => {
        const rect = stack.getBoundingClientRect();
        if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;
        
        // Smooth delta calculation
        const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50) / CARD_HEIGHT;
        const newProgress = clamp(stackProgress + delta, 0, MAX_INDEX + 1);
        
        // Allow normal page scroll only at extreme boundaries
        if (stackProgress <= 0 && delta < 0) {
          // At very beginning, trying to scroll up - allow normal page scroll
          return;
        }
        if (stackProgress >= MAX_INDEX + 1 && delta > 0) {
          // At very end, trying to scroll down - allow normal page scroll  
          return;
        }
        
        // Always prevent default scroll when within the card animation range
        e.preventDefault();
        
        // Update progress for smooth bidirectional movement
        if (newProgress !== stackProgress) {
          stackProgress = newProgress;
          
          if (!isWheeling) {
            isWheeling = true;
            requestAnimationFrame(() => {
              renderStack(stackProgress);
              isWheeling = false;
            });
          }
        }
        
        // Clear timeout and set new one for smoother scrolling
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          // Final render after scrolling stops
          requestAnimationFrame(() => renderStack(stackProgress));
        }, 16);
      };

      // Keep wheel listener attached throughout section interaction
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !wheelAttached) {
            stack.addEventListener('wheel', onWheel, { passive: false });
            wheelAttached = true;
            // Don't reset progress - let user continue from where they left off
          } else if (!entry.isIntersecting && wheelAttached) {
            // Only remove listener when completely out of view
            stack.removeEventListener('wheel', onWheel, { passive: false });
            wheelAttached = false;
            // Keep progress intact for seamless re-entry
          }
        });
      }, { threshold: 0.1 });
      observer.observe(stack);

      // Cleanup
      return () => {
        observer.disconnect();
        if (wheelAttached) {
          stack.removeEventListener('wheel', onWheel, { passive: false });
        }
        clearTimeout(wheelTimeout);
        cleanupPillarsAnimation();
      };
    } else {
      // Mobile/Tablet: Touch swipe functionality with scroll prevention
      let touchStartY = 0;
      let touchCurrentY = 0;
      let isTouchSwiping = false;
      let touchProgress = 0;

      const renderMobileStack = (progress) => {
        const base = Math.floor(progress);
        const frac = progress - base;

        cards.forEach((card, i) => {
          let ty = 0, opacity = 1, z = 10, scale = 1; // Add scale variable
          
          if (i === base) {
            ty = -frac * CARD_HEIGHT * 0.1;
            opacity = 1;
            z = 20;
          } else if (i === base + 1 && frac > 0 && progress <= MAX_INDEX) {
            ty = CARD_HEIGHT - (frac * CARD_HEIGHT);
            opacity = 1;
            z = 25;
          } else if (progress > i) {
            // Simplify passed cards - just move them out of view
            ty = -CARD_HEIGHT;
            opacity = 0;
            z = 1;
          } else {
            const dist = i - base;
            ty = (dist * CARD_HEIGHT);
            opacity = 0;
            z = 10 - dist;
          }
          
          // Add smooth transitions for mobile - disable during active swiping
          card.style.transition = isTouchSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out';
          card.style.transform = `translateY(${ty}px) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.zIndex = z;
        });

        headings.forEach((h, idx) => {
          if (progress > idx && idx < 3) {
            h.classList.add('visible');
          } else {
            h.classList.remove('visible');
          }
        });
      };

      const onTouchStart = (e) => {
        const rect = stack.getBoundingClientRect();
        if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;
        
        touchStartY = e.touches[0].clientY;
        touchCurrentY = touchStartY;
        isTouchSwiping = true;
        touchProgress = stackProgress;
      };

      const onTouchMove = (e) => {
        if (!isTouchSwiping) return;
        
        const rect = stack.getBoundingClientRect();
        if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;
        
        touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY;
        const swipeProgress = deltaY / (CARD_HEIGHT * 0.8); // Reduced resistance
        const newProgress = clamp(touchProgress + swipeProgress, 0, MAX_INDEX + 0.5);
        
        // Only allow natural scroll at very boundaries
        if (touchProgress <= 0 && deltaY < -20) {
          return; // Allow scroll up only from first card
        }
        if (touchProgress >= MAX_INDEX && deltaY > 20) {
          return; // Allow scroll down only from last card
        }
        
        e.preventDefault();
        renderMobileStack(newProgress);
      };

      const onTouchEnd = () => {
        if (!isTouchSwiping) return;
        
        const deltaY = touchStartY - touchCurrentY;
        const swipeProgress = deltaY / (CARD_HEIGHT * 0.8);
        
        // Handle section transitions only at boundaries
        if (touchProgress <= 0 && deltaY < -50) {
          isTouchSwiping = false;
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
          return;
        }
        
        if (touchProgress >= MAX_INDEX && deltaY > 50) {
          isTouchSwiping = false;
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          return;
        }
        
        // Card transitions with lower threshold
        if (Math.abs(swipeProgress) > 0.15) { // Much lower threshold
          const targetProgress = clamp(Math.round(touchProgress + swipeProgress), 0, MAX_INDEX);
          stackProgress = targetProgress; // Update stackProgress immediately
          renderMobileStack(stackProgress);
        } else {
          // Snap back to current card
          stackProgress = Math.round(touchProgress);
          renderMobileStack(stackProgress);
        }
        
        isTouchSwiping = false;
      };

      renderMobileStack(stackProgress);
      
      stack.addEventListener('touchstart', onTouchStart, { passive: false });
      stack.addEventListener('touchmove', onTouchMove, { passive: false });
      stack.addEventListener('touchend', onTouchEnd, { passive: true });

      // Cleanup
      return () => {
        stack.removeEventListener('touchstart', onTouchStart);
        stack.removeEventListener('touchmove', onTouchMove);
        stack.removeEventListener('touchend', onTouchEnd);
        cleanupPillarsAnimation();
      };
    }

    // --- Hold section in viewport center until card slide process ends ---
    let sectionElem = null;
    let originalPosition = '';
    let originalTop = '';
    let originalWidth = '';
    let originalLeft = '';
    let isFixed = false;

    const handleHoldSection = () => {
      sectionElem = document.getElementById('single-feature-card');
      if (!sectionElem) return;

      const cardsCount = stackRef.current?.querySelectorAll('.feature-card').length || 0;
      const cardHeight = 420;
      const totalSlideHeight = cardHeight * cardsCount;

      const rect = sectionElem.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = sectionElem.offsetTop;
      const sectionHeight = sectionElem.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate the scroll range for the card slide process
      const startHold = sectionTop - (windowHeight - sectionHeight) / 2;
      const endHold = sectionTop + totalSlideHeight - windowHeight / 2;

      if (scrollY >= startHold && scrollY < endHold) {
        if (!isFixed) {
          originalPosition = sectionElem.style.position;
          originalTop = sectionElem.style.top;
          originalWidth = sectionElem.style.width;
          originalLeft = sectionElem.style.left;
          sectionElem.style.position = 'fixed';
          sectionElem.style.top = '50%';
          sectionElem.style.left = '50%';
          sectionElem.style.transform = 'translate(-50%, -50%)';
          sectionElem.style.width = '100vw';
          sectionElem.style.zIndex = '100';
          isFixed = true;
        }
      } else {
        if (isFixed) {
          sectionElem.style.position = originalPosition || '';
          sectionElem.style.top = originalTop || '';
          sectionElem.style.left = originalLeft || '';
          sectionElem.style.transform = '';
          sectionElem.style.width = originalWidth || '';
          sectionElem.style.zIndex = '';
          isFixed = false;
        }
      }
    };

    window.addEventListener('scroll', handleHoldSection, { passive: true });
    setTimeout(handleHoldSection, 100);

    // Cleanup for hold section
    return () => {
      window.removeEventListener('scroll', handleHoldSection);
    };
  }, []);

  return (
    <>
      <section className="dark-section container-fluid mb-lg-0 p-4 p-lg-5 pillars-heading-section" style={{ paddingBottom: window.innerWidth < 992 ? '10px' : 'inherit' }}>
        <h2 className="display-5 fw-bold animated-pillars-h2" >
          <span>The</span> <span>Pillars</span>
        </h2>
      </section>
 
      <section 
        className="dark-section piller-section-main container-fluid px-3" 
        id="single-feature-card"
        style={{ 
          width: '100vw', 
          minHeight: '90vh', 
          background: '#000', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          paddingTop: window.innerWidth < 992 ? '20px' : 'inherit'
        }}
      >
        <div 
          ref={stackRef}
          id="feature-card-stack" 
          style={{ maxWidth: '1250px', width: '100vw', height: '420px', position: 'relative' }}
        >
          {/* Card 1 */}
          <div className="feature-card">
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: '1px',
              background: 'repeating-linear-gradient(to right, #fff 0px, #fff 8px, transparent 8px, transparent 16px)',
              zIndex: 1000
            }}></div>
            {/* <div className="open-sans sticky-mini-heading">
              <span className="open-sans num">1</span> 
              <span className="txt open-sans">Innovation X: The Future of Everything</span>
            </div> */}
            <div className="row align-items-start card-row">
              <div 
                className="col-lg-3 col-md-3 col-12 d-flex flex-row align-items-center justify-content-start"
                style={{ minWidth: '200px' }}
              >
                <div className="card-number">1</div>
              </div>
              <div className="middle-text-slider col-lg-5 col-md-5 col-12">
                <div className="open-sans card-heading">Innovation X: The Future of Everything</div>
                <div className="open-sans card-desc">
                  From self-driving cities to quantum breakthroughs, technology
                  and imagination now converge to reshape life, work, and
                  identity - transforming science fiction into the blueprint of our living future.
                </div>
              </div>
              <div className="video-section-slide col-lg-4 col-md-3 col-12 text-end">
                <video 
                  src="images/Innovation-X-1.mp4" 
                  className="card-img" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  style={{ width: '90%', background: '#000' }}
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: '1px',
              background: 'repeating-linear-gradient(to right, #fff 0px, #fff 8px, transparent 8px, transparent 16px)',
              zIndex: 1000
            }}></div>
            {/* <div className="sticky-mini-heading">
              <span className="open-sans num">2</span> 
              <span className="open-sans txt">The Intelligent Leader</span>
            </div> */}
            <div className="row align-items-start card-row">
              <div 
                className="col-lg-3 col-md-3 col-12 d-flex flex-row align-items-center justify-content-start"
                style={{ minWidth: '200px' }}
              >
                <div className="open-sans card-number">2</div>
              </div>
              <div className="middle-text-slider col-lg-5 col-md-5 col-12">
                <div className="open-sans card-heading">The Intelligent Leader</div>
                <div className="open-sans card-desc">
                  Stability is gone, and experimentation rules. Today's leader
                  fuses strategy, technology, and empathy, guiding
                  organizations through volatility with audacity, adaptability, and moral clarity.
                </div>
              </div>
              <div className="video-section-slide col-lg-4 col-md-3 col-12 text-end">
                <video 
                  src="images/The-Intelligent-Leader-2.mp4" 
                  className="card-img" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  style={{ width: '90%', background: '#000' }}
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: '1px',
              background: 'repeating-linear-gradient(to right, #fff 0px, #fff 8px, transparent 8px, transparent 16px)',
              zIndex: 1000
            }}></div>
            {/* <div className="sticky-mini-heading">
              <span className="open-sans num">3</span> 
              <span className="open-sans txt">The Global Reorder</span>
            </div> */}
            <div className="row align-items-start card-row">
              <div 
                className="col-lg-3 col-md-3 col-12 d-flex flex-row align-items-center justify-content-start"
                style={{ minWidth: '200px' }}
              >
                <div className="open-sans card-number">3</div>
              </div>
              <div className="middle-text-slider col-lg-5 col-md-5 col-12">
                <div className="open-sans card-heading">The Global Reorder</div>
                <div className="open-sans card-desc">
                  A multipolar and data-driven world is redrawing power and
                  trade. As digital borders rise, resilience, foresight, and
                  collaboration become the real levers of influence.
                </div>
              </div>
              <div className="video-section-slide col-lg-4 col-md-3 col-12 text-end">
                <video 
                  src="images/The-Global-Reorder-3.mp4" 
                  className="card-img" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  style={{ width: '90%', background: '#000' }}
                />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: '1px',
              background: 'repeating-linear-gradient(to right, #fff 0px, #fff 8px, transparent 8px, transparent 16px)',
              zIndex: 1000
            }}></div>
            {/* <div className="open-sans sticky-mini-heading">
              <span className="num">4</span> 
              <span className="txt">The Reinvented Enterprise</span>
            </div> */}
            <div className="row align-items-start card-row">
              <div 
                className="col-lg-3 col-md-3 col-12 d-flex flex-row align-items-center justify-content-start"
                style={{ minWidth: '200px' }}
              >
                <div className="open-sans card-number">4</div>
              </div>
              <div className="middle-text-slider col-lg-5 col-md-5 col-12">
                <div className="open-sans card-heading">The Reinvented Enterprise</div>
                <div className="open-sans card-desc">
                  Cognitive systems, cloud, and human ingenuity converge to
                  reinvent business - turning cost into transformation,
                  embedding ethics in code, and building adaptive, purpose-led organizations fit for constant
                  change.
                </div>
              </div>
              <div className="video-section-slide col-lg-4 col-md-3 col-12 text-end">
                <video 
                  src="images/The-Reinvented-Enterprise-4.mp4" 
                  className="card-img" 
                  autoPlay 
                  muted 
                  loop
                  playsInline 
                  style={{ width: '90%', background: '#000' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PillarsSection;