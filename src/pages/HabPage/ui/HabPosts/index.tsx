import React from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from 'shared/types/posts'
import axios from '../../../../axios'
import PostsSceleton from 'shared/ui/PostsSceleton'
import PostsList from 'shared/ui/PostsList'

function HabPosts() {
  //params
  const { habId, type, page } = useParams()

  //loading posts
  const [loading, setLoading] = React.useState(true)

  //posts length for pagination
  const [postsLength, setPostsLength] = React.useState<number>(0)

  //posts
  const [posts, setPosts] = React.useState<IPost[] | []>([])

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/posts/hab/${habId}/${type}?page=${page}&pageSize=${10}`)
        setPosts(data.posts)
        setPostsLength(data.length)
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
    })()
  }, [habId, page, type])

  return (
    <>
      {
        loading
          ?
          <PostsSceleton />
          :
          <PostsList posts={posts} length={postsLength} pageSize={10} navigatePath={`/hab/${habId}/${type}/${type}`} />
      }
    </>
  )
}

export default HabPosts