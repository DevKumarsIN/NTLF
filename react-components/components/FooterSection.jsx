import React from 'react';

const FooterSection = () => {
  const contactInfo = [
    {
      title: "For Registrations:",
      email: "events@nasscom.in",
      icon: "images/Email.png"
    },
    {
      title: "For Sponsorships:",
      email: "sponsor@nasscom.in", 
      icon: "images/Email.png"
    },
    {
      title: "For Speakers:",
      email: "speakers@nasscom.in",
      icon: "images/Email.png"
    }
  ];

  return (
    <footer
      id="contact"
      className="footer-section bg-darks p-1 p-sm-5 py-5"
      style={{ overflowX: 'hidden' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 fw-bold mb-4">GET IN TOUCH</h2>
            
            <div
              className={`email-row row ${window.innerWidth < 992 ? 'g-2' : 'g-4'}`}
            >
              {contactInfo.map((contact, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="footer-column">
                    <h5 className="montserrat mb-1">{contact.title}</h5>
                    <h5>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="montserrat text-decoration-none text-dark d-flex align-items-center"
                      >
                        <img 
                          src={contact.icon} 
                          alt="Email Icon"
                          style={{ width: '20px', height: '20px', marginRight: '10px' }}
                        />
                        {contact.email}
                      </a>
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            
            <p
              className={`montserrat lead-footer ${window.innerWidth < 992 ? 'py-2' : 'py-5'}`}
            >
              nasscom will not permit entry to nasscom Technology & Leadership Forum 2026 ("event")
              against any ticket or free/complimentary pass sold, issued or obtained from any source 
              other than from nasscom's event website. Entry to the event will be allowed only against 
              tickets purchased/allotted through the nasscom event website at{' '}
              <a 
                className="montserrat" 
                href="https://nasscom.in/ntlf/" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#000' }}
              >
                nasscom.in/ntlf
              </a>.
            </p>
          </div>
        </div>
      </div>
      
      {/* Custom bottom row */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 d-flex flex-row">
            <a 
              href="terms.html" 
              className="me-4 montserrat terms" 
              style={{ fontSize: '1.1rem', color: '#333' }}
            >
              Terms & Conditions
            </a>
            <a 
              href="privacy.html" 
              className="montserrat terms" 
              style={{ fontSize: '1.1rem', color: '#333' }}
            >
              Privacy Policy
            </a>
          </div>
          <div className="col-md-4 text-end">
            <span 
              className="montserrat copyright"
              style={{
                fontSize: '1.1rem',
                color: '#333',
                display: window.innerWidth < 992 ? 'block' : 'inline',
                textAlign: window.innerWidth < 992 ? 'center' : 'right',
                width: window.innerWidth < 992 ? '100%' : 'auto'
              }}
            >
              Copyright 2026, NTLF. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;