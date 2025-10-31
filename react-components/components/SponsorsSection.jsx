import React from 'react';

const SponsorsSection = () => {
  const sponsors = {
    statePartner: {
      title: "State Partner",
      image: "images/maharastra.png",
      alt: "Maharashtra"
    },
    partners: [
      {
        title: "AI Platform Partner",
        image: "images/cognizzent.png",
        alt: "Cognizant"
      },
      {
        title: "ESG Partner", 
        image: "images/hsbc.png",
        alt: "HSBC"
      }
    ],
    platinum: [
      {
        image: "images/finecial-times.png",
        alt: "Financial Times"
      },
      {
        image: "images/genpact.png",
        alt: "Genpact"
      },
      {
        image: "images/microsoft.png",
        alt: "Microsoft"
      }
    ],
    gold: [
      {
        image: "images/accenture.png",
        alt: "Accenture"
      },
      {
        image: "images/acces.png",
        alt: "Access"
      },
      {
        image: "images/atlassian.png",
        alt: "Atlassian"
      }
    ],
    silver: [
      {
        image: "images/kpmg.png",
        alt: "KPMG"
      },
      {
        image: "images/kytes.png",
        alt: "Kytes"
      },
      {
        image: "images/mendix.png",
        alt: "Mendix"
      }
    ]
  };

  return (
    <>
      <section className="container-fluid mb-lg-0 p-4 p-lg-5" id="our-sponsors">
        <h2 className="display-5 fw-bold mb-4">
          <span>Our Sponsors</span>
        </h2>
      </section>
      
      <section className="container pb-5">
        {/* State Partner */}
        <div className="centered-heading-image">
          <h2 className="lexend centered-heading">{sponsors.statePartner.title}</h2>
          <img 
            src={sponsors.statePartner.image} 
            alt={sponsors.statePartner.alt} 
            className="centered-image" 
            width="100px" 
          />
        </div>
        
        {/* AI Platform & ESG Partners */}
        <div className="row pt-5">
          {sponsors.partners.map((partner, index) => (
            <div className="col-6" key={index}>
              <div className="centered-heading-image">
                <h2 className="lexend centered-heading">{partner.title}</h2>
                <img 
                  src={partner.image} 
                  alt={partner.alt} 
                  className="centered-image" 
                  width="150px" 
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Platinum Sponsors */}
        <div className="row pt-5">
          <h2 className="lexend centered-heading">Platinum Sponsors</h2>
          {sponsors.platinum.map((sponsor, index) => (
            <div className="col-4" key={index}>
              <div className={`centered-heading-image ${index === 0 ? 'text-end' : index === 2 ? 'text-start' : ''}`}>
                <img 
                  src={sponsor.image} 
                  alt={sponsor.alt} 
                  className="centered-image" 
                  width="150px" 
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gold Sponsors */}
        <div className="row pt-5">
          <h2 className="lexend centered-heading">Gold Sponsors</h2>
          {sponsors.gold.map((sponsor, index) => (
            <div className="col-4" key={index}>
              <div className={`centered-heading-image ${index === 0 ? 'text-end' : index === 2 ? 'text-start' : ''}`}>
                <img 
                  src={sponsor.image} 
                  alt={sponsor.alt} 
                  className="centered-image" 
                  width="150px" 
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Silver Sponsors */}
        <div className="row pt-5">
          <h2 className="lexend centered-heading">Silver Sponsors</h2>
          {sponsors.silver.map((sponsor, index) => (
            <div className="col-4" key={index}>
              <div className={`centered-heading-image ${index === 0 ? 'text-end' : index === 2 ? 'text-start' : ''}`}>
                <img 
                  src={sponsor.image} 
                  alt={sponsor.alt} 
                  className="centered-image" 
                  width="150px" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SponsorsSection;