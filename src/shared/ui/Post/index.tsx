import React from 'react'
import s from './Post.module.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { IPost } from 'shared/types/posts'
import classNames from 'classnames'
import { IHab } from 'shared/types/habs'

interface PostProps{
  post:IPost
}

const Post: React.FC<PostProps> = ({post}) =>{
  return (
    <div className={s.item}>
      <header className={s.item__header}>
        <div className={s.item__authorImg}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${post.author.avatar}`} alt="" />
        </div>
        <Link to={`/user/${post.author.id}/profile`} className={s.item__authorName}>{post.author.nickname}</Link>
        <div className={s.item__date}>{moment(post.createdAt).locale('ru').format('LLL')}</div>
      </header>
      <Link to={`/${post.type}/${post.id}`} className={s.item__title}>{post.title}</Link>
      <div className={s.item__habs}>
        {
          post.habs.map((hab: IHab) =>
            <Link to={`/hab/${hab.id}/posts`} key={hab.id}>{hab.title}</Link>
          )
        }
      </div>
      <div className={s.item__img}>
        <img src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`} alt="" />
      </div>
      <div className={s.item__text}>
        {/* <Editor onChange={onChange} editorState={editorState} /> */}
        {/* {
          parse(draftToHtml(
            JSON.parse(post.content),
          ))
        } */}
      </div>
      <Link to={`/post/${post.id}`} className={s.item__link}>Читать далее</Link>
      <footer className={s.item__footer}>
        <div className={s.item__footerItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          <span>{`${post.views}`}</span>
        </div>
        <div className={s.item__footerItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          {/* <span>{`${post.comments ? post.comments.length : 0}`}</span> */}
        </div>
        {/* <div onClick={checkClickFavorite} className={classNames(s.item__footerItem, {
          [s.item__footerItem_active]: check
        })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          <span>{`${Number(post.favorites)}`}</span>
        </div> */}
      </footer>
    </div>
  )
}

export default Post