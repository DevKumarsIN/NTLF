import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    // Initialize Bootstrap Collapse
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    let bsCollapse = null;

    if (window.bootstrap && navbarCollapse) {
      bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
    }

    // Toggle close on toggler click if open
    const handleTogglerClick = () => {
      if (navbarCollapse?.classList.contains('show')) {
        if (bsCollapse) bsCollapse.hide();
      }
    };

    // Close on nav-link click (for mobile)
    const handleNavLinkClick = () => {
      if (navbarCollapse?.classList.contains('show')) {
        if (bsCollapse) bsCollapse.hide();
      }
      // Unlock scroll after navbar link click
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };

    // Close on click outside navbar when open (mobile only)
    const handleOutsideClick = (e) => {
      if (
        navbarCollapse?.classList.contains('show') &&
        !navbarCollapse.contains(e.target) &&
        !navbarToggler?.contains(e.target)
      ) {
        if (bsCollapse) bsCollapse.hide();
      }
    };

    // Add event listeners
    navbarToggler?.addEventListener('click', handleTogglerClick);
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });
    document.addEventListener('click', handleOutsideClick);

    // Also unlock scroll if user jumps to a section via anchor (hashchange)
    const handleHashChange = () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      navbarToggler?.removeEventListener('click', handleTogglerClick);
      document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleRegisterClick = () => {
    window.open('https://in.explara.com/e/ntlf2026', '_blank');
  };

  return (
    <>
      {/* Fixed round button (top right, below navbar, not overlapping) */}
      <button 
        id="fixedRoundBtn" 
        className="fixed-round-btn" 
        title="Action"
        onClick={handleRegisterClick}
        onMouseEnter={e => {
          const img = e.currentTarget.querySelector('.fixed-btn-img');
          if (img) img.src = 'images/white-arrow.png';
        }}
        onMouseLeave={e => {
          const img = e.currentTarget.querySelector('.fixed-btn-img');
          if (img) img.src = 'images/fix-button-middle-arrow.png';
        }}
      >
        <img src="images/fix-button-middle-arrow.png" alt="Button Icon" className="fixed-btn-img" />
        <span className="rotating-texts-svg">
          <svg width="100" height="100" viewBox="0 0 100 100"
            style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
            <defs>
              <path id="circlePath" d="M50,12 a38,38 0 1,1 0,76 a38,38 0 1,1 0,-76" />
            </defs>
            <text fontSize="11" fontWeight="600" fill="#000" textLength="400" lengthAdjust="spacingAndGlyphs">
              <textPath xlinkHref="#circlePath" startOffset="0">
                REGISTER NOW. REGISTER NOW. REGISTER NOW. REGISTER NOW.
              </textPath>
            </text>
          </svg>
        </span>
      </button>

      {/* Fixed Navbar (hidden by default) */}
      <nav 
        id="fixedNavbar"
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-md-5 px-lg-5 px-sm-1 px-xs-1"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          zIndex: 9999, 
          display: 'block' 
        }}
      >
        <div className="max-width container-fluid px-md-5 px-lg-5 px-sm-1 px-xs-1">
          <a className="navbar-brand" href="#">
            <img src="images/logo.webp" alt="nasscom logo" height="36" />
          </a>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item nav-gap">
                <a className="nav-link text-dark" style={{ fontWeight: 500 }}
                  href="#speakers-cards-section">PAST SPEAKERS</a>
              </li>
              <li className="nav-item nav-gap">
                <a className="nav-link text-dark" style={{ fontWeight: 500 }} 
                  href="#map-section">VENUE</a>
              </li>
              <li className="nav-item nav-gap">
                <a className="nav-link text-dark" style={{ fontWeight: 500 }} 
                  href="https://in.explara.com/e/ntlf2026">NTLF APP</a>
              </li>
              {/* <li className="nav-item nav-gap">
                <a className="nav-link text-dark" style={{ fontWeight: 500 }} 
                  href="#our-sponsors">OUR SPONSORS</a>
              </li> */}
            </ul>
            <a 
              className="font-poppins button-font btn btn-primary rounded-pill px-4 py-2" 
              style={{ fontWeight: 800 }}
              href="https://in.explara.com/e/ntlf2026"
            >
              GET YOUR TICKETS
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;