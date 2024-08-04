import { useParams } from 'react-router-dom'
import { PostsList, PostsSceleton } from 'shared/ui/PostsList'
import { usePosts } from '../../model'

function Posts() {
  const { type, category, page } = useParams()

  const { isSuccess, data, isLoading } = usePosts({ type, category, page })

  return (
    <>
      {!isLoading && isSuccess ? (
        <PostsList
          posts={data.posts}
          length={data.length}
          navigatePath={`/flows/${category}/${type}`}
          query={['posts', category, type, page]}
        />
      ) : (
        <PostsSceleton />
      )}
    </>
  )
}

export default Posts
