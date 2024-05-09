import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import UsersSkeleton from 'shared/ui/UsersSkeleton'
import Pagination from 'widgets/Pagination'
import axios from '../../../../axios'
import s from './Aurhors.module.scss'
import EmptyPosts from 'shared/ui/EmptyPosts'
import { IUser } from 'entities/User'

function Aurhors() {
  //dispatch
  const dispatch = useAppDispatch()

  //params
  const { category, type, page } = useParams()

  //count habs in one page
  const [pageSize, setPageSize] = React.useState<number>(10)

  //loading | count all habs | habs
  const [loading, setLoading] = React.useState(true)
  const [habsLength, SetHabsLength] = React.useState<number>(0)
  const [users, setUsers] = React.useState<IUser[] | []>([])

  //load habs
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/category/${category}/?page=${page}&pageSize=${pageSize}`)
        setUsers(data.habs);
        SetHabsLength(data.length)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  }, [category, type, page])

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.name}>
            <span>Имя</span>
          </div>
          <div className={s.stats}>
            <div className={s.stats__item}>Вклад</div>
          </div>
        </div>
        {
          loading
            ?
            <UsersSkeleton />
            :
            users.length > 0
            ?
              <>
                {
                  users.map((el:IUser) =>
                    <div className={s.hab}>
                      <div className={s.hab__left}>
                        <div className={s.hab__image}>
                          <img src={`${process.env.REACT_APP_SERVER_URL}/${el.avatar}`} alt="" />
                        </div>
                        <div>
                          <h1 className={s.hab__title}>{el.nickname}</h1>
                          <p className={s.hab__descr}>{el.description}</p>
                        </div>
                      </div>
                      <div className={s.habStats}>
                        <div className={s.habStats__item}>{el.rating}</div>
                      </div>
                    </div>
                  )
                }
              </>
            :
              <EmptyPosts />
        }
      </div>

      <Pagination length={habsLength} pageSize={pageSize} navigatePath={`/flows/${category}/${type}`} />
    </div>
  )
}

export default Aurhors