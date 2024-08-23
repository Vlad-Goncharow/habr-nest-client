import useFavoritesComments from 'pages/UserPage/model/hooks/useFavoriteComments'
import { useParams } from 'react-router-dom'
import CommentsList from '../../../CommentsList'

function FavoriteComments() {
  const { userId, type, subType, page } = useParams()

  const { comments, length, isLoading, isSuccess } = useFavoritesComments({
    userId,
    type,
    subType,
    page,
  })

  return (
    <>
      {isSuccess && (
        <CommentsList
          comments={comments}
          length={length}
          loading={isLoading}
          navigatePath={`/user/${userId}/${type}/${subType}`}
        />
      )}
    </>
  )
}
export default FavoriteComments
