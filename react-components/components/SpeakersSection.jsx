import React, { useEffect } from 'react';

const SpeakersSection = () => {
  useEffect(() => {
    // Animate "The Speakers" heading text
    const speakersHeadingSection = document.querySelector('.speakers-heading-section');
    const speakersH2Spans = document.querySelectorAll('.animated-speakers-h2 span');

    const animateSpeakersTextOnScroll = () => {
      if (!speakersHeadingSection || !speakersH2Spans.length) return;
      const rect = speakersHeadingSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Start animation when section is more visible (when top is at 90% of viewport)
        const startTrigger = window.innerHeight * 0.9;
        // Use similar timing as other sections
        const rawProgress = Math.min(1, Math.max(0, (startTrigger - rect.top) / (rect.height * 1.28)));
        const progress = Math.min(1, Math.max(0, rawProgress));
        
        // Animate h2 word by word
        const h2Total = speakersH2Spans.length;
        const h2Visible = Math.floor(progress * h2Total);
        speakersH2Spans.forEach((span, idx) => {
          if (idx < h2Visible) span.classList.add('visible');
          else span.classList.remove('visible');
        });
      } else {
        speakersH2Spans.forEach(span => span.classList.remove('visible'));
      }
    };

    window.addEventListener('scroll', animateSpeakersTextOnScroll, { passive: true });
    animateSpeakersTextOnScroll();

    // FLIP CARD FUNCTIONALITY - COMMENTED OUT (uncomment to enable)
    // const cards = document.querySelectorAll('.flip-card');
    // const clickHandlers = new Map();
    
    // cards.forEach((card) => {
    //   const handleClick = (e) => {
    //     // Remove 'flipped' from all cards except the clicked one
    //     cards.forEach((c) => {
    //       if (c !== card) c.classList.remove('flipped');
    //     });
    //     // Toggle flipped on clicked card
    //     card.classList.toggle('flipped');
    //   };
    //   clickHandlers.set(card, handleClick);
    //   card.addEventListener('click', handleClick);
    // });

    // CURSOR-FOLLOWING TEXT - COMMENTED OUT (uncomment to enable)
    // const speakersSection = document.getElementById('speakers-cards-section');
    // const cursorText = document.getElementById('cursor-follow-text');
    
    // const onMouseMove = (e) => {
    //   if (cursorText) {
    //     cursorText.style.display = 'block';
    //     cursorText.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 18}px)`;
    //   }
    // };
    
    // const onMouseLeave = () => {
    //   if (cursorText) {
    //     cursorText.style.display = 'none';
    //   }
    // };
    
    // if (speakersSection) {
    //   speakersSection.addEventListener('mousemove', onMouseMove);
    //   speakersSection.addEventListener('mouseleave', onMouseLeave);
    // }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateSpeakersTextOnScroll);
      
      // FLIP CARD CLEANUP - COMMENTED OUT (uncomment when flip cards are enabled)
      // if (speakersSection) {
      //   speakersSection.removeEventListener('mousemove', onMouseMove);
      //   speakersSection.removeEventListener('mouseleave', onMouseLeave);
      // }
      // cards.forEach((card) => {
      //   const handler = clickHandlers.get(card);
      //   if (handler) {
      //     card.removeEventListener('click', handler);
      //   }
      // });
    };
  }, []);

  const speakers = [
    {
      name: "Arvind Krishna",
      company: "IBM",
      designation: "CEO",
      image: "images/Arvind.webp",
      description: "Arvind is a pioneer in the field of genomics and personalized medicine.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Corinne Vigreux",
      company: "TomTom",
      designation: "Co-Founder",
      image: "images/Corinne.webp",
      description: "Sajid drives technological advancements and digital transformation.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Indra Nooyi",
      company: "PepsiCo",
      designation: "Former Chairman & CEO",
      image: "images/Indra.webp",
      description: "Indra leads AI research and machine learning projects.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Nandan Nilekani",
      company: "UIDAI",
      designation: "Founding Chairman",
      image: "images/Nandan.webp",  
      description: "Nandan specializes in big data analytics and insights.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "N Chandrasekaran",
      company: "Tata Sons",
      designation: "Chairman",
      image: "images/Chandrasekaran.webp",
      description: "N Chandrasekaran is a pioneer in cloud infrastructure and SaaS.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Nikki Neuburger",
      company: "Lululemon",
      designation: "Chief Brand Officer",
      image: "images/Nikki-m.webp",
      description: "Nikki leads data strategy and analytics transformation.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Safra A. Catz",
      company: "Oracle",
      designation: "CEO",
      image: "images/Safra-new.webp",
      description: "Safra specializes in product innovation and tech leadership.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    },
    {
      name: "Vint Cerf",
      company: "Google",
      designation: "Head of AI",
      image: "images/Vint-1.webp",
      description: "Vint is an expert in artificial intelligence and ML.",
      points: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi ducimus iusto debitis eligendi adipisci nemo aspernatur harum a, porro quis nostrum incidunt ipsum placeat odio molestiae asperiores dolores consectetur."
      ]
    }
  ];

  const renderSpeakerCard = (speaker, index) => (
    <div className="col-lg-3 col-md-6 col-12" key={index}>
      <div className="speaker-card h-100">
        {/* NORMAL CARD - Currently Active */}
        <div className="normal-card pb-3">
          <img src={speaker.image} alt={speaker.name} className="speaker-photo mb-3" width="100%" />
          <h4
            className={`ps-3 open-sans speaker-name ${window.innerWidth < 992 ? 'mb-0' : 'mb-1'}`}
          >
            {speaker.name}
          </h4>
          <div
            className={`ps-3 open-sans speaker-company ${window.innerWidth < 992 ? 'mb-0' : 'mb-1'}`}
          >
            {speaker.company}
          </div>
          <div className="ps-3 open-sans speaker-designation text-muted">{speaker.designation}</div>
        </div>

        {/* FLIP CARD STRUCTURE - COMMENTED OUT (uncomment to enable flip functionality)
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={speaker.image} alt={speaker.name} className="speaker-photo mb-3" width="100%" />
            <h4 className="ps-3 open-sans speaker-name mb-1">{speaker.name}</h4>
            <div className="ps-3 open-sans speaker-company mb-1">{speaker.company}</div>
            <div className="ps-3 open-sans speaker-designation text-muted">{speaker.designation}</div>
          </div>
          <div className="flip-card-back p-3" style={{ background: '#EAEAEA' }}>
            <h4 className="open-sans speaker-name mb-1 fw-normal">
              {speaker.name} 
              <img
                src="images/right-arrow-flipcard.webp"
                alt="arrow"
                style={{ height: '1.2em', verticalAlign: 'middle', marginLeft: '0.4em' }}
              />
            </h4>
            <div className="lexend speaker-desc mb-2">{speaker.description}</div>
            {speaker.points.map((point, pointIndex) => (
              <div key={pointIndex}>
                <p className="lexend" style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={pointIndex === 0 ? "images/red-cricle.png" : "images/black-cricle.png"}
                    alt="marker"
                    style={{
                      width: '18px',
                      height: '18px',
                      objectFit: 'contain',
                      display: 'inline-block',
                      marginRight: '3em',
                      marginTop: '0.1em'
                    }}
                  />
                  {point}
                </p>
                {pointIndex === 0 && (
                  <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '1rem 0', width: '100%' }} />
                )}
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </div>
  );

  return (
    <>
      <section className="container-fluid mb-lg-0 p-4 p-lg-5 speakers-heading-section">
        {/* animated-speakers-h2 */}
        <h2 className="display-5 fw-bold ">
          <span>Past</span> <span>Speakers</span>
        </h2>
      </section>
      
      <section>
        {/* CURSOR-FOLLOWING TEXT - COMMENTED OUT (uncomment to enable)
        <div 
          id="cursor-follow-text"
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 99999,
            left: 0,
            top: 0,
            display: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            color: '#cb1c1c',
            textShadow: '0 2px 8px #000,0 0 2px #000',
            transition: 'transform 0.08s'
          }}
        >
          Click Here
        </div>
        */}
        
        <div className="container-fluid pb-5" id="speakers-cards-section">
          <div className="row g-0 mb-0">
            {speakers.slice(0, 4).map((speaker, index) => renderSpeakerCard(speaker, index))}
          </div>
          <div className="row g-0 mt-0">
            {speakers.slice(4, 8).map((speaker, index) => renderSpeakerCard(speaker, index + 4))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpeakersSection;