import React from 'react'
import { useParams } from 'react-router-dom'
import Publications from './ui/Publications';
import Comments from './ui/Comments';

function UserFavorites() {
  const { subType } = useParams()
  
  return (
    <>
      {
        (subType === 'articles' || subType === 'posts' || subType === 'news') &&
        <Publications />
      }

      {
        subType === 'comments' &&
        <Comments />
      }
    </>
  )
}

export default UserFavorites