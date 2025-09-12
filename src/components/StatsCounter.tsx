import { useEffect, useState } from "react";

const StatsCounter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const targetCounts = [50, 120, 25, 15];
    const labels = ["Events", "Members", "Projects", "Awards"];
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      
      const element = document.getElementById("stats-section");
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, []);
    
    useEffect(() => {
      if (isVisible) {
        const intervals = counts.map((_, index) => {
          return setInterval(() => {
            setCounts(prevCounts => {
              const newCounts = [...prevCounts];
              if (newCounts[index] < targetCounts[index]) {
                newCounts[index] += 1;
              }
              return newCounts;
            });
          }, 2000 / targetCounts[index]); // Adjust speed based on target
        });
        
        return () => intervals.forEach(interval => clearInterval(interval));
      }
    }, [isVisible, counts, targetCounts]);
  
    return (
      <section id="stats-section" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {counts.map((count, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full text-white"
                  style={{ backgroundColor: '#26353A' }}
                >
                  <span className="text-2xl">+</span>
                </div>
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#26353A' }}>{count}</h3>
                <p className="text-gray-600">{labels[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default StatsCounter;