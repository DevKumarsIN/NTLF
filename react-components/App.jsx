import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

// Import all components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import PillarsSection from './components/PillarsSection';
import SpeakersSection from './components/SpeakersSection';
import TicketsSection from './components/TicketsSection';
import VenueSection from './components/VenueSection';
import WhatsComingSection from './components/WhatsComingSection';
import SponsorsSection from './components/SponsorsSection';
import SpreadTheWorldSection from './components/SpreadTheWorldSection';
import FooterSection from './components/FooterSection';
import Loader from './components/Loader';

function App() {
  return (
    <div className="App">
      <Loader />
      {/* HTML Head meta tags would go in index.html or Helmet for React */}
      
      {/* Header with Navigation and Fixed Round Button */}
      <Header />
      
      {/* Hero Section with Frame Animation / Mobile Video */}
      <HeroSection />
      
      {/* Stats Section with Animated Counters */}
      <StatsSection />
      
      {/* About NTLF Section */}
      <AboutSection />
      
      {/* The Pillars Section with Feature Cards */}
      <PillarsSection />
      
      {/* Speakers Section with Flip Cards */}
      <SpeakersSection />
      
      {/* Tickets Section with Scroll Animation */}
      <TicketsSection />
      
      {/* Venue Section with Video Background */}
      <VenueSection />

      {/* What's Coming Section with Video Text */}
      <WhatsComingSection />

      {/* Our Sponsors Section */}
      {/* <SponsorsSection /> */}

      {/* Spread The World Section */}
      <SpreadTheWorldSection />

      {/* Footer Contact Section */}
      <FooterSection />
      
      {/* Bootstrap JS and custom scripts would be handled through React effects */}
    </div>
  );
}

export default App;