import { checkRolesAdmin, IUser } from 'entities/User'
import { SubscribeUser } from 'features/SubscribeUser'
import React from 'react'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import UserNav from '../../../UserNav/UserNav'
import UserRoles from '../UserRoles/UserRoles'
import s from './UserHeader.module.scss'
import { useTranslation } from 'react-i18next'

interface UserHeaderProps {
  userData: IUser
}

const UserHeader: React.FC<UserHeaderProps> = ({ userData }) => {
  const { t } = useTranslation()
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
              <p>{t('karma')}</p>
            </div>
            <div className={s.stat__item}>
              <span>{userData.rating}</span>
              <p>{t('rating')}</p>
            </div>
          </div>
        </div>
        <SubscribeUser userId={userData.id} />
        {isUserAdmin && <UserRoles userData={userData} />}
      </div>
      <h1 className={s.name}>{`@${userData?.nickname}`}</h1>
      <p className={s.descr}>{userData?.description}</p>
      <p className={s.descr}>
        {t('userFullname')} - {userData?.fullName}
      </p>
      <UserNav />
    </header>
  )
}

export default UserHeader
