import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Media', path: '/media' },
    { name: 'About us', path: '/about' },
  ];

  const actionButtons = [
    { name: 'Join us', path: '/join' },
    { name: 'Contact us', path: '/contact' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <header
      className={`text-white p-4 fixed w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-opacity-95 shadow-md' : 'bg-opacity-80'
      }`}
      style={{ backgroundColor: '#26353A' }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <Link to="/">
            <img
              src="/images/ias.png"
              alt="Logo"
              className="h-16 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="hidden md:flex space-x-6"
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item, i) => (
            <motion.li key={i} custom={i + 1} variants={itemVariants}>
              <Link
                to={item.path}
                className="text-xl relative group hover:text-green-400"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Action Buttons */}
        <motion.div
          className="space-x-3 hidden md:flex"
          initial="hidden"
          animate="visible"
        >
          {actionButtons.map((btn, i) => (
            <motion.div
              key={i}
              custom={navItems.length + i + 1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={btn.path}
                className="relative overflow-hidden text-black font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg group"
                style={{ backgroundColor: '#A7F1CC' }}
              >
                <span className="relative z-10">{btn.name}</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded"></span>
                <span className="shine absolute top-0 left-[-75%] w-full h-full bg-white opacity-20 transform rotate-45 pointer-events-none"></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            <div
              className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                menuOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                menuOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-all ${
                menuOpen ? 'transform -rotate-45 -translate-y-2' : ''
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full shadow-lg transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        style={{ backgroundColor: '#1e2b30' }}
      >
        <div className="container mx-auto py-4 px-4">
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-white hover:text-green-400 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex flex-col space-y-2">
              {actionButtons.map((btn, index) => (
                <Link
                  key={index}
                  to={btn.path}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-black font-bold py-2 px-4 rounded transition-all"
                  style={{ backgroundColor: '#A7F1CC' }}
                >
                  {btn.name}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Inline Shine Animation */}
      <style>{`
        @keyframes shine {
          0% { left: -75%; }
          100% { left: 125%; }
        }
        .group:hover .shine {
          animation: shine 0.8s forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
