import React, { useEffect, useRef } from 'react';

const TicketsSection = () => {
  const ticketStackRef = useRef(null);

  useEffect(() => {
    // Animate "GET YOUR TICKET" heading text
    const ticketsHeadingSection = document.querySelector('.tickets-heading-section');
    const ticketsH2Spans = document.querySelectorAll('.animated-tickets-h2 span');

    const animateTicketsTextOnScroll = () => {
      if (!ticketsHeadingSection || !ticketsH2Spans.length) return;
      const rect = ticketsHeadingSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Start animation when section is more visible (when top is at 90% of viewport)
        const startTrigger = window.innerHeight * 0.9;
        // Make animation slower by using a longer scroll distance
        const rawProgress = Math.min(1, Math.max(0, (startTrigger - rect.top) / (rect.height * 2.5)));
        const progress = Math.min(1, Math.max(0, rawProgress));
        
        // Animate h2 word by word
        const h2Total = ticketsH2Spans.length;
        const h2Visible = Math.floor(progress * h2Total);
        ticketsH2Spans.forEach((span, idx) => {
          if (idx < h2Visible) span.classList.add('visible');
          else span.classList.remove('visible');
        });
      } else {
        ticketsH2Spans.forEach(span => span.classList.remove('visible'));
      }
    };

    window.addEventListener('scroll', animateTicketsTextOnScroll, { passive: true });
    animateTicketsTextOnScroll();

    // Animate discount section text, terms heading, and terms content together
    const animateDiscountTextOnScroll = () => {
      const discountSection = document.querySelector('.discount-section');
      const termsContentSection = document.querySelector('.container.p-lg-5');
      const discountSpans = document.querySelectorAll('.animated-discount span');
      const termsHeadingSpans = document.querySelectorAll('.animated-terms-heading span');
      const termsContentSpans = document.querySelectorAll('.animated-terms-ul span');
      
      if (!discountSection || !discountSpans.length) return;
      
      // Use a combined bounding box that includes both discount section and terms content section
      const discountRect = discountSection.getBoundingClientRect();
      const termsRect = termsContentSection ? termsContentSection.getBoundingClientRect() : discountRect;
      
      // Create a combined viewport area from discount section top to terms content bottom
      const combinedTop = Math.min(discountRect.top, termsRect.top);
      const combinedBottom = Math.max(discountRect.bottom, termsRect.bottom);
      
      if (combinedTop < window.innerHeight && combinedBottom > 0) {
        // Start animation when section is more visible (when top is at 90% of viewport)
        const startTrigger = window.innerHeight * 0.9;
        // Calculate progress based on the combined height of both sections
        const combinedHeight = combinedBottom - combinedTop;
        const rawProgress = Math.min(1, Math.max(0, (startTrigger - combinedTop) / (combinedHeight * 1.5)));
        const progress = Math.min(1, Math.max(0, rawProgress));
        
        const totalDiscountSpans = discountSpans.length;
        const totalTermsHeadingSpans = termsHeadingSpans.length;
        const totalTermsContentSpans = termsContentSpans.length;
        const totalSpans = totalDiscountSpans + totalTermsHeadingSpans + totalTermsContentSpans;
        
        const visibleSpans = Math.floor(progress * totalSpans);
        
        // Phase 1: Animate all discount spans first
        discountSpans.forEach((span, idx) => {
          if (idx < visibleSpans) span.classList.add('visible');
          else span.classList.remove('visible');
        });
        
        // Phase 2: Animate terms heading spans after discount spans are done
        termsHeadingSpans.forEach((span, idx) => {
          const termHeadingIndex = totalDiscountSpans + idx;
          if (termHeadingIndex < visibleSpans) span.classList.add('visible');
          else span.classList.remove('visible');
        });
        
        // Phase 3: Animate terms content spans after heading spans are done
        termsContentSpans.forEach((span, idx) => {
          const termContentIndex = totalDiscountSpans + totalTermsHeadingSpans + idx;
          if (termContentIndex < visibleSpans) span.classList.add('visible');
          else span.classList.remove('visible');
        });
      } else if (combinedBottom < 0) {
        // Only reset when scrolling back up past both sections completely
        discountSpans.forEach(span => span.classList.remove('visible'));
        termsHeadingSpans.forEach(span => span.classList.remove('visible'));
        termsContentSpans.forEach(span => span.classList.remove('visible'));
      }
    };

    window.addEventListener('scroll', animateDiscountTextOnScroll, { passive: true });
    animateDiscountTextOnScroll();



    const ticketStack = ticketStackRef.current;
    if (!ticketStack) return;

    const cards = ticketStack.querySelectorAll('.ticket-card');
    let revealed = 1;

    const showTickets = (count) => {
      cards.forEach((card, idx) => {
        if (idx < count) {
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
          card.style.position = 'relative';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateX(100vw)';
          card.style.position = 'absolute';
        }
      });
    };

    // Check if desktop or mobile/tablet
    if (window.innerWidth >= 992) {
      // Desktop: Scroll animation
      showTickets(revealed);

      const ticketSection = ticketStack.closest('.container-fluid');
      let scrollLocked = false; // Prevent multiple triggers per scroll

      const ticketScrollHandler = (e) => {
        const rect = ticketSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (scrollLocked) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          // Always prevent default scroll while in ticket section
          e.preventDefault();
          e.stopPropagation();

          // Scroll down: reveal more tickets
          if (e.deltaY > 0) {
            if (revealed < cards.length) {
              revealed++;
              showTickets(revealed);
              scrollLocked = true;
              setTimeout(() => { scrollLocked = false; }, 400);
            } else if (revealed === cards.length) {
              // At last ticket, remove event listener to allow normal scroll
              ticketStack.removeEventListener('wheel', ticketScrollHandler);
              scrollLocked = true;
              setTimeout(() => {
                scrollLocked = false;
                // Re-attach listener for when user scrolls back into section
                ticketStack.addEventListener('wheel', ticketScrollHandler, { passive: false });
              }, 100);
            }
          }
          // Scroll up: hide tickets
          else if (e.deltaY < 0) {
            if (revealed > 1) {
              revealed--;
              showTickets(revealed);
              scrollLocked = true;
              setTimeout(() => { scrollLocked = false; }, 400);
            } else if (revealed === 1) {
              // At first ticket, remove event listener to allow normal scroll
              ticketStack.removeEventListener('wheel', ticketScrollHandler);
              scrollLocked = true;
              setTimeout(() => {
                scrollLocked = false;
                // Re-attach listener for when user scrolls back into section
                ticketStack.addEventListener('wheel', ticketScrollHandler, { passive: false });
              }, 100);
            }
          }
        }
      };

      ticketStack.addEventListener('wheel', ticketScrollHandler, { passive: false });

      // Cleanup
      return () => {
        ticketStack.removeEventListener('wheel', ticketScrollHandler);
      };
    } else {
      // Mobile/Tablet: Show all tickets at once without animation
      cards.forEach((card, idx) => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
        card.style.position = 'relative';
        card.style.transition = 'none'; // Remove animation on mobile
      });
    }



    return () => {
      window.removeEventListener('scroll', animateTicketsTextOnScroll);
      window.removeEventListener('scroll', animateDiscountTextOnScroll);
    };
  }, []);

  const tickets = [
    { id: 1, image: "images/ticket-1.webp", alt: "Ticket Type 1" },
    { id: 2, image: "images/ticket-2.webp", alt: "Ticket Type 2" },
    { id: 3, image: "images/ticket-3.webp", alt: "Ticket Type 3" },
    { id: 4, image: "images/ticket-4.webp", alt: "Ticket Type 4" },
    { id: 5, image: "images/ticket-5.webp", alt: "Ticket Type 5" }
  ];

  return (
    <section id="ticket" className="container-fluid py-5 bg-dark text-white">
      <div className="m-0">
        <div className="row mb-4 ps-lg-5 tickets-heading-section">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold text-light text-start animated-tickets-h2">
              <span>GET</span> <span>YOUR</span> <span>TICKET</span>
            </h2>
          </div>
        </div>

        <div className="row g-4 text-center">
          <div 
            ref={ticketStackRef}
            id="ticket-stack" 
            className="d-flex align-items-center"
            style={{ position: 'relative', overflow: 'hidden', justifyContent: 'center' }}
          >
            {tickets.map((ticket, index) => (
              <div 
                key={ticket.id}
                className="ticket-card" 
                style={{ 
                  opacity: index === 0 ? 1 : 0, 
                  transform: index === 0 ? 'translateX(0)' : 'translateX(100vw)', 
                  left: 0 
                }}
              >
                <a href="https://in.explara.com/e/ntlf2026" target="_blank" rel="noopener noreferrer">
                  <img src={ticket.image} alt={ticket.alt} className="img-fluid" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Discount section */}
        <div className="container p-4 my-5 px-lg-5 px-2 discount-section" style={{ border: '1px solid #fff', borderRadius: '35px' }}>
          <div className="row justify-content-center align-items-center position-relative">
            <div className="col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
              <h5 
                className="open-sans offer-headings fw-bold mb-3 text-light animated-discount"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.6em', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  width: '100%' 
                }}
              >
                <img 
                  src="images/percentage-hand.png" 
                  alt="Terms Icon"
                  style={{ height: 'auto', width: '10%', display: 'inline-block' }}
                />
                <span>GROUP</span> <span>DISCOUNT</span>
              </h5>
              <ul className="open-sans offer-ticket-li animated-discount" style={{ textAlign: 'center' }}>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
              </ul>
            </div>
            
            {/* Vertical divider */}
            <div 
              className="d-none d-md-block"
              style={{
                position: 'absolute',
                left: '50%',
                top: '10%',
                height: '80%',
                width: 0,
                borderLeft: '1px solid #fff',
                transform: 'translateX(-50%)'
              }}
            />
            
            <div className="col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
              <h5 
                className="open-sans offer-headings fw-bold mb-3 text-light animated-discount"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.6em', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  width: '100%' 
                }}
              >
                <img 
                  src="images/percentage-star.png" 
                  alt="Terms Icon"
                  style={{ height: 'auto', width: '10%', display: 'inline-block' }}
                />
                <span>OTHER</span> <span>OFFERS</span>
              </h5>
              <h5 className="open-sans animated-discount"><span>Special</span> <span>Pricing</span> <span>For:</span></h5>
              <ul className="open-sans offer-ticket-li animated-discount" style={{ textAlign: 'center' }}>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
                <li><span>5-15</span> <span>Registrations:</span> <span>10%</span> <span>Discount</span></li>
              </ul>
            </div>
          </div>
          
          <h5 className="pt-4 open-sans offer-mail text-center animated-discount">
            <span>To</span> <span>avail</span> <span>these</span> <span>offers,</span> <span>write</span> <span>to</span> <span>us</span> <span>at:</span> 
            <a href="mailto:events@nasscom.in" style={{ textDecoration: 'none', color: '#fff' }} className="animated-discount">
              <span>events@nasscom.in</span>
            </a>
          </h5>
        </div>

        {/* Terms & Conditions */}
        <div className="container py-1 terms-heading-section">
          <h5 className="montserrat terms-ticket text-left mb-3 text-light animated-terms-heading">
            <span>Terms</span> <span>&</span> <span>Conditions:</span>
          </h5>
        </div>
        
        <div className="container p-lg-5 p-3 px-lg-5 px-2 my-5" style={{ border: '1px solid #fff', borderRadius: '35px' }}>
          <div className="pt-1 row justify-content-start">
            <div className="col-12">
              <ul className="terms-ticket-li animated-terms-ul">
                <li>
                  <span>18%</span> <span>GST</span> <span>applicable</span> <span>over</span>
                  <span>the</span> <span>above</span> <span>fee.</span>
                </li>
                <li>
                  <span>You</span> <span>must</span> <span>pay</span> <span>within</span>
                  <span>15</span> <span>days</span> <span>of</span> <span>your</span> 
                  <span>registration</span> <span>or</span> <span>by</span> <span>the</span> 
                  <span>end</span> <span>of</span> <span>the</span> <span>offer</span> 
                  <span>date,</span> <span>whichever</span> <span>comes</span> <span>earlier,</span> 
                  <span>failing</span> <span>the</span> <span>applicable</span> <span>offer</span> 
                  <span>will</span> <span>not</span> <span>be</span> <span>valid</span> 
                  <span>under</span> <span>which</span> <span>the</span> <span>registration</span> 
                  <span>happened.</span>
                </li>
                <li>
                  <span>Cancellations</span> <span>must</span> <span>be</span> <span>confirmed</span>
                  <span>in</span> <span>writing.</span> <span>The</span> <span>last</span>
                  <span>date</span> <span>to</span> <span>cancel</span> <span>your</span>
                  <span>registration</span> <span>is</span> <span>January</span> <span>15,</span>
                  <span>2026,</span> <span>with</span> <span>a</span> <span>75%</span>
                  <span>refund.</span> <span>25%</span> <span>of</span> <span>the</span>
                  <span>fees</span> <span>would</span> <span>be</span> <span>withheld</span> 
                  <span>as</span> <span>processing</span> <span>fees</span> <span>at</span> 
                  <span>any</span> <span>given</span> <span>point</span> <span>in</span> 
                  <span>time.</span> <span>Substitutions</span> <span>are</span> <span>welcome</span> 
                  <span>till</span> <span>February</span> <span>23,</span> <span>2026.</span>
                </li>
                <li>
                  <span>A</span> <span>single</span> <span>ticket</span> <span>grants</span>
                  <span>access</span> <span>to</span> <span>a</span> <span>single</span>
                  <span>attendee</span> <span>on</span> <span>all</span> <span>days</span>
                  <span>of</span> <span>the</span> <span>conference</span> <span>and</span> 
                  <span>is</span> <span>strictly</span> <span>non-transferable.</span> 
                  <span>Organizers</span> <span>reserve</span> <span>the</span> <span>right</span> 
                  <span>to</span> <span>ban</span> <span>participants</span> <span>from</span> 
                  <span>sharing</span> <span>a</span> <span>single</span> <span>ticket</span> 
                  <span>and</span> <span>using</span> <span>the</span> <span>issued</span> 
                  <span>pass/badge</span> <span>with</span> <span>someone</span> <span>else's</span> 
                  <span>name</span> <span>on</span> <span>it</span> <span>from</span> 
                  <span>current</span> <span>and</span> <span>future</span> <span>events.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;