import { useParams } from 'react-router-dom'
import { PostsList, PostsSceleton } from 'shared/ui/PostsList'
import { usePosts } from '../../model'

function HabPosts() {
  const { habId, type, page } = useParams()

  const { isLoading, isSuccess, data } = usePosts({ habId, page, type })

  return (
    <>
      {!isLoading && isSuccess ? (
        <PostsList
          posts={data.posts}
          length={data.length}
          navigatePath={`/hab/${habId}/${type}/${type}`}
          query={['hab', habId, type, page]}
        />
      ) : (
        <PostsSceleton />
      )}
    </>
  )
}

export default HabPosts
