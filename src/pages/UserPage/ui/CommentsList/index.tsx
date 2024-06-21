import moment from 'moment'
import {useComments} from '../../model'
import { Link, useParams } from 'react-router-dom'
import { CommentsTypeEx } from 'shared/types/comments'
import Pagination from 'widgets/Pagination'
import s from './CommentsList.module.scss'
import Empty from 'shared/ui/Empty'

function CommentsList() {
  //params
  const { userId, page, type } = useParams()

  //data
  const {comments, length, isLoading, isSuccess} = useComments({userId, page, type})

  if (isLoading) {
    return (<div>loading</div>)
  }

  return (
    <>
      {
        isSuccess &&
          comments.length > 0 
          ?
            <>
              {
                comments.map((comment: CommentsTypeEx) =>
                  <div key={comment.id} className={s.comment}>
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
              <Pagination length={length} pageSize={20} navigatePath={`/user/${userId}/comments`} />
            </>
          :
            <Empty />
      }
    </>
  )
}

export default CommentsList