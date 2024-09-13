import { useParams } from 'react-router-dom'
import Articles from '../Articles'
import Habs from '../Habs'
import Authors from '../Authors'

function SearchRoute() {
  const { type } = useParams()

  return (
    <>
      {(type === 'articles' && <Articles />) ||
        (type === 'habs' && <Habs />) ||
        (type === 'authors' && <Authors />)}
    </>
  )
}

export default SearchRoute
