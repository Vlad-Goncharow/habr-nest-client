import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { IUser, checkRolesAdminModerator } from 'entities/User'
import { FavoriteCommentBtn } from 'features/FavoriteCommentBtn'
import moment from 'moment'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import { ReactComponent as Delete } from 'shared/images/svg/delete.svg'
import { ReactComponent as Dots } from 'shared/images/svg/dots.svg'
import { ReactComponent as Share } from 'shared/images/svg/share.svg'
import { IComment } from 'shared/types/comments'
import s from './Comment.module.scss'

interface CommentProps {
  item: IComment
  deleteComment: (commentId: number) => void
  user: IUser | null
}

const Comment: React.FC<CommentProps> = ({ item, user, deleteComment }) => {
  const checkUserAdminOrModerator = useAppSelector(checkRolesAdminModerator)

  const [popupIsOpen, setPopupIsOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement | null>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  const commentRef = React.useRef<HTMLDivElement>(null)
  const location = useLocation()

  const contentStateFromJSON = convertFromRaw(JSON.parse(item.content))
  const restoredEditorState =
    EditorState.createWithContent(contentStateFromJSON)

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    setPopupIsOpen(false)
  }

  React.useEffect(() => {
    const hash = location.hash.substring(1)
    let timer: NodeJS.Timer

    if (hash === `comment_${item.id}`) {
      timer = setTimeout(() => {
        commentRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 20)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [item.id, location])

  return (
    <div id={`comment_${item.id}`} ref={commentRef} className={s.comment}>
      <Link
        to={`/user/${item.author.id}/profile/1`}
        className={s.comment__header}
      >
        <div className={s.comment__authorImg}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${item.author?.avatar}`}
            alt=''
          />
        </div>
        <div className={s.comment__authorName}>{item.author?.nickname}</div>
        <div className={s.comment__date}>
          {moment(item?.createdAt).locale('ru').format('LLL')}
        </div>
      </Link>
      <div className={s.comment__text}>
        <Editor editorState={restoredEditorState} readOnly />
      </div>
      <div className={s.comment__footer}>
        <FavoriteCommentBtn commentId={item.id} />
        <div ref={popupRef} className={s.controls}>
          <div
            onClick={() => setPopupIsOpen((prev) => !prev)}
            className={s.controls__icon}
          >
            <Dots />
          </div>
          {popupIsOpen && (
            <div className={s.popup}>
              <ul>
                {(user?.id === item.author.id || checkUserAdminOrModerator) && (
                  <li onClick={() => deleteComment(item.id)}>
                    <Delete />
                    <span>Удалить</span>
                  </li>
                )}
                <li
                  onClick={() =>
                    copyToClipboard(
                      `${process.env.REACT_APP_CLIENT_URL}/articles/${item.postId}/#comment_${item.id}`
                    )
                  }
                >
                  <Share />
                  <span>Поделиться</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
