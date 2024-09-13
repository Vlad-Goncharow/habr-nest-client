import { IUser } from 'entities/User'
import { SubscribeUser } from 'features/SubscribeUser'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './PostAuthor.module.scss'
import { useTranslation } from 'react-i18next'

interface PostAuthorProps {
  author: IUser
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author }) => {
  const { t } = useTranslation()
  return (
    <div className={s.author}>
      <div className={s.author__top}>
        <div className={s.author__img}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${author?.avatar}`}
            alt=''
          />
        </div>
        <div className={s.author__item}>
          <span>{`${author?.karma}`}</span>
          <p>{t('karma')}</p>
        </div>
        <div className={s.author__item}>
          <span>{`${author?.rating}`}</span>
          <p>{t('rating')}</p>
        </div>
        <SubscribeUser userId={author.id} />
      </div>
      <Link to={`/user/${author.id}/profile/1`} className={s.author__name}>
        {author?.nickname}
      </Link>
    </div>
  )
}

export default PostAuthor
