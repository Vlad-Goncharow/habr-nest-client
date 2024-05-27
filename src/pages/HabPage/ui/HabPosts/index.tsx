import React from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from 'shared/types/posts'
import axios from '../../../../axios'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { PostsList } from 'shared/ui/PostsList'

function HabPosts() {
  //dispatch
  const dispatch = useAppDispatch()
  
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
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  }, [habId, page, type])

  return (
    <>
      <PostsList loading={loading} posts={posts} length={postsLength} navigatePath={`/hab/${habId}/${type}/${type}`} />
    </>
  )
}

export default HabPosts