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

    // Safari compatibility fix for video masking
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isSafari) {
      // Hide SVG version and show CSS mask version for Safari
      const svgElement = document.querySelector('.video-text-svg-wrapper svg');
      const safariVideo = document.querySelector('.safari-video-fallback');
      
      if (svgElement && safariVideo) {
        svgElement.style.display = 'none';
        safariVideo.style.display = 'block';
        safariVideo.style.position = 'relative';
        safariVideo.style.width = '100vw';
        safariVideo.style.height = '50vh';
      }
    }
  }, []);

  return (
    <>
      {/* Text-video section */}
      <div className="dark-section dark-bg container-fluid col-12 text-center pt-5 pb-2" style={{ backgroundColor: '#000' }}>
        <h2 className="display-5 fw-bold text-light text-start ps-lg-5" style={{ marginBottom: '0px' }}>
          What's Coming
        </h2>
      </div>
      
     
      

{/* new section */}
<div
  className="container-fluid Section-top"
  style={{
    display: 'flex',
    backgroundColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }}
>
  <div
    className="open-sans highlight-number"
    style={{
      background: "url('images/NTLF-2026-Intro-video.gif') center/cover",
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      WebkitTextStroke: '1px #69686847',
    }}
  >
    NTLF
  </div>
</div>
{/* new section */}

      <div className="dark-section container-fluid col-12 text-center pb-5" style={{ backgroundColor: '#000' }}>
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