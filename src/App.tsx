import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';

// Import these if you have them
import EventsPage from './pages/EventsPage';
import MediaPage from './pages/MediaPage';
import JoinPage from './pages/JoinPage';
import ContactUsPage from './pages/ContactUsPage';

import './index.css';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './components/ScrollToTop';
import MonopolyGuyChatbot from './components/MonopolyGuyChatbot';


// IEEE Banner Component
const IEEEBanner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[1002] bg-green-900 text-white py-2 text-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-left justify-left gap-6 py-2 text-left sm:text-base">
          <div className="flex items-left gap-4 flex-wrap justify-left">
            <a 
              href="https://www.ieee.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline text-white-300 hover:text-blue-200 transition-colors"
            >
              IEEE.org
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="https://ias.ieee.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline text-white-300 hover:text-blue-200 transition-colors"
            >
              IEEE IAS.org
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="https://isims.ieee.tn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline text-white-300 hover:text-blue-200 transition-colors"
            >
              IEEE ISIMS SB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};



function App() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <img
            src="/images/ias2.png"
            alt="Loading..."
            className="max-w-xs mx-auto animate-spin"
          />
          <style>{`
            .animate-spin {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans tracking-wide overflow-x-hidden">
      <IEEEBanner />
      <br></br><br></br>
      <Header />
      <main>
        <ScrollToTop />
        <MonopolyGuyChatbot />
        {/*<ModelViewer />  Render the ModelViewer here to show it on all pages */}
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutUs />
              {/*<StatsCounter />*/}
              <TeamSection />
            </>
          } />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

