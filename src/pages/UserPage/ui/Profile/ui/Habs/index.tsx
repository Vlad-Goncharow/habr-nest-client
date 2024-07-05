import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsType } from 'shared/types/habs'
import axios from '../../../../../../axios'
import Hab from '../Hab'
import ProfileSkeleton from '../ProfileSkeleton'
import s from './Habs.module.scss'

const Habs = () => {
  const dispatch = useAppDispatch()

  //params
  const { userId } = useParams()

  //habs array
  const [habs, setHabs] = React.useState<HabsType[] | []>([])

  //is loading
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/user/${userId}/subscribed-habs`)
        setHabs(data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  }, [userId])

  return (
    <>
      {
        loading ?
          <ProfileSkeleton />
        :
          habs.length > 0 ?
            <div className={s.item}>
              <h2 className={s.item__title}>Состоит в хабах</h2>
              <div className={s.item__list}>
                {
                  habs.map(el =>
                    <Hab key={el.id} habData={el} />
                  )
                }
              </div>
            </div>
            :
            <div className={s.item}>
              <h2 className={s.item__title}>Пользователь не состоит в хабах</h2>
            </div>
      }
    </>
  )
}

export default Habs