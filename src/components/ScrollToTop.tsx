// components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // or 'auto' if you want no animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
