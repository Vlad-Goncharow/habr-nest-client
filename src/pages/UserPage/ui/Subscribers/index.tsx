import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import UsersSkeleton from 'shared/ui/UsersSkeleton'
import Pagination from 'widgets/Pagination'
import axios from '../../../../axios'
import SubsList from '../SubsList'
import s from './Subscribers.module.scss'

function Subscribers() {
  const { userId, type, page, subType } = useParams()
  const [loading, setLoading] = React.useState(true)
  const [subs, setSubs] = React.useState<IUser[] | []>([])
  const [length, setLength] = React.useState<number>(0)
  console.log(userId, type, page, subType);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/users/subs/${userId}/${type}?page=${page}&pageSize=${10}`)
        type && setSubs(data[type])
        setLength(data.length)
        setLoading(false)
        console.log(data)
      } catch (e) {
        setLoading(false)
      }
    })()
  }, [userId, type, page])

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <div className={s.name}>Имя</div>
        <div className={s.stats}>
          <div className={s.stats__item}>Рейтинг</div>
          <div className={s.stats__item}>Карма</div>
        </div>
      </div>
      {
        loading
        ?
          <UsersSkeleton />
        :
          <>
            <div className={s.list}>
              {<SubsList subs={subs} />}
            </div>
            <Pagination length={length} navigatePath={`/user/${userId}/${type}`} pageSize={10} />
          </>
      }
    </div>
  )
}

export default Subscribers