import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
      <footer className="bg-white p-8">
        <div className="w-full flex justify-center">
        <div className="container mx-auto">
          <Link to="/contact">
            <img 
              src="/images/contact.png" 
              alt="Contact" 
              className="h-40 mx-auto" 
            />
          </Link>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61572324778458"><img src="/images/facebook.png" alt="Facebook" className="h-6" /></a>
            <a href="https://www.instagram.com/ieee_ias_isims/"><img src="/images/instagram.png" alt="Instagram" className="h-6" /></a>
            <a href="https://www.linkedin.com/company/ieee-ias-isims-sbc/"><img src="/images/linkedin.png" alt="LinkedIn" className="h-6" /></a>
          </div>
          <br /><hr />
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
            <img src="/images/iasB.png" alt="Logo" className="h-30 w-40" />
            <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              <Link to="/" className="hover:text-green-500">Home</Link>
              <Link to="/events" className="hover:text-green-500">Events</Link>
              <Link to="/media" className="hover:text-green-500">Media</Link>
              <Link to="/about" className="hover:text-green-500">About us</Link>
            </nav>
            <p className="text-center md:text-right mt-3 text-xs">© Copyright <b>IEEE IAS SIMS SBC</b>. All Rights Reserved.</p>
          </div>
        </div>
        </div>
      </footer>
    );
  };

export default Footer;