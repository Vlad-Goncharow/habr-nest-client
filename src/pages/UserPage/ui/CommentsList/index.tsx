import React from 'react'
import { ICommentEx } from 'shared/types/comments'
import Empty from 'shared/ui/Empty'
import Pagination from 'widgets/Pagination'
import Comment from '../Comment'

interface CommentsListProps {
  comments: ICommentEx[] | []
  length: number
  navigatePath: string
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  length,
  navigatePath,
}) => {
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments.map((comment: ICommentEx) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Pagination
            length={length}
            pageSize={20}
            navigatePath={navigatePath}
          />
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default CommentsList
