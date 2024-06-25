import React from "react";

const useScrollPosition = (storageKey: string = 'scrollPosition') => {
  React.useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      localStorage.setItem(storageKey, currentPosition.toString());
    };

    const storedPosition = localStorage.getItem(storageKey);
    if (storedPosition) {
      const parsedPosition = parseInt(storedPosition, 10);
      window.scrollTo(0, parsedPosition);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [storageKey]);
};

export default useScrollPosition;