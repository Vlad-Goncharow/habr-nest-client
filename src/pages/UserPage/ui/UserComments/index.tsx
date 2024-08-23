import { useParams } from 'react-router-dom'
import { useComments } from '../../model'
import CommentsList from '../CommentsList'

function UserComments() {
  const { userId, page, type } = useParams()

  const { comments, length, isLoading, isSuccess } = useComments({
    userId,
    page,
    type,
  })

  return (
    <>
      {isSuccess && (
        <CommentsList
          comments={comments}
          length={length}
          loading={isLoading}
          navigatePath={`/user/${userId}/comments`}
        />
      )}
    </>
  )
}

export default UserComments
