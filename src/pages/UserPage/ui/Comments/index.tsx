import React from 'react'
import s from './Comments.module.scss'
import { ICommentEx } from 'shared/types/comments'
import Empty from 'shared/ui/Empty'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Pagination from 'widgets/Pagination'

interface CommentsProps{
  comments: ICommentEx[] | []
  length: number,
  navigatePath: string
  loading: boolean,
}

const Comments: React.FC<CommentsProps> = ({comments,length,loading,navigatePath}) => {
  return (
    <>
      {
        loading ?
          <div>loading</div>
        :
          length > 0 ?
            <>
              {
                comments.map((comment: ICommentEx) =>
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
              <Pagination length={length} pageSize={20} navigatePath={navigatePath} />
            </>
          :
            <Empty />
      }
    </>
  )
}

export default Comments