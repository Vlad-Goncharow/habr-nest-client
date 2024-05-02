import React from 'react'
import s from './UserControls.module.scss'
import { IUser, fetchLogout } from 'entities/User'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ReactComponent as UserSvg } from 'shared/images/svg/user.svg'

interface UserControlsProps{
  user:IUser
}

const UserControls: React.FC<UserControlsProps> = ({user}) => {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch
  
  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch (e) {
    }
  }

  return (
    <>
      <Link to={`/user/${user?.id}/profile`} className={s.header}>
        <div className={s.icon}>
          <UserSvg />
        </div>
        <span >{user?.nickname}</span>
      </Link>
      <ul className={s.list}>
        <li>
          <Link to={`/user/${user?.id}/posts/1`}>Статьи</Link>
        </li>
        <li>
          <Link to={`/user/${user?.id}/comments/1`}>Коментарии</Link>
        </li>
        <li>
          <Link to={`/user/${user?.id}/favorites/1`}>Закладки</Link>
        </li>
        <li>
          <Link to='/hab/create'>Создать Хаб</Link>
        </li>
      </ul>
      <ul className={s.list}>
        <li>
          <Link to='/profile-settings'>
            <svg className='setting-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z" />
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            <span>
              Настройка профиля
            </span>
          </Link>
        </li>
        <li onClick={logout}>
          <Link to='/flows/all/all/1'>
            <svg className='exit-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M14.4 17.4a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h9.6a.6.6 0 0 1 .6.6V9a.6.6 0 1 0 1.2 0V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V15a.6.6 0 1 0-1.2 0v2.4Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M21.425 12.424a.6.6 0 0 0 0-.85l-3.6-3.6a.6.6 0 0 0-.85.85l2.577 2.576H9a.6.6 0 1 0 0 1.2h10.552l-2.576 2.575a.6.6 0 1 0 .85.85l3.6-3.6Z" clipRule="evenodd" />
            </svg>
            <span>Выход</span>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default UserControls