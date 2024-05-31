import React from 'react'
import s from './SubscribeBtn.module.scss'
import axios from '../../../axios'
import classNames from 'classnames'
import { IUser, getUserData, userActions } from 'entities/User'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'

interface SubscribeBtnProps{
  userId:number,
}

const SubscribeBtn: React.FC<SubscribeBtnProps> = ({userId}) => {
  const {user} = useAppSelector(getUserData)
  const [active, setActive] = React.useState(false)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (user && user.subscriptions.find((el: IUser) => el.id === userId)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [])

  const subscribe = async () => {
    if (active) {
      try{
        const { data } = await axios.post(`/users/unsubscribe/${userId}`)
        if (data.success === true) {
          setActive(false)
          dispatch(userActions.userUnSubscribe({ id: userId }))
        }
      } catch(e){
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При отписке произошла ошибка!' }))
      }
    } else {
      try{
        const { data } = await axios.post(`/users/subscribe/${userId}`)
        if (data.success === true) {
          dispatch(userActions.userSubscribe({ id: userId }))
          setActive(true)
        }
      } catch(e){
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При подписке произошла ошибка!' }))
      }
    }
  }

  return (
    <>
    {
        user && user.id !== userId &&
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