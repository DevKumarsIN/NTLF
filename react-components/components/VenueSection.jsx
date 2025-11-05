import React from 'react';

const VenueSection = () => {
  return (
    <section 
      className="container-fluid" 
      style={{ 
        position: 'relative', 
        height: '80vh', // Increased from 70vh to 80vh
        width: '100vw', 
        overflow: 'hidden' 
      }}
      id="map-section"
    >
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100%', // Use 100% to match section height
          objectFit: 'cover', 
          zIndex: 1 
        }}
      >
        <source src="images/map-gif-4.mp4" type="video/mp4" />
        {/* fallback image if video not supported */}
        <img 
          src="images/bg-fallback.jpg" 
          alt="Background" 
          style={{ width: '100vw', height: '100%', objectFit: 'cover' }}
        />
      </video>
      
      <div 
        className="venue-info-box"
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '10%',
          zIndex: 2,
          background: '#000',
          color: '#fff',
          padding: '2rem 2rem 1rem 3rem',
          borderRadius: '1.2rem',
          width: '450px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          fontSize: '1rem',
          lineHeight: 1.15
        }}
      >
        <h4 className='open-sans' style={{ margin: '0 0 0.8rem 0', textAlign: 'left', fontWeight: 700, paddingLeft: 'calc(24px + 0.8rem)' }}>
          Venue & Info
        </h4>

        {/* Day & Date (calendar icon on left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem', lineHeight: '1.5rem' }}>
          <img 
            src="images/calender.png" 
            alt="Calendar" 
            style={{ flex: '0 0 24px', width: '24px', height: '24px' }}
          />
          <div>
            <div>Tuesday & Wednesday</div>
            <div className='open-sans' style={{ fontSize: '0.95rem', opacity: 0.95 }}>February 24-25, 2026</div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '0.6rem 0' }} />

        {/* Time (clock icon on left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
          <img 
            src="images/watch.png" 
            alt="Time" 
            style={{ flex: '0 0 24px', width: '24px', height: '24px', }}
          />
          <div style={{ flex: '1' }}>
            <hr style={{ 
              border: 'none', 
              borderTop: '1px solid #fff', 
              margin: '0 0 0.4rem 0'
            }} />
            {/* <div>Time</div> */}
            <div className='open-sans py-3' style={{ fontSize: '0.95rem', opacity: 0.95 }}>9AM Onwards</div>
            <hr style={{ 
              border: 'none', 
              borderTop: '1px solid #fff', 
              margin: '0.4rem 0 0 0'
            }} />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '0.6rem 0' }} />

        {/* Address (location icon on left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.1rem' }}>
          <img 
            src="images/map.png" 
            alt="Location" 
            style={{ flex: '0 0 24px', width: '24px', height: '26px' }}
          />
          <div className='open-sans' style={{ fontSize: '0.95rem' }}>
            Fairmont, Mumbai
          </div>
        </div>
        
        {/* Click to view on map (bottom-right) */}
        <a 
          className="button-font btn btn-primary rounded-pill px-4 py-2 fw-bold"
          href="https://www.google.com/maps/search/Grand+Hyatt+Mumbai" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            position: 'relative', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: 600, 
            float: 'right' 
          }}
        >
          VIEW ON MAP
        </a>

        <div style={{ clear: 'both' }}></div>
      </div>
    </section>
  );
};

export default VenueSection;