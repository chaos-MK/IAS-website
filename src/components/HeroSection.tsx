import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {

   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');  // This will route to the AboutUsPage
  };

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-24">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/mainIAS.jfif" 
          alt="Hero Image" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      
      <div 
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
      >
        <div className="bg-opacity-80 p-8 rounded-lg" style={{ backgroundColor: 'rgba(38, 53, 58, 0.8)' }}>
          <div className="flex justify-center items-center gap-6 mb-6">
            <img 
              src="/images/ieee.png" 
              alt="IEEE Logo" 
              className={`w-32 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} 
            />
            <div className="h-16 w-0.5 bg-white"></div>
            <img 
              src="/images/ias.png" 
              alt="IEEE IAS Logo" 
              className={`w-36 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} 
            />
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            BUILT FOR INDUSTRY <br /> WIRED FOR CHANGE
          </h1>
          
          <div className={`mt-8 transition-all duration-700 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button  onClick={handleClick}
              className="bg-green-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-green-500 hover:shadow-lg"
            >
              Discover More
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;