import React from 'react'
import s from './Comment.module.scss'
import moment from 'moment'
import { IUser } from 'entities/User'
import classNames from 'classnames'
import { CommentsType } from 'shared/types/comments'

interface CommentProps{
  item: CommentsType
  deleteComment: (commentId:number) => void
  user:IUser | null
  length:number
  index:number
}

const Comment: React.FC<CommentProps> = ({ item, user, deleteComment, length, index }) => {
  //popup menu| delete button
  const [popupIsVisible, setPopupIsVisible] = React.useState(false)
  
  return (
    <div onMouseLeave={() => setPopupIsVisible(false)} key={`${item.id}`} className={s.comment}>
      <header className={s.comment__header}>
        <div className={s.comment__authorImg}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${item.author?.avatar}`} alt="" />
        </div>
        <div className={s.comment__authorName}>{item.author?.nickname}</div>
        <div className={s.comment__date}>{moment(item?.createdAt).locale('ru').format('LLL')}</div>
      </header>
      <main className={s.comment__text}>{item.content}</main>
      
      {
        user?.id === item.author.id && 
        <div className={s.menu}>
          <div onClick={() => setPopupIsVisible(prev => !prev)} className={s.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g fill="#000">
                <path d="M4 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM22.5 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
              </g>
            </svg>
          </div>
          {
            popupIsVisible &&
              <div className={classNames(s.menu__popup, {
                [s.menu__popup_last]: length === index + 1,
                [s.menu__popup_first]: length === 1
              })}>
              <div className={s.menu__btn} onClick={() => deleteComment(item.id)}>Удалить</div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Comment