import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialMedia {
  platform: string;
  description: string;
  link: string;
  color: string;
}

const MediaPage: React.FC = () => {
  const [mediaLinks, setMediaLinks] = useState<SocialMedia[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/data/media.json')
      .then((response) => response.json())
      .then((data) => setMediaLinks(data))
      .catch((error) => console.error('Error fetching media links:', error));

    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const renderIcon = (platform: string, color: string) => {
    const commonProps = { size: 50, color };
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <FaFacebook {...commonProps} />;
      case 'instagram':
        return <FaInstagram {...commonProps} />;
      case 'linkedin':
        return <FaLinkedin {...commonProps} />;
      default:
        return null;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
          <h2 className="text-4xl font-bold mb-4">Follow Us</h2>
          <p className="text-lg">
            Stay connected with IEEE IAS ISIMS SBC through our social media platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaLinks.map((media, index) => (
            <motion.div
              key={index}
              className="bg-[#26353A] text-white rounded-lg overflow-hidden shadow-lg p-6 text-center"
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              whileHover="hover"
              custom={index}
            >
              <div className="flex justify-center mb-4">
                {renderIcon(media.platform, media.color)}
              </div>
              <h3 className="text-2xl font-bold mb-2">{media.platform}</h3>
              <p className="mb-4 text-gray-300">{media.description}</p>
              <motion.a
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-white text-[#26353A] font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition"
              >
                Visit
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPage;
