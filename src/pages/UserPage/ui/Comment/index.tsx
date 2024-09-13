import { Editor, EditorState, convertFromRaw } from 'draft-js'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { ICommentEx } from 'shared/types/comments'
import s from './Comment.module.scss'
import { useTranslation } from 'react-i18next'

interface CommentProps {
  comment: ICommentEx
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { t } = useTranslation()
  const contentStateFromJSON = convertFromRaw(JSON.parse(comment.content))
  const restoredEditorState =
    EditorState.createWithContent(contentStateFromJSON)

  return (
    <div className={s.comment}>
      <Link to={`/articles/${comment.postId}`} className={s.comment__title}>
        {comment.post.title}
      </Link>
      <header className={s.user}>
        <Link to={`/user/${comment.userId}/profile/1`} className={s.user__img}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${comment.author?.avatar}`}
            alt=''
          />
        </Link>
        <span>
          <Link
            to={`/user/${comment.userId}/profile/1`}
            className={s.user__nickname}
          >
            {comment.author.nickname}
          </Link>
          <time className={s.comment__date}>
            {moment(comment?.createdAt).locale('ru').format('LLL')}
          </time>
        </span>
      </header>
      <div className={s.comment__content}>
        <Editor editorState={restoredEditorState} readOnly />
      </div>
      <Link
        to={`/article/${comment.postId}/comments/#comment_${comment.id}`}
        className={s.comment__watch}
      >
        {t('commentsView')}
      </Link>
    </div>
  )
}

export default Comment
