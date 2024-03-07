import React from 'react'
import s from './PostPage.module.scss'
import { IPost } from 'shared/types/posts'
import axios from '../../../../axios'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { getUserData } from 'entities/User'
import moment from 'moment'
import { IHab } from 'shared/types/habs'
import classNames from 'classnames'
import PostAuthor from '../PostAuthor'

function PostPage() {
  const { postId, type } = useParams()
  const {user} = useAppSelector(getUserData)
  const [postData, setPostData] = React.useState<IPost | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/${type}/${postId}`)
        setPostData(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[])

  return (
    <>
      {
        loading 
        ?
          <div>loading</div>
        :
          postData !== null &&
          <div className={s.page}>
            <div className={'container'}>
              <div className={s.wrapper}>
                <div className={s.left}>
                  <div className={s.post}>
                    <header className={s.post__header}>
                      <div className={s.post__authorImg}>
                        <img src={`${process.env.REACT_APP_SERVER_URL}${postData.author.avatar}`} alt="" />
                      </div>
                      <Link to={`/user/${postData.author.id}/profile`} className={s.post__authorName}>{postData.author.nickname}</Link>
                      <div className={s.post__date}>{moment(postData.createdAt).locale('ru').format('LLL')}</div>
                    </header>
                    <h2 className={s.post__title}>{postData.title}</h2>
                    <div className={s.post__img}>
                      <img src={`${process.env.REACT_APP_SERVER_URL}${postData.image}`} alt="" />
                    </div>
                    <div className={s.post__text}>
                      {/* {
                        parse(draftToHtml(
                          JSON.parse(postData.text),
                        ))
                      } */}
                    </div>
                    <div className={s.post__info}>
                      <span>Хабы</span>
                      <ul>
                        {
                          postData.habs.map((el: IHab) =>
                            <li key={`${el}`}>
                              <Link to={`/hab/${el.id}/posts/1`}>{el.title}</Link>
                            </li>
                          )
                        }
                      </ul>
                    </div>
                    <footer className={s.post__footer}>
                      <div className={s.post__footerItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        <span>{`${postData.views}`}</span>
                      </div>
                      {/* <div className={s.post__footerItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
                        </svg>
                        <span>{`${postData.comments ? postData.comments.length : 0}`}</span>
                      </div> */}
                      {/* <div onClick={checkClickFavorite} className={classNames(s.post__footerItem, {
                        [s.post__footerItem_active]: check
                      })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
                        </svg>
                        <span>{`${postData.favorites}`}</span>
                      </div> */}
                    </footer>
                  </div>
                  <PostAuthor author={postData.author} />
                  {/* <PostComments comments={postData.comments} />
                  <PopularPosts /> */}
                </div>
                {/* <Sidebar category={postData.category} /> */}
              </div>
            </div>
          </div>}
    </>
  )
}

export default PostPage