import React from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from 'shared/types/posts'
import PostsList from 'shared/ui/PostsList'
import PostsSceleton from 'shared/ui/PostsSceleton'
import axios from '../../../../axios'

const UserPosts: React.FC = () => {
  const { userId, type, subType, page } = useParams()

  const [loading, setLoading] = React.useState(true)
  const [postsLength, setPostsLength] = React.useState<number>(0)
  const [posts, setPosts] = React.useState<IPost[] | []>([])

  React.useEffect(() => {
    (async () => {
      try {
        if (type === 'publications') {
          setLoading(true)
          const { data } = await axios.get(`/posts/user/${userId}/${subType}?page=${page}&pageSize=${10}`)
          setPosts(data.posts)
          setPostsLength(data.length)
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
      }
    })()
  }, [userId, type, subType, page])

  return (
    <>
      {
        loading 
        ?
          <PostsSceleton />
        :
          <PostsList posts={posts} length={postsLength} pageSize={10} navigatePath={`/user/${userId}/${type}/${subType}`} />
      }
    </>
  )
}

export default UserPosts