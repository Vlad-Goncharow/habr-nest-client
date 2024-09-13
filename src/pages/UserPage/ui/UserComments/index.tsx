import { useParams } from 'react-router-dom'
import { useComments } from '../../model'
import CommentsList from '../CommentsList'
import CommentsSkeleton from '../CommentsSkeleton'

function UserComments() {
  const { userId, page, type } = useParams()

  const { comments, length, isLoading, isSuccess } = useComments({
    userId,
    page,
    type,
  })

  return (
    <>
      {!isLoading && isSuccess ? (
        <CommentsList
          comments={comments}
          length={length}
          navigatePath={`/user/${userId}/comments`}
        />
      ) : (
        <CommentsSkeleton />
      )}
    </>
  )
}

export default UserComments
