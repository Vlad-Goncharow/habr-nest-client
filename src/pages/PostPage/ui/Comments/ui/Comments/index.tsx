import { fetchModalActions } from 'entities/FetchModal'
import { getUserData } from 'entities/User'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { IComment } from 'shared/types/comments'
import Empty from 'shared/ui/Empty'
import axios from '../../../../../../axios'
import Comment from '../Comment'
import CommentsSkeleton from '../CommentsSkeleton'
import s from './Comments.module.scss'
import LoadingError from 'shared/ui/LoadingError'
import CommentEditor from '../CommentEditor'

const Comments: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { postId } = useParams()

  const { user } = useAppSelector(getUserData)

  const [loading, setLoding] = React.useState<boolean>(true)
  const [error, setError] = React.useState<boolean>(false)
  const [comments, setComments] = React.useState<IComment[]>([])

  const commentsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoding(true)
        const { data } = await axios.get(`/comments/load/${postId}`)
        setComments(data)
        setLoding(false)
        setError(false)
      } catch (e) {
        setError(true)
        setLoding(false)
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('commentLoadError'),
          })
        )
      }
    })()
  }, [postId])

  React.useEffect(() => {
    if (!loading) {
      if (commentsRef.current) {
        commentsRef.current.scrollTop = commentsRef.current.scrollHeight
      }
    }
  }, [loading, comments])

  const deleteComment = async (commentId: number) => {
    const { data } = await axios.delete(`/comments/delete/${commentId}`)
    if (data.success === true) {
      setComments((prev: IComment[]) => {
        return prev.filter((el) => el.id !== commentId)
      })
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.comments}>
        <h2 className={s.comments__title}>
          {t('comments')}
          <span>{comments.length}</span>
        </h2>
        {loading ? (
          <CommentsSkeleton />
        ) : error ? (
          <LoadingError message={t('commentLoadError')} />
        ) : (
          <div ref={commentsRef} className={s.row}>
            {comments.length > 0 ? (
              comments.map((item: IComment) => (
                <Comment
                  key={`${item.id}`}
                  deleteComment={deleteComment}
                  item={item}
                  user={user}
                />
              ))
            ) : (
              <Empty />
            )}
          </div>
        )}
        {user !== null && !error && <CommentEditor setComments={setComments} />}
      </div>
      {user === null && !error && (
        <div className={s.auth}>
          <span>
            {t('commentsAuth')} <Link to='/login'>{t('login')}</Link>,{' '}
            {t('please')}.
          </span>
        </div>
      )}
    </div>
  )
}

export default Comments
