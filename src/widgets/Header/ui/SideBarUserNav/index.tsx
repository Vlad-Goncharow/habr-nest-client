import React from 'react'
import s from './SideBarUserNav.module.scss'
import { IUser } from 'entities/User'
import UserControls from '../UserControls'

interface SideBarUserNavProps {
  user: IUser
  setSideNav: (bool: boolean) => void
}

const SideBarUserNav: React.FC<SideBarUserNavProps> = ({
  setSideNav,
  user,
}) => {
  const [show, setShow] = React.useState(true)
  const [isClose, setIsClose] = React.useState(false)

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let timer: any
    if (show) {
      timer = setTimeout(() => {
        document.body.style.overflow = 'hidden'
        wrapperRef.current?.classList.remove(s.sidebar_close)
        wrapperRef.current?.classList.add(s.sidebar_open)
      }, 200)
    }

    if (isClose) {
      document.body.style.overflow = ''
      wrapperRef.current?.classList.remove(s.sidebar_open)
      wrapperRef.current?.classList.add(s.sidebar_close)

      timer = setTimeout(() => {
        setShow(false)
        setSideNav(false)
      }, 200)
    }

    return () => {
      document.body.style.overflow = ''
      clearTimeout(timer)
    }
  }, [isClose, show])

  return (
    <div onClick={() => setIsClose(true)} className={s.wrapper}>
      <div className={s.wrapper__overlay}></div>

      <div ref={wrapperRef} className={s.sidebar}>
        <UserControls user={user} />
      </div>
    </div>
  )
}

export default SideBarUserNav
