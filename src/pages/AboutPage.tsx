import { useEffect, useState } from "react";

interface Officer {
  name: string;
  role: string;
  email: string;
  image: string;
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
    [key: string]: string;
  };
}

const AboutUsPage = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Fetch data from the JSON file
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await fetch('/data/officers.json');
        if (!response.ok) {
          throw new Error('Failed to fetch officers data');
        }
        const data = await response.json();
        setOfficers(data);
      } catch (error) {
        console.error('Error fetching officers data:', error);
        // You could set a fallback here if needed
        setOfficers([]);
      }
    };
    
    fetchOfficers();
  }, []);

  // Observer for about section
  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const aboutElement = document.getElementById("about-section");
    if (aboutElement) {
      aboutObserver.observe(aboutElement);
    }
    
    return () => {
      if (aboutElement) {
        aboutObserver.unobserve(aboutElement);
      }
    };
  }, []);

  // Observer for team section
  useEffect(() => {
    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeamVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const teamElement = document.getElementById("team-section");
    if (teamElement) {
      teamObserver.observe(teamElement);
    }
    
    return () => {
      if (teamElement) {
        teamObserver.unobserve(teamElement);
      }
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* About Us Section */}
      <section 
        id="about-section" 
        className="text-black py-20 relative" 
        style={{ backgroundColor: "#A6EBC7" }}
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-green-300 opacity-20"></div>
          <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-green-300 opacity-20"></div>
          <div className="absolute -bottom-10 left-1/4 w-32 h-32 rounded-full bg-green-300 opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 text-center">
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
              style={{ color: "#26353A" }}
            >
              <br></br>
              About Us
            </h1>
            <div 
              className={`h-1 w-24 mx-auto mb-8 transition-all duration-1000 delay-300 ${isAboutVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              style={{ backgroundColor: "#26353A" }}
            ></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Content - Left Side */}
            <div 
              className={`md:w-2/3 pr-0 md:pr-6 mb-10 md:mb-0 transition-all duration-1000 ${isAboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div className="bg-white bg-opacity-70 p-6 md:p-8 rounded-lg shadow-lg backdrop-blur-sm">
                <p className="text-lg leading-relaxed italic">
                  We are a global community of volunteers dedicated to the IEEE
                  mission of fostering technological innovation and excellence for the
                  benefit of humanity. As one of the largest special interest societies
                  within IEEE, the Industry Applications Society (IAS) boasts nearly
                  14,000 members and over 370 chapters worldwide, working at the
                  intersection of theory and practice to advance industry-related
                  solutions.
                </p>
                <div className="my-4 h-0.5 w-full bg-green-200 rounded"></div>
                <p className="text-lg leading-relaxed italic">
                  Our IEEE IAS ISIMS chapter is committed to upholding these
                  principles, providing members with an enriching journey in the world
                  of industry and technology. Through workshops, conferences,
                  competitions, and global collaborations, we equip future leaders with
                  the skills and connections they need to excel. Whether you're looking
                  to grow professionally, build meaningful relationships, or contribute
                  to impactful projects, IAS offers endless opportunities. Join our
                  family and be part of a community that believes in rising together to
                  make a difference!
                </p>
                
                <div className="mt-8">
                  <button 
                    className="inline-block bg-black text-white text-lg font-bold py-2 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10"><a 
                      href="https://ias.ieee.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative z-10"
                    >
                      Learn More
                    </a></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-gray-700 transition-all duration-300 group-hover:h-full -z-0"></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Logo - Right Side */}
            <div 
              className={`md:w-1/3 flex justify-center transition-all duration-1000 delay-500 ${isAboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-200 opacity-50 blur-xl transform -translate-x-2 translate-y-2"></div>
                <img
                  src="images/iasG.png"
                  alt="About Us Logo"
                  className="w-80 md:w-96 lg:w-105 relative z-10 transition-transform duration-500 hover:scale-105"
                />
                <img
                  src="images/ias2.png"
                  alt="About Us Logo"
                  className="w-80 md:w-96 lg:w-96 relative z-10 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Officers Section */}
        <section id="team-section" className="py-20" style={{ backgroundColor: "#26353A" }}>
          <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {officers.map((officer, index) => (
                <div
                  key={officer.email}
                  className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-700 flex flex-col ${
                    isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(officer.email)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={officer.image}
                      alt={officer.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredCard === officer.email ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredCard === officer.email ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="text-white text-center px-4">
                        <p className="mb-2 text-sm">{officer.email}</p>
                        <div className="flex justify-center space-x-4">
                          {(Object.keys(officer.social) as Array<keyof typeof officer.social>).map((platform) => {
                            const iconSrc = {
                              instagram: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg',
                              linkedin: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png',
                              facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
                            }[platform];

                            return (
                              <a
                                key={platform}
                                href={officer.social[platform]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white bg-opacity-20 p-2 rounded-full transition-all duration-300 hover:bg-opacity-40"
                              >
                                <img src={iconSrc} className="w-5 h-5" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-6 transition-all duration-300 flex-1 flex flex-col justify-between"
                    style={{
                      backgroundColor: hoveredCard === officer.email ? '#8de0b5' : '#A6EBC7',
                    }}
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 transition-all duration-300">
                        {officer.name}
                      </h3>
                      <p 
                        className="text-lg font-semibold leading-tight min-h-[3.5rem] flex items-start" 
                        style={{ color: '#26353A' }}
                      >
                        {officer.role}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      {(Object.keys(officer.social) as Array<keyof typeof officer.social>).map((platform) => {
                        const iconSrc = {
                          instagram: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg',
                          linkedin: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png',
                          facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
                        }[platform];

                        return (
                          <a
                            key={platform}
                            href={officer.social[platform]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black transition-transform duration-300 hover:scale-110"
                          >
                            <img src={iconSrc} className="w-5 h-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      
      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#26353A" }}>Our Mission</h2>
              <div className="h-1 w-20 mb-6" style={{ backgroundColor: "#A6EBC7" }}></div>
              <p className="text-gray-700 mb-8">
                To foster technological innovation and excellence for the benefit of humanity by
                connecting industry professionals, academics, and students through knowledge sharing,
                collaboration, and professional development opportunities.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4" style={{ color: "#26353A" }}>Core Values</h3>
                <ul className="space-y-3">
                  {["Excellence", "Innovation", "Integrity", "Collaboration", "Diversity"].map((value, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#A6EBC7" }}></div>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#26353A" }}>Our Vision</h2>
              <div className="h-1 w-20 mb-6" style={{ backgroundColor: "#A6EBC7" }}></div>
              <p className="text-gray-700 mb-8">
                To be a leading global platform that bridges the gap between academic research and industrial application,
                empowering our members to drive technological advancements that address real-world challenges.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4" style={{ color: "#26353A" }}>Strategic Goals</h3>
                <ul className="space-y-3">
                  {[
                    "Expand our global community of professionals and students",
                    "Enhance technical knowledge sharing and educational resources",
                    "Promote industry-academia collaborative research",
                    "Develop future industry leaders through mentorship"
                  ].map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "#A6EBC7" }}></div>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20" style={{ backgroundColor: "#f8f8f8" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#26353A" }}>Our Journey</h2>
            <div className="h-1 w-24 mx-auto mb-6" style={{ backgroundColor: "#A6EBC7" }}></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings to our current achievements, we've grown consistently while 
              staying true to our founding principles.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Timeline events */}
            {[
              { year: "1963", title: "IEEE Formation", description: "The IEEE was formed, bringing together various technical communities." },
              { year: "1972", title: "IAS Established", description: "The IGA Group became the Industry Applications Society (IAS)." },
              { year: "2019", title: "IEEE ISIMS SB Founded", description: "Our local ISIMS Student Branch was established." },
              { year: "2024", title: "IAS ISIMS Chapter Founded", description: "Our Industry Applications Society (IAS) ISIMS SBC was established." },
            ].map((event, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center justify-between mb-12 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white" style={{ backgroundColor: "#A6EBC7" }}></div>
                
                {/* Content */}
                <div className={`md:w-5/12 mb-6 md:mb-0 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <span className="inline-block py-1 px-3 rounded text-white text-sm font-semibold mb-2" style={{ backgroundColor: "#26353A" }}>
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;