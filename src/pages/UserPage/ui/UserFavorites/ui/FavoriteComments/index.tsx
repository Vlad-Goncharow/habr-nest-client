import useFavoritesComments from 'pages/UserPage/model/hooks/useFavoriteComments'
import { useParams } from 'react-router-dom'
import CommentsList from '../../../CommentsList'
import CommentsSkeleton from 'pages/UserPage/ui/CommentsSkeleton'

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
      {!isLoading && isSuccess ? (
        <CommentsList
          comments={comments}
          length={length}
          navigatePath={`/user/${userId}/${type}/${subType}`}
        />
      ) : (
        <CommentsSkeleton />
      )}
    </>
  )
}
export default FavoriteComments
