import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as Comments } from 'shared/images/svg/postComments.svg'
import { ReactComponent as Views } from 'shared/images/svg/postViews.svg'
import { IPost } from 'shared/types/posts'
import axios from '../../../axios'
import s from './SidebarReadWeekly.module.scss'

interface SidebarReadWeeklyProps{
  category:string
}

const SidebarReadWeekly: React.FC<SidebarReadWeeklyProps> = ({category}) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [posts, setPosts] = React.useState<IPost[] | []>([])

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const {data} = await axios.get(`/posts/weekly/${category}`)
        setPosts(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[category])

  if(loading) <div></div>
  
  return (
    <section className={s.sidebar}>
      <header className="sidebar__header">
        <h2 className="sidebar__title">
          Лучшее за неделю
        </h2>
      </header>
      <ul className={s.list}>
        {
          posts.map((post: IPost) =>
            <li className={s.post}>
              <article>
                <h2 className={s.post__title}>
                  <Link to={`/${post.type}/${post.id}`}>{post.title}</Link>
                </h2>
                <div className={s.post__stats}>
                  <span>
                    <Views />
                    <span>{post.views}</span>
                  </span>
                  <span>
                    <Comments />
                    <span>{post.commentsCount}</span>
                  </span>
                </div>
              </article>
            </li>
          )
        }
      </ul> 
    </section>
  )
}

export default SidebarReadWeekly