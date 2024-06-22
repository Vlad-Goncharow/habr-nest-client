import useFavoritesComments from 'pages/UserPage/model/hooks/useFavoriteComments'
import { useParams } from 'react-router-dom'
import Comments from '../../../Comments'

function FavoriteComments() {
  //params
  const { userId, type, subType, page } = useParams()

  //data
  const { comments, length, isLoading, isSuccess } = useFavoritesComments({ userId, type, subType, page })

  return (
    <>
      {
        isSuccess &&
        <Comments comments={comments} length={length} loading={isLoading} navigatePath={`/user/${userId}/${type}/${subType}`} />
      }
    </>
  )
}
export default FavoriteComments