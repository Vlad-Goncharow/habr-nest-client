import { IUser } from 'entities/User'
import React from 'react'
import { Link } from 'react-router-dom'
import SubscribeBtn from 'shared/ui/SubscribeBtn'
import s from './PostAuthor.module.scss'

interface PostAuthorProps{
  author: IUser
}

const PostAuthor: React.FC<PostAuthorProps> = ({author}) => {
  return (
    <div className={s.author}>
      <div className={s.author__top}>
        <div className={s.author__img}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${author?.avatar}`} alt="" />
        </div>
        <div className={s.author__item}>
          <span>{`${author?.karma}`}</span>
          <p>Карма</p>
        </div>
        <div className={s.author__item}>
          <span>{`${author?.rating}`}</span>
          <p>Рейтинг</p>
        </div>
        <SubscribeBtn userData={author} />
      </div>
      <Link to={`/user/${author.id}/posts/`} className={s.author__name}>{author?.nickname}</Link>
    </div>
  )
}

export default PostAuthor