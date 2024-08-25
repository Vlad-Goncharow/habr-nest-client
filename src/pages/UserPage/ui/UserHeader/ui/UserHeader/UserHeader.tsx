import { checkRolesAdmin, IUser } from 'entities/User'
import { SubscribeUser } from 'features/SubscribeUser'
import React from 'react'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import UserNav from '../../../UserNav'
import UserRoles from '../UserRoles'
import s from './UserHeader.module.scss'

interface UserHeaderProps {
  userData: IUser
}

const UserHeader: React.FC<UserHeaderProps> = ({ userData }) => {
  const isUserAdmin = useAppSelector(checkRolesAdmin)

  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <div className={s.header__left}>
          <div className={s.header__image}>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${userData?.avatar}`}
              alt=''
            />
          </div>
          <div className={s.stat}>
            <div className={s.stat__item}>
              <span>{userData.karma}</span>
              <p>Карма</p>
            </div>
            <div className={s.stat__item}>
              <span>{userData.rating}</span>
              <p>Рейтинг</p>
            </div>
          </div>
        </div>
        <SubscribeUser userId={userData.id} />
        {isUserAdmin && <UserRoles userData={userData} />}
      </div>
      <h1 className={s.name}>{`@${userData?.nickname}`}</h1>
      <p className={s.descr}>{userData?.description}</p>
      <p className={s.descr}>Полное имя - {userData?.fullName}</p>
      <UserNav />
    </header>
  )
}

export default UserHeader
