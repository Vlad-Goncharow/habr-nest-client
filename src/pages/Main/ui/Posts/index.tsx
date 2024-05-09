import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IPost } from 'shared/types/posts'
import axios from '../../../../axios'
import { fetchModalActions } from 'entities/FetchModal'
import PostsSceleton from 'shared/ui/PostsSceleton'
import PostsList from 'shared/ui/PostsList'

function Posts() {
  const dispatch = useAppDispatch()

  const [pageSize, setPageSize] = React.useState<number>(10)
  const [loading, setLoading] = React.useState(true)
  const [postsLength, setPostsLength] = React.useState<number>(0)
  const [posts, setPosts] = React.useState<IPost[] | []>([])
  const { category, type, page } = useParams()

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/posts/${category}/${type}/?page=${page}&pageSize=${pageSize}`)
        setPosts(data.posts);
        setPostsLength(data.length)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  }, [category, type, page])
  
  return (
    <>
      {
        loading
          ?
            <PostsSceleton />
          :
            <PostsList posts={posts} length={postsLength} navigatePath={`/flows/${category}/${type}`} pageSize={pageSize} />
      }
    </>
  )
}

export default Posts