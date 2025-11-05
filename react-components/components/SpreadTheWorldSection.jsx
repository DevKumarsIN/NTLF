import React, { useState } from 'react';

const SpreadTheWorldSection = () => {
  const cards = [
    {
      image: "images/spred-card-one.webp",
      alt: "Spread Card 1",
      link: "https://in.explara.com/e/ntlf2026"
    },
    {
      image: "images/spred-card-two.webp", 
      alt: "Spread Card 2",
      link: "https://in.explara.com/e/ntlf2026"
    },
    {
      image: "images/spred-card-three.webp",
      alt: "Spread Card 3", 
      link: "https://in.explara.com/e/ntlf2026"
    }
  ];

  // Track tooltip/copy state for each embed button
  const [embedStatus, setEmbedStatus] = useState([false, false, false]);
  const [hovered, setHovered] = useState([false, false, false]);

  const handleEmbed = (embedText, idx) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedText);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = embedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    // Show "Copied!" for this button
    setEmbedStatus(status => status.map((v, i) => i === idx ? true : false));
    setTimeout(() => {
      setEmbedStatus(status => status.map((v, i) => i === idx ? false : v));
    }, 1200);
  };

  // Example: custom embed texts for each card
  const embedTexts = [
    '<div><a href="images/spred-card-one.webp" target="_blank"><img src="images/spred-card-one.webp" alt="Spread Card 1" width="400" height="400" /></a></div>',
    '<div><a href="images/spred-card-two.webp" target="_blank"><img src="images/spred-card-two.webp" alt="Spread Card 2" width="400" height="400" /></a></div>',
    '<div><a href="images/spred-card-three.webp" target="_blank"><img src="images/spred-card-three.webp" alt="Spread Card 3" width="400" height="400" /></a></div>'
  ];

  return (
    <section className="dark-section py-3 py-sm-5 container-fluid" style={{ backgroundColor: '#000000' }}>
      <div className="container-fluid p-sm-5 p-1 m-0">
        <div className="col-12 text-center mb-5">
          <h2 className="display-5 fw-bold text-light text-start">Spread The World</h2>
        </div>
        <div className="row g-4 text-center">
          {cards.map((card, index) => (
            <div className="col-lg-4 col-md-4 col-sm-12" key={index}>
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={card.image} 
                  alt={card.alt} 
                  className="img-fluid w-100" 
                />
              </a>
              <div className="mt-2 d-flex flex-row align-items-center w-100 px-3 pt-3">
                <a className='montserrat'
                  href={card.image}
                  download
                  style={{
                    color: '#fff',
                    cursor: 'pointer',
                    marginBottom: 0,
                    textDecoration: 'none', // Remove underline
                    fontWeight: '700'
                  }}
                >
                  DOWNLOAD
                </a>
                <div style={{ flex: 1 }} />
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button className='montserrat'
                    type="button"
                    onClick={() => handleEmbed(embedTexts[index], index)}
                    onMouseEnter={() => setHovered(h => h.map((v, i) => i === index ? true : v))}
                    onMouseLeave={() => setHovered(h => h.map((v, i) => i === index ? false : v))}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: '700'
                    }}
                  >
                    EMBED
                  </button>
                  {(hovered[index] || embedStatus[index]) && (
                    <span
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '120%',
                        background: '#222',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 4,
                        fontSize: 13,
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      {embedStatus[index] ? 'Copied!' : 'Copy embed code'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpreadTheWorldSection;