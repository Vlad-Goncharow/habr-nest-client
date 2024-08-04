import { IUser, checkRolesAdmin } from 'entities/User'
import { Logout } from 'features/Logout'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { ReactComponent as ProfileSettings } from 'shared/images/svg/profileSettings.svg'
import { ReactComponent as Settings } from 'shared/images/svg/settingPage.svg'
import { ReactComponent as UserSvg } from 'shared/images/svg/user.svg'
import { HeaderContext } from '../Header/Header'
import s from './UserControls.module.scss'

interface UserControlsProps {
  user: IUser
}

const UserControls: React.FC<UserControlsProps> = ({ user }) => {
  const checkRoles = useAppSelector(checkRolesAdmin)

  const { setSettingsIsOpen } = useContext(HeaderContext)

  const openSettingMenu = () => {
    if (setSettingsIsOpen) {
      setSettingsIsOpen(true)
    }
  }

  return (
    <>
      <Link to={`/user/${user?.id}/profile/1`} className={s.header}>
        <div className={s.icon}>
          <UserSvg />
        </div>
        <span>{user?.nickname}</span>
      </Link>
      <ul className={s.list}>
        <li>
          <Link to={`/user/${user?.id}/publications/articles/1`}>Статьи</Link>
        </li>
        <li>
          <Link to={`/user/${user?.id}/comments/1`}>Коментарии</Link>
        </li>
        <li>
          <Link to={`/user/${user?.id}/favorites/articles/1`}>Закладки</Link>
        </li>
        {checkRoles && (
          <li>
            <Link to='/create-hab'>Создать Хаб</Link>
          </li>
        )}
      </ul>
      <ul className={s.list}>
        <li>
          <Link to='/profile-settings'>
            <ProfileSettings />
            Настройка профиля
          </Link>
        </li>
        <li>
          <div onClick={openSettingMenu} className={s.list__settings}>
            <Settings />
            Язык, лента, тема
          </div>
        </li>
        <Logout />
      </ul>
    </>
  )
}

export default UserControls
