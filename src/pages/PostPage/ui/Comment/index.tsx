import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { IUser } from 'entities/User'
import { FavoriteCommentBtn } from 'features/FavoriteCommentBtn'
import moment from 'moment'
import React from 'react'
import { IComment } from 'shared/types/comments'
import s from './Comment.module.scss'
import { Link, useLocation, useParams } from 'react-router-dom'

interface CommentProps{
  item: IComment
  deleteComment: (commentId:number) => void
  user:IUser | null
}

const Comment: React.FC<CommentProps> = ({ item, user, deleteComment}) => {
  //popup menu| delete button
  const [popupIsVisible, setPopupIsVisible] = React.useState(false)
  
  //scroll to comment
  const commentRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation()

  React.useEffect(() => {
    const hash = location.hash.substring(1);
    let timer:NodeJS.Timer;

    if (hash === `comment_${item.id}`) {
      timer = setTimeout(() => {
        commentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 20);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [item.id, location]);

  //comment content
  const contentStateFromJSON = convertFromRaw(JSON.parse(item.content));
  const restoredEditorState = EditorState.createWithContent(contentStateFromJSON);

  return (
    <div id={`comment_${item.id}`} ref={commentRef} className={s.comment}>
      <Link to={`/user/${item.author.id}/profile/1`} className={s.comment__header}>
        <div className={s.comment__authorImg}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${item.author?.avatar}`} alt="" />
        </div>
        <div className={s.comment__authorName}>{item.author?.nickname}</div>
        <div className={s.comment__date}>{moment(item?.createdAt).locale('ru').format('LLL')}</div>
      </Link>
      <div className={s.comment__text}>
        <Editor editorState={restoredEditorState} readOnly />
      </div>
      <div className={s.comment__footer}>
        <FavoriteCommentBtn commentId={item.id} />
      </div>
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
              <div className={s.menu__popup}>
                <div className={s.menu__btn} onClick={() => deleteComment(item.id)}>Удалить</div>
              </div>
          }
        </div>
      }
    </div>
  )
}

export default Comment