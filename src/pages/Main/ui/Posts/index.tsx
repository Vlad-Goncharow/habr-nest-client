import { useParams } from 'react-router-dom'
import { PostsList } from 'shared/ui/PostsList'
import { usePosts } from '../../model'

function Posts() {
  //params
  const {type, category, page} = useParams()

  //data
  const {isSuccess, posts, length, isLoading} = usePosts({type, category,page})
  
  return (
    <>
      {
        isSuccess &&
        <PostsList loading={isLoading} posts={posts} length={length} navigatePath={`/flows/${category}/${type}`} />
      }
    </>
  )
}

export default Posts