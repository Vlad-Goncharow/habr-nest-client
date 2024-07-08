import React from 'react';
import { useLocation } from 'react-router-dom';

function useSaveUrl() {
  let location = useLocation();
  
  React.useEffect(() => {
    const url = `${location.pathname}${location.search || location.hash || ''}`;
    localStorage.setItem('lastVisitedUrl', url);
  }, [location]);
}

export default useSaveUrl