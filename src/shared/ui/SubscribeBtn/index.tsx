import React from 'react'
import s from './SubscribeBtn.module.scss'
import axios from '../../../axios'
import classNames from 'classnames'
import { IUser, getUserData } from 'entities/User'
import { useAppSelector } from 'shared/hooks/useAppSelector'

interface SubscribeBtnProps{
  userData:IUser,
}

const SubscribeBtn: React.FC<SubscribeBtnProps> = ({userData}) => {
  const {user} = useAppSelector(getUserData)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (user && userData.subscribers.find((el: any) => el.id === user.id)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [])

  const subscribe = async () => {
    if (active) {
      const { data } = await axios.post(`/users/unsubscribe/${userData.id}`)
      if (data.success === true) {
        setActive(false)
      }
    } else {
      const { data } = await axios.post(`/users/subscribe/${userData.id}`)
      if (data.success === true) {
        setActive(true)
      }
    }
  }

  return (
    <>
    {
        user && user.id !== userData.id &&
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

export default SubscribeBtn