import { useSubs } from '../../model'
import { useParams } from 'react-router-dom'
import { UsersList } from 'shared/ui/UsersList'

function Subscribers() {
  const { userId, type, page } = useParams()

  const { isSuccess, isLoading, data, length } = useSubs({ userId, type, page })

  return (
    <>
      {isSuccess && type && (
        <UsersList
          users={data[type]}
          usersLoading={isLoading}
          usersTotalCount={length}
          navigatePath={`/user/${userId}/${type}`}
        />
      )}
    </>
  )
}

export default Subscribers
