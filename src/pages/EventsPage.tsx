import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EventItem {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  facebook: string;
  instagram: string;
  linkedin : string
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/data/events.json')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));

    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="text-black p-8" style={{ backgroundColor: '#A6EBC7' }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <br /><br /><br /><br />
          <h2 className="text-4xl font-bold mb-4">Our Events</h2>
          <p className="text-lg">
            Explore the exciting activities organized by the IEEE IAS ISIMS SBC!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {events.map((event, index) => (
    <motion.div
      key={index}
      className="bg-[#26353A] rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover="hover"
      custom={index}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
        <p className="text-sm text-gray-300 mb-2">
          📅 {event.date} | 📍 {event.location}
        </p>
        <p className="text-base text-gray-200 mb-4 flex-grow">{event.description}</p>

        {/* Social media buttons container - always at bottom */}
        <div className="mt-auto">
          <div className="flex justify-center space-x-4 mb-4">
            <motion.a
              href={event.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-all"
            >
              Facebook
            </motion.a>
            <motion.a
              href={event.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="bg-pink-500 text-white text-sm font-bold py-2 px-4 rounded-full transition-all"
            >
              Instagram
            </motion.a>
          </div>

          <div className="flex justify-center">
            <motion.a
              href={event.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#26353A] text-sm font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};

export default EventsPage;
