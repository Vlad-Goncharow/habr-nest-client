import { useParams, useSearchParams } from 'react-router-dom'
import { UsersList } from 'shared/ui/UsersList'
import { useAuthors } from '../../model'

function Authors() {
  //params
  const {habId, type, page} = useParams()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  //data
  const { isLoading, isSuccess, length, users } = useAuthors({ habId, type, order, page, sort})
  
  return (
    <>
      {
        isSuccess &&
        <UsersList usersTotalCount={length} usersLoading={isLoading} users={users} navigatePath={`/hab/${habId}/authors`} />
      }
    </>
  )
}

export default Authors