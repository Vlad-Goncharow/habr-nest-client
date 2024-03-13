import React from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from 'shared/types/posts'
import PostsList from 'shared/ui/PostsList'
import PostsSceleton from 'shared/ui/PostsSceleton'
import { PostsNavigation } from 'widgets/PostsNavigation'
import axios from '../../axios'
import s from './Main.module.scss'

function Main() {
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [loading, setLoading] = React.useState(true)
  const [postsLength, setPostsLength] = React.useState<number>(0)
  const [posts, setPosts] = React.useState<IPost[] | []>([])
  const { category, type, page } = useParams()
  console.log(category, type, page);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/posts/${category}/${type}/?page=${page}&pageSize=${pageSize}`)
        setPosts(data.posts);
        setPostsLength(data.length)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[category,type,page])
  
  return (
    <div className={'page'}>
      <div className="container">
        <div className="row">
          <PostsNavigation />
          <div className="right"></div>
        </div>
        <div className={s.wrapper}>
          {
            loading
              ?
              <PostsSceleton />
              :
              <PostsList posts={posts} length={postsLength} navigatePath={`/flows/${category}/${type}`} pageSize={pageSize} />
          }
        </div>
      </div>
    </div>
  )
}

export default Main