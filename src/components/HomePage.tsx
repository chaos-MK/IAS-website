import React from 'react';
import HeroSection from './HeroSection';
import AboutUs from './AboutUs';
import TeamSection from './TeamSection';
const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <TeamSection />
    </>
  );
};
export default HomePage;