import React from 'react'
import { useParams } from 'react-router-dom'
import UserPosts from '../UserPosts'
import Profile from '../Profile'
import CommentsList from '../CommentsList'
import Subscribers from '../Subscribers'

function UserRoute() {
  const {type} = useParams()
  
  return (
    <>
      {
        (type === 'profile' && <Profile /> ) ||
        (type === 'publications' && <UserPosts /> ) ||
        (type === 'comments' && <CommentsList />) ||
        ((type === 'subscribers' || type === 'subscriptions') && <Subscribers />)
      }             
    </>
  )
}

export default UserRoute