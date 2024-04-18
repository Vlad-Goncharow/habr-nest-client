import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import SubscribersList from 'shared/ui/SubscribersList'
import axios from '../../../../axios'

function Authors() {
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
        const { data } = await axios.get(`/habs/load/${habId}/authors?page=${page}&pageSize=10`)
        setUsers(data.users)
        setLength(data.length)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[habId, page])
  
  return (
    <SubscribersList length={length} loading={loading} users={users} navigatePath={`/hab/${habId}/authors`}  />
  )
}

export default Authors