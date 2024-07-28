import React from 'react'
import { ICommentEx } from 'shared/types/comments'
import Empty from 'shared/ui/Empty'
import Pagination from 'widgets/Pagination'
import Comment from '../Comment'

interface CommentsProps {
  comments: ICommentEx[] | []
  length: number
  navigatePath: string
  loading: boolean
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  length,
  loading,
  navigatePath,
}) => {
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : length > 0 ? (
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

export default Comments
