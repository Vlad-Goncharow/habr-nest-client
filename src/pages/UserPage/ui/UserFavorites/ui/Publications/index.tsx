import useFavoritesPosts from '../../../../model/hooks/useFavoritesPosts'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PostsList } from 'shared/ui/PostsList'

function Publications() {
  //params
  const { userId, type, subType, page } = useParams()

  //data
  const { posts, length, isLoading, isSuccess } = useFavoritesPosts({ userId, type, subType, page })

  return (
    <>
      {
        isSuccess &&
        <PostsList loading={isLoading} posts={posts} length={length} navigatePath={`/user/${userId}/${type}/${subType}`} />
      }
    </>
  )
}

export default Publications