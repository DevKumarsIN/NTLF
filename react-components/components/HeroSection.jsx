import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const desktopFramesRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    let currentImage = 0;
    const totalFrames = 70;
    let scrollModeUnlocked = false;
    let images = [];
    let scrollAccumulator = 0;
    const SCROLLS_PER_FRAME = 4; // Decreased from 3 to 1 for faster frame scrolling

    // Initialize frame images for desktop
    if (window.innerWidth >= 992) {
      images = Array.from(desktopFramesRef.current?.querySelectorAll('.zoomImg') || []);
    }

    const newSection = document.getElementById('newSection');
    const fixedNavbar = document.getElementById('fixedNavbar');

    const showCurrentImage = () => {
      if (images.length === 0) return;
      
      images.forEach((img, idx) => {
        if (window.gsap) {
          window.gsap.set(img, { 
            opacity: idx === currentImage ? 1 : 0, 
            pointerEvents: idx === currentImage ? 'auto' : 'none' 
          });
        } else {
          img.style.opacity = idx === currentImage ? 1 : 0;
          img.style.pointerEvents = idx === currentImage ? 'auto' : 'none';
        }
      });
    };

    const unlockScroll = () => {
      if (scrollModeUnlocked) return;
      
      if (newSection) newSection.style.display = 'block';
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      
      window.removeEventListener('wheel', handleScroll, { passive: false });
      scrollModeUnlocked = true;
      window.removeEventListener('wheel', handleScroll);

      const reverseScrollHandler = (evt) => {
        if (window.scrollY <= 10 && evt.deltaY < 0) {
          if (newSection) newSection.style.display = 'none';
          document.body.style.overflow = 'hidden';
          scrollModeUnlocked = false;
          currentImage = totalFrames - 1;
          showCurrentImage();
          window.addEventListener('wheel', handleScroll, { passive: false });
          window.removeEventListener('wheel', reverseScrollHandler);
          evt.preventDefault();
        }
      };
      window.addEventListener('wheel', reverseScrollHandler, { passive: false });
    };

    const unlockScrollForNav = () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('wheel', handleScroll, { passive: false });
    };

    const handleScroll = (e) => {
      if (scrollModeUnlocked) return;
      
      e.preventDefault();
      e.stopPropagation();

      scrollAccumulator += e.deltaY;
      const direction = e.deltaY > 0 ? 1 : -1;
      const threshold = SCROLLS_PER_FRAME * 100; // 100 is a typical deltaY per scroll

      if (direction === 1 && currentImage < totalFrames - 1) {
        if (scrollAccumulator >= threshold) {
          currentImage++;
          showCurrentImage();
          scrollAccumulator = 0;
          if (currentImage >= totalFrames - 1) {
            setTimeout(unlockScroll, 300);
          }
        }
      } else if (direction === -1 && currentImage > 0) {
        if (scrollAccumulator <= -threshold) {
          currentImage--;
          showCurrentImage();
          scrollAccumulator = 0;
        }
      }
    };

    // Mobile video handling
    const setupMobileVideo = () => {
      const mobileVideo = mobileVideoRef.current;
      if (!mobileVideo) return;

      console.log('Mobile video element found');

      mobileVideo.muted = true;
      mobileVideo.autoplay = true;
      mobileVideo.loop = true;
      mobileVideo.playsInline = true;

      const attemptPlay = () => {
        console.log('Attempting to play video...');
        const playPromise = mobileVideo.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('✅ Video playing successfully!');
          }).catch(error => {
            console.log('❌ Play blocked:', error.message);
          });
        }
      };

      setTimeout(attemptPlay, 100);

      mobileVideo.addEventListener('canplay', () => {
        console.log('Video can play, attempting...');
        attemptPlay();
      });

      const playOnInteraction = () => {
        console.log('User interaction detected, playing video...');
        attemptPlay();
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
        document.removeEventListener('touchmove', playOnInteraction);
      };

      document.addEventListener('touchstart', playOnInteraction, { passive: true });
      document.addEventListener('click', playOnInteraction, { passive: true });
      document.addEventListener('scroll', playOnInteraction, { passive: true });
      document.addEventListener('touchmove', playOnInteraction, { passive: true });

      mobileVideo.load();
      setTimeout(() => {
        console.log('Delayed play attempt...');
        attemptPlay();
      }, 500);
    };

    // Initialize based on screen size
    const initializeHero = () => {
      window.scrollTo(0, 0);
      if (newSection) newSection.style.display = 'none';
      if (fixedNavbar) fixedNavbar.style.display = 'block';

      if (window.innerWidth >= 992) {
        // Desktop: frame animation
        if (currentImage === 0) {
          document.body.style.overflow = 'hidden';
          window.addEventListener('wheel', handleScroll, { passive: false });
        } else {
          unlockScrollForNav();
        }
        currentImage = 0;
        images.forEach((img, idx) => {
          if (window.gsap) {
            window.gsap.set(img, { opacity: idx === 0 ? 1 : 0, pointerEvents: idx === 0 ? 'auto' : 'none' });
          }
        });
      } else {
        // Mobile/tablet: normal scrolling and video
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        setupMobileVideo();
      }
    };

    // Initialize on component mount
    initializeHero();

    // Add event listeners for navbar links
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', unlockScrollForNav);
    });

    // Handle page load
    const handleLoad = () => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    };
    window.addEventListener('load', handleLoad);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll, { passive: false });
      window.removeEventListener('load', handleLoad);
      document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
        link.removeEventListener('click', unlockScrollForNav);
      });
    };
  }, []);

  // Generate frame images for desktop
  const generateFrames = () => {
    const frames = [];
    for (let i = 1; i <= 70; i++) {
      const padded = String(i).padStart(4, '0');
      frames.push(
        <img
          key={i}
          className="zoomImg"
          src={`images/desktop/frame_${padded}.webp`}
          alt={`Frame ${i}`}
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            boxShadow: '0 0 40px rgba(0,0,0,0.2)',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: i === 1 ? 1 : 0,
            pointerEvents: i === 1 ? 'auto' : 'none',
            transformOrigin: 'center center'
          }}
        />
      );
    }
    return frames;
  };

  return (
    <section className="max-width main-banner-section-wrapper">
      <div className="position-relative main-banner-section">
        {/* Desktop: Frame-by-frame scroll effect */}
        <div className="desktop-frames-wrapper">
          <div 
            ref={desktopFramesRef}
            className="desktop-frames" 
            style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
          >
            {generateFrames()}
          </div>
        </div>

        {/* Mobile/Tablet: Normal scroll with video */}
        <div className="mobile-video-wrapper pt-5">
          <div 
            className="mobile-video"
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              background: '#000' 
            }}
          >
            <video 
              ref={mobileVideoRef}
              id="mobileHeroVideo" 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="metadata"
              poster="images/frame-(1).webp"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '100vw', 
                objectFit: 'contain', 
                background: '#000', 
                display: 'block' 
              }}
            >
              <source src="images/herosection-vedio-for-mobile.mp4" type="video/mp4" />
              <source src="images/herosection-vedio-for-mobile.webm" type="video/webm" />
              {/* Fallback image if video fails to load */}
              <img 
                src="images/frame-(1).webp" 
                alt="Hero content"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// Yes, in this code there is a frame section for desktop:
// - The <div className="desktop-frames-wrapper"> contains a <div className="desktop-frames"> with 244 images (frames).
// - As you scroll (on desktop), the handleScroll function updates which frame is visible by changing the opacity and pointerEvents of each image.
// - This creates a smooth frame-by-frame animation effect as you scroll through the section.