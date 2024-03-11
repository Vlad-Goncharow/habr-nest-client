import Root from 'app/Root';
import { HabPage } from 'pages/HabPage';
import Login from 'pages/Login';
import Main from 'pages/Main';
import { PostPage } from 'pages/PostPage';
import { UserPage } from 'pages/UserPage';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/login" element={<Login />} />
      <Route path="/flows/:category/:type/:page" element={<Main />} />
      <Route path="/:type/:postId" element={<PostPage />} />
      <Route path="/user/:userId/:type?/:subType?/:page?/" element={<UserPage />}/>
      <Route path="/hab/:habId/:type?/:page?/" element={<HabPage />}/>
    </Route>
  )
);