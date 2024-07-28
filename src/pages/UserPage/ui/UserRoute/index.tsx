import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import UserPosts from '../UserPosts'
import CommentsList from '../CommentsList'
import Subscribers from '../Subscribers'
import UserFavorites from '../UserFavorites'
import { Profile } from '../Profile'
import { IUser } from 'entities/User'

function UserRoute() {
  const { type } = useParams()
  const userData: IUser = useOutletContext()

  return (
    <>
      {(type === 'profile' && <Profile userData={userData} />) ||
        (type === 'publications' && <UserPosts />) ||
        (type === 'favorites' && <UserFavorites />) ||
        (type === 'comments' && <CommentsList />) ||
        ((type === 'subscribers' || type === 'subscriptions') && (
          <Subscribers />
        ))}
    </>
  )
}

export default UserRoute
