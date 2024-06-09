import Root from 'app/Root';
import { CreatePost } from 'pages/CreatePost';
import { HabPage } from 'pages/HabPage';
import Login from 'pages/Login';
import { Main } from 'pages/Main';
import { PostPage } from 'pages/PostPage';
import { ProfileSettings } from 'pages/ProfileSettings';
import Register from 'pages/Register';
import SearchPage from 'pages/SearchPage';
import { CommentsList, Profile, Subscribers, UserPage, UserPosts } from 'pages/UserPage';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
      <Route path="/flows/:category/:type/:page" element={<Main />} />
      <Route path="/:type/:postId" element={<PostPage />} />
      <Route path="/user/" element={<UserPage />}>
        <Route path=':userId/:type/:page' element={<CommentsList />} />
        <Route path=':userId/:type' element={<Profile />} />
        <Route path=':userId/:type/:subType/:page' element={<UserPosts />} />
        <Route path=':userId/:type/:page' element={<Subscribers />} />
      </Route>
      <Route path="/hab/:habId/:type/:page" element={<HabPage />} />
      <Route path="/create" element={<CreatePost />}/>
      <Route path="/search/:type/:page" element={<SearchPage />}/>
    </Route>
  )
);