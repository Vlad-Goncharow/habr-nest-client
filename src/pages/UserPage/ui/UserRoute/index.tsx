import React from 'react'
import { useParams } from 'react-router-dom'
import UserPosts from '../UserPosts'
import Profile from '../Profile'
import CommentsList from '../CommentsList'
import Subscribers from '../Subscribers'
import UserFavorites from '../UserFavorites'

function UserRoute() {
  const {type} = useParams()
  
  return (
    <>
      {
        (type === 'profile' && <Profile /> ) ||
        (type === 'publications' && <UserPosts /> ) ||
        (type === 'favorites' && <UserFavorites /> ) ||
        (type === 'comments' && <CommentsList />) ||
        ((type === 'subscribers' || type === 'subscriptions') && <Subscribers />)
      }             
    </>
  )
}

export default UserRoute