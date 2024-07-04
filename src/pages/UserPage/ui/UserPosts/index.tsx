import {usePosts} from '../../model'
import { useParams } from 'react-router-dom'
import { PostsList } from 'shared/ui/PostsList'

const UserPosts = () => {
  //params
  const { userId, type, subType, page } = useParams()

  //data
  const { posts, length, isLoading, isSuccess } = usePosts({userId, type, subType, page})

  return (
    <>
      {
        isSuccess &&
        <PostsList 
          loading={isLoading} 
          posts={posts} 
          length={length} 
          navigatePath={`/user/${userId}/${type}/${subType}`} 
          query={['user', userId, type, subType, page]}
        />
      }
    </>
  )
}

export default UserPosts