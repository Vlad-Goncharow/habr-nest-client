import { fetchAuth } from 'entities/User';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import Header from 'widgets/Header/ui/Header/Header';

function Root() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const auth = async () => {
    const data: any = await dispatch(fetchAuth())

    if ('accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken);
    }
  }

  React.useEffect(() => {
    auth()
    navigate('/flows/all/posts/1', { replace: true });
  }, [navigate])

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
