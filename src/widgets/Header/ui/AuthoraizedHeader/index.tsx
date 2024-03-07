import { IUser } from 'entities/User'
import React from 'react'
import { Link } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import UseWindowWidth from 'shared/hooks/UseWindowWidth'
import UserControls from '../UserControls'
import s from './AuthoraizedHeader.module.scss'
import { ReactComponent as UserSvg } from 'shared/images/svg/user.svg'
import { ReactComponent as CreateSvg } from 'shared/images/svg/createPost.svg'

interface AuthoraizedHeaderProps {
  user: IUser
}

const AuthoraizedHeader: React.FC<AuthoraizedHeaderProps> = ({user}) => {
  const isMobile = UseWindowWidth(1024)

  const dropDownRef = React.useRef<HTMLDivElement>(null)
  const [dropDown, setDropDown] = React.useState<Boolean>(false)
  UseClickOutside(dropDownRef, () => setDropDown(false))

  const [sideAuth, setSideAuth] = React.useState<boolean>(false)
  const [sideBarIsClose, setSideBarIsClose] = React.useState(false)
  const sideAuthRef = React.useRef<HTMLDivElement>(null)
  UseClickOutside(sideAuthRef, () => setSideBarIsClose(true))


  React.useEffect(() => {
    let timer:any;

    if (sideAuth && !sideBarIsClose){
      timer = setTimeout(() => {
        sideAuthRef.current?.classList.remove(s.user__sidebar_close)
        sideAuthRef.current?.classList.add(s.user__sidebar_open)
      },200)
    }

    if (sideBarIsClose){
      sideAuthRef.current?.classList.remove(s.user__sidebar_open)
      sideAuthRef.current?.classList.add(s.user__sidebar_close)
      
      timer = setTimeout(() => {
        setSideAuth(false)
        setSideBarIsClose(false)
      }, 200)
    }

    if (sideAuth === true) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = '0'
    }

    return () => {
      clearTimeout(timer)
    }
  }, [sideAuth, sideBarIsClose])
  
  return (
    <div className={s.user}>
      <Link to='/post/create' className={s.user__icon}>
        <CreateSvg />
      </Link>
      <div 
        onClick={() => isMobile ? setSideAuth(prev => !prev) : setDropDown(prev => !prev)} 
        className={s.user__icon + ' ' + s.user__icon_user}
      >
        <UserSvg />
      </div>
      

      {
        dropDown &&
        <div className={s.user__dropdown} onClick={() => setDropDown(false)} ref={dropDownRef}>
          <UserControls user={user} />
        </div>
      }


      {
        isMobile && sideAuth &&
        <div className={s.user__overlay}>
          <div ref={sideAuthRef} onClick={() => setSideBarIsClose(true)} className={s.user__sidebar}>
            <UserControls user={user} />
          </div>
        </div>
      }
    </div>
  )
}

export default AuthoraizedHeader