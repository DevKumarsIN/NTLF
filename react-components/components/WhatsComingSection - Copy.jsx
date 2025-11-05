import React, { useEffect } from 'react';

const WhatsComingSection = () => {
  useEffect(() => {
    // Pause video when modal closes
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('ntlfFullVideo');
    
    if (videoModal && video) {
      const handleModalHidden = () => {
        video.pause();
        video.currentTime = 0;
      };
      
      videoModal.addEventListener('hidden.bs.modal', handleModalHidden);
      
      return () => {
        videoModal.removeEventListener('hidden.bs.modal', handleModalHidden);
      };
    }
  }, []);

  return (
    <>
      {/* Text-video section */}
      <div className="container-fluid col-12 text-center pt-5 pb-2" style={{ backgroundColor: '#000' }}>
        <h2 className="display-5 fw-bold text-light text-start ps-lg-5" style={{ marginBottom: '0px' }}>
          What's Coming
        </h2>
      </div>
      
      <header className="video-text-header responsive-video-header">
        <div className="video-text-svg-wrapper">
          <svg viewBox="0 0 100 30" width="100vw" height="100%" style={{ display: 'block' }}>
            <defs>
              <mask id="video-text-mask" maskUnits="userSpaceOnUse">
                <rect x="0" y="0" width="100" height="30" fill="black" />
                <text className='open-sans' 
                  x="50" 
                  y="20"  // was 12, now 20 for better vertical centering
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fontFamily="Biko, sans-serif" 
                  fontSize="35" 
                  fontWeight="700" 
                  letterSpacing="0.02em"
                  fill="white"
                >
                  NTLF
                </text>
              </mask>
            </defs>
            <rect x="0" y="0" width="100" height="30" fill="#000" />
            <g mask="url(#video-text-mask)">
              <foreignObject x="0" y="0" width="100" height="30">
                <video 
                  autoPlay 
                  playsInline 
                  muted 
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  poster="images/NTLF-2026-Intro-video.mp4"
                >
                  <source src="images/NTLF-2026-Intro-video.mp4" />
                  <source src="images/NTLF-2026-Intro-video.mp4" />
                </video>
              </foreignObject>
            </g>
          </svg>
        </div>
      </header>
      
      <div className="container-fluid col-12 text-center pb-5" style={{ backgroundColor: '#000' }}>
        <button 
          type="button" 
          className="button-font btn btn-primary rounded-pill px-4 py-2 mt-3 fw-bold"
          data-bs-toggle="modal" 
          data-bs-target="#videoModal"
        >
          WATCH FULL VIDEO
        </button>
        
        {/* Video Modal */}
        <div 
          className="modal fade py-sm-5" 
          id="videoModal" 
          tabIndex="-1" 
          aria-labelledby="videoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark">
              <div className="modal-header border-0">
                <h5 className="modal-title text-light" id="videoModalLabel">
                  NTLF Full Video
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <video 
                  id="ntlfFullVideo" 
                  controls
                  style={{ width: '100%', height: 'auto', maxHeight: '70vh', background: '#000' }}
                >
                  <source src="images/NTLF-2026-Intro-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsComingSection;