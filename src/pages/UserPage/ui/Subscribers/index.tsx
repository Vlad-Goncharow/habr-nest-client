import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../../axios'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { UsersList } from 'shared/ui/UsersList'

function Subscribers() {
  //dispatch
  const dispatch = useAppDispatch()

  //params
  const { userId, type, page } = useParams()

  //subs | loading | subs count
  const [loading, setLoading] = React.useState(true)
  const [subs, setSubs] = React.useState<IUser[] | []>([])
  const [length, setLength] = React.useState<number>(0)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/users/subs/${userId}/${type}?page=${page}&pageSize=${10}`)
        type && setSubs(data[type])
        setLength(data.length)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  }, [userId, type, page])

  return (
    <UsersList users={subs} usersLoading={loading} usersTotalCount={length} navigatePath={`/user/${userId}/${type}`} />
  )
}

export default Subscribers