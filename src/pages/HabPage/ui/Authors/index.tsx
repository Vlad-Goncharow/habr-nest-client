import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../../axios'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { UsersList } from 'shared/ui/UsersList'

function Authors() {
  //dispatch
  const dispatch = useAppDispatch()
  
  //params
  const {habId, page} = useParams()

  //loading
  const [loading, setLoading] = React.useState<boolean>(true)

  //users
  const [users, setUsers] = React.useState<IUser[] | []>([])

  //length for pagination
  const [length, setLength] = React.useState<number>(0)

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const { data } = await axios.get(`/habs/load/${habId}/authors?page=${page}&pageSize=20`)
        setUsers(data.users)
        setLength(data.length)
        setLoading(false)
      } catch(e){
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  },[habId, page])
  
  return (
    <UsersList usersTotalCount={length} usersLoading={loading} users={users} navigatePath={`/hab/${habId}/authors`}  />
  )
}

export default Authors