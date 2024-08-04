import useFavoritesPosts from '../../../../model/hooks/useFavoritesPosts'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PostsList, PostsSceleton } from 'shared/ui/PostsList'

function Publications() {
  const { userId, type, subType, page } = useParams()

  const { data, isLoading, isSuccess } = useFavoritesPosts({
    userId,
    type,
    subType,
    page,
  })

  return (
    <>
      {!isLoading && isSuccess ? (
        <PostsList
          posts={data.posts}
          length={data.length}
          navigatePath={`/user/${userId}/${type}/${subType}`}
          query={['user', userId, type, subType, page]}
        />
      ) : (
        <PostsSceleton />
      )}
    </>
  )
}

export default Publications
