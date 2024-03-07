import classNames from 'classnames'
import { getUserData } from 'entities/User'
import React from 'react'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import axios from '../../../axios'
import s from './HabSubscribeBtn.module.scss'

interface HabSubscribeBtnProps{
  habId:number
}

const HabSubscribeBtn: React.FC<HabSubscribeBtnProps> = ({habId}) => {
  const { user } = useAppSelector(getUserData)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (user && user.habSubscribers.find((el: any) => el.id === habId)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [])

  const subscribe = async () => {
    if (active) {
      const { data } = await axios.post(`/habs/unsubscribe`,{
        userId:user?.id,
        habId
      })
      if (data.success === true) {
        setActive(false)
      }
    } else {
      const { data } = await axios.post(`/habs/subscribe`,{
        userId:user?.id,
        habId
      })
      if (data.success === true) {
        setActive(true)
      }
    }
  }

  return (
    <>
      {
        user &&
        <button
          className={classNames(s.sub, {
            [s.sub__active]: active
          })}
          onClick={subscribe}
        >
          {active ? 'Отписаться' : 'Подписаться'}
          {
            active &&
            <span></span>
          }
        </button>
      }
    </>
  )
}

export default HabSubscribeBtn