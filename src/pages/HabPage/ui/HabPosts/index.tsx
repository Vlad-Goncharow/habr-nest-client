import { useParams } from 'react-router-dom'
import { PostsList } from 'shared/ui/PostsList'
import { usePosts } from '../../model'

function HabPosts() {
  //params
  const { habId, type, page } = useParams()
 
  //data
  const { isLoading, isSuccess, length, posts } = usePosts({ habId, page, type })

  return (
    <>
      {
        isSuccess &&
        <PostsList loading={isLoading} posts={posts} length={length} navigatePath={`/hab/${habId}/${type}/${type}`} />
      }
    </>
  )
}

export default HabPosts