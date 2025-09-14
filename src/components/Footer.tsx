import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
      <footer className="bg-gradient-to-br from-white-500 to-gray-10 pt-16 pb-8">
        
        {/* Location and Contact Info Section */}
        <div >
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Location Section */}
              <div className="space-y-6 ml-19">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-grey-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-grey-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Location</h3>
                    <p className="text-gray-600">Find us here</p>
                  </div>
                </div>
                
                {/* Mini Google Map */}
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5234567890123!2d10.7546537!3d34.8392368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d19db21e2b53%3A0x771c533873752407!2sHigher%20Institute%20of%20Computer%20Science%20and%20Multimedia%20of%20Sfax!5e0!3m2!1sen!2stn!4v1600000000000!5m2!1sen!2stn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ISIMS Location Map"
                  ></iframe>
                </div>
              </div>
              
              {/* Contact Info Section */}
              <div className="space-y-6 max-w-xs mx-auto ml-40">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-grey-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-grey-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Contact Info</h3>
                    <p className="text-gray-600">Get in touch with us</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-grey-50 p-6 rounded-lg border-l-4 border-grey-500">
                    <div className="flex items-center space-x-4">
                      <div className="bg-grey-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-grey-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg text-grey-700 font-medium">Phone</p>
                        <p className="text-lg text-grey-800 font-semibold">+216 53 744 705</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-grey-50 p-6 rounded-lg border-l-4 border-grey-500">
                    <div className="flex items-center space-x-4">
                      <div className="bg-grey-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-grey-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg text-grey-700 font-medium">Email</p>
                        <p className="text-lg text-grey-800 font-semibold">ieee.ias.isims@ieee.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Us Header */}
              <div className="space-y-6 ml-20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-grey-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-grey-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">IEEE IAS ISIMS SBC</h3>
                    <p className="text-gray-600">Connect with us</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61572324778458" 
                    className="group bg-grey-50 p-3 rounded-lg hover:bg-grey-100 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-lg font-medium text-gray-700">Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/ieee_ias_isims/" 
                    className="group bg-grey-50 p-3 rounded-lg hover:bg-grey-100 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5 text-pink-600 group-hover:text-pink-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-lg font-medium text-gray-700">Instagram</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/ieee-ias-isims-sbc/" 
                    className="group bg-grey-50 p-3 rounded-lg hover:bg-grey-100 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5 text-blue-700 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-lg font-medium text-gray-700">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        {/* Bottom Section */}
        <div className="container mx-auto px-6 pb-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <img src="/images/iasB.png" alt="Logo" className="h-30 w-40" />
              <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                <Link to="/" className="hover:text-green-500">Home</Link>
                <Link to="/events" className="hover:text-green-500">Events</Link>
                <Link to="/media" className="hover:text-green-500">Media</Link>
                <Link to="/about" className="hover:text-green-500">About us</Link>
              </nav>
            </div>
            <p className="text-center text-xs">© Copyright <b>IEEE IAS SIMS SBC</b>. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;