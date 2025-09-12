import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');  // This will route to the AboutUsPage
  };

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("about-section");
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about-section" className="text-black py-20" style={{ backgroundColor: '#A6EBC7' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className={`md:w-2/5 mb-10 md:mb-0 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <img 
            src="/images/ias2.png" 
            alt="About Us Logo" 
            className="w-80 md:w-96 mx-auto md:mx-40 transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div  onClick={handleClick}  className={`md:w-3/5 max-w-xl transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-6 md:text-left text-center">
            About us
            <div className="h-1 w-20 bg-green-600 mt-2 mx-auto md:mx-0"></div>
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            The IEEE ISIMS Student Branch (SB) was founded in 2019, marking the start of our local student activities.
            In 2024, the IAS ISIMS Student Branch Chapter (SBC) was established,
            expanding our branch with the Industry Applications Society community.
          </p>
          
          <div className="flex md:justify-start justify-center">
            <button 
              className="inline-block bg-black text-white text-lg font-bold py-2 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">More</span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-gray-700 transition-all duration-300 group-hover:h-full -z-0"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;