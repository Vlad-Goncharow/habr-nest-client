import { useParams } from 'react-router-dom'
import Publications from './ui/Publications'
import FavoriteComments from './ui/FavoriteComments'

function UserFavorites() {
  const { subType } = useParams()

  return (
    <>
      {(subType === 'articles' ||
        subType === 'posts' ||
        subType === 'news') && <Publications />}

      {subType === 'comments' && <FavoriteComments />}
    </>
  )
}

export default UserFavorites
