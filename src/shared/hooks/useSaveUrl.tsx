import React from 'react';
import { useLocation } from 'react-router-dom';

function useSaveUrl() {
  let location = useLocation();
  
  React.useEffect(() => {
    localStorage.setItem('lastVisitedUrl', location.pathname)
  }, [location]);
}

export default useSaveUrl