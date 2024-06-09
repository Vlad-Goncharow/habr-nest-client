import { fetchModalActions } from 'entities/FetchModal'
import moment from 'moment'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { CommentsTypeEx } from 'shared/types/comments'
import Empty from 'shared/ui/Empty'
import Pagination from 'widgets/Pagination'
import axios from '../../../../axios'
import s from './CommentsList.module.scss'

function CommentsList() {
  const {userId, page} = useParams()

  const dispatch = useAppDispatch()

  const [comments, setComments] = React.useState<CommentsTypeEx[] | []>([])
  const [length, setLength] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const { data } = await axios.get(`/comments/user/${userId}?page=${page}&pageSize=5`)
        console.log(data);
        setComments(data.comments)
        setLength(data.length)
        setLoading(false)
      } catch(e){
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  },[userId, page])

  if (loading) {
    return (<div>loading</div>)
  }

  if (!length) {
    return (<Empty />)
  }

  return (
    <>
      {
        comments.map((comment:CommentsTypeEx) =>
          <div className={s.comment}>
            <Link to={`/articles/${comment.postId}`} className={s.comment__title}>{comment.post.title}</Link>
            <header className={s.user}>
              <Link to={`/user/${comment.userId}/profile`} className={s.user__img}>
                <img src={`${process.env.REACT_APP_SERVER_URL}/${comment.author?.avatar}`} alt="" />
              </Link>
              <span>
                <Link to={`/user/${comment.userId}/profile`} className={s.user__nickname}>{comment.author.nickname}</Link>
                <Link to={`/articles/${comment.postId}`} className={s.comment__date}>
                  {moment(comment?.createdAt).locale('ru').format('LLL')}
                </Link>
              </span>
            </header>
            <p className={s.comment__content}>
              {comment.content}
            </p>
            <Link to={`/article/${comment.postId}`} className={s.comment__watch}>Посмотреть</Link>
          </div>
        )
      }
      <Pagination length={length} pageSize={5} navigatePath={`/user/${userId}/comments`} />
    </>
  )
}

export default CommentsList