import { fetchAuth } from 'entities/User';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import useSaveUrl from 'shared/hooks/useSaveUrl';
import PageWrapper from 'shared/ui/PageWrapper';
import FetchModal from 'widgets/FetchModal';
import Header from 'widgets/Header/ui/Header/Header';

function Root() {
  useSaveUrl()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const auth = async () => {
    const data = await dispatch(fetchAuth())
    
    if (data.payload !== undefined && 'accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken);
    }
  }

  React.useEffect(() => {
    auth()
    
    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
    if (lastVisitedUrl && lastVisitedUrl !== '/') {
      navigate(lastVisitedUrl, { replace: true });
    } else {
      navigate('/flows/all/articles/1', { replace: true })
    }
  }, [navigate])

  return (
    <div className="App">
      <Header />
      <FetchModal />
      
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </div>
  );
}

export default Root;
