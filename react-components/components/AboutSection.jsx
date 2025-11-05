import React, { useRef, useEffect, useState } from 'react';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const hasSectionAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver((entries) => {
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
    <section
      ref={sectionRef}
      className={`about-section section-slide-in${inView ? ' in-view' : ''}`}
      style={{ backgroundColor: '#ededeb', overflow: 'hidden' }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 mb-lg-0 p-4 p-lg-5">
            <div className="text-content">
              <h2 className="open-sans display-5 fw-bold mb-4">
                About NTLF
              </h2>
              <p className="montserrat lead">
                Now in its 34th edition, the nasscom Technology & Leadership Forum has, for over three decades, been India's premier platform at the intersection of technology, innovation, and leadership.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <div
              className="image-content"
              style={{
                maxWidth: window.innerWidth < 992 ? '100%' : '80%'
              }}
            >
              <video 
                src="images/34.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="img-fluid"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '1rem' 
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default AboutSection;