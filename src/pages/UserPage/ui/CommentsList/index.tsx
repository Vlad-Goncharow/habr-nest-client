import { useParams } from 'react-router-dom'
import { useComments } from '../../model'
import Comments from '../Comments'

function CommentsList() {
  const { userId, page, type } = useParams()

  const { comments, length, isLoading, isSuccess } = useComments({
    userId,
    page,
    type,
  })

  return (
    <>
      {isSuccess && (
        <Comments
          comments={comments}
          length={length}
          loading={isLoading}
          navigatePath={`/user/${userId}/comments`}
        />
      )}
    </>
  )
}

export default CommentsList
