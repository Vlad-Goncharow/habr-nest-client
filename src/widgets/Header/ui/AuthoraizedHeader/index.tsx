import { IUser } from 'entities/User'
import React from 'react'
import { Link } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import { ReactComponent as CreateSvg } from 'shared/images/svg/createPost.svg'
import { ReactComponent as UserSvg } from 'shared/images/svg/user.svg'
import SideBarUserNav from '../SideBarUserNav'
import UserControls from '../UserControls'
import s from './AuthoraizedHeader.module.scss'

interface AuthoraizedHeaderProps {
  user: IUser
}

const AuthoraizedHeader: React.FC<AuthoraizedHeaderProps> = ({ user }) => {
  const dropDownRef = React.useRef<HTMLDivElement>(null)
  const [dropDown, setDropDown] = React.useState<Boolean>(false)
  UseClickOutside(dropDownRef, () => setDropDown(false))

  const [sideAuth, setSideAuth] = React.useState<boolean>(false)

  return (
    <div className={s.user} ref={dropDownRef}>
      <Link to='/create' className={s.user__icon}>
        <CreateSvg />
      </Link>
      <div className={s.icon}>
        <div onClick={() => setDropDown((prev) => !prev)} className={s.icon__dropdown}>
          <UserSvg />
        </div>
        <div onClick={() => setSideAuth((prev) => !prev)} className={s.icon__sidebar}>
          <UserSvg />
        </div>
      </div>

      {dropDown && (
        <div className={s.user__dropdown} onClick={() => setDropDown(false)}>
          <UserControls user={user} />
        </div>
      )}

      {sideAuth && (
        <SideBarUserNav user={user} setSideNav={setSideAuth} />
      )}
    </div>
  )
}

export default AuthoraizedHeader
