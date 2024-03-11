import { IUser } from 'entities/User'
import React from 'react'
import SubscribeBtn from 'shared/ui/SubscribeBtn'
import UserNav from '../UserNav'
import s from './UserHeader.module.scss'

interface UserHeaderProps{
  userData:IUser
}

const UserHeader: React.FC<UserHeaderProps> = ({userData}) => {
  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <div className={s.header__left}>
          <div className={s.header__image}>
            <img src={`${process.env.REACT_APP_SERVER_URL}${userData?.avatar}`} alt="" />
          </div>
          <div className={s.stat}>
            <div className={s.stat__item}>
              <span>`{`${userData?.karma}`}</span>
              <p>Карма</p>
            </div>
            <div className={s.stat__item}>
              <span>`{`${userData?.rating}`}</span>
              <p>Рейтинг</p>
            </div>
          </div>
        </div>
        <SubscribeBtn userId={userData.id} />
      </div>
      <h1 className={s.name}>{`@${userData?.nickname}`}</h1>
      <p className={s.descr}>{userData?.description}</p>
      <UserNav />
    </header>
  )
}

export default UserHeader