import { getUserData } from 'entities/User'
import React from 'react'
import { Link } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import UseWindowWidth from 'shared/hooks/UseWindowWidth'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import Controls from '../Controls'
import SideNavbar from '../SideNavbar'
import s from './Header.module.scss'

function Header() {
  // ======== current user
  const { user } = useAppSelector(getUserData)
  // ======== current user

  const isChangeControlsPos = UseWindowWidth(1024)
  const sideNavShow = UseWindowWidth(768)

  // ======== side nav menu is open
  const [sideNav, setSideNav] = React.useState<Boolean>(false)
  const [sideNavIsClose, setSideNavIsClose] = React.useState(false)
  const sideNavRef = React.useRef<HTMLDivElement>(null)
  UseClickOutside(sideNavRef, () => setSideNavIsClose(true))

  React.useEffect(() => {
    let timer: any;

    if (sideNav && !sideNavIsClose) {
      timer = setTimeout(() => {
        sideNavRef.current?.classList.remove(s.header__sideNav_close)
        sideNavRef.current?.classList.add(s.header__sideNav_open)
      }, 200)
    }

    if (sideNavIsClose) {
      sideNavRef.current?.classList.remove(s.header__sideNav_open)
      sideNavRef.current?.classList.add(s.header__sideNav_close)
      
      timer = setTimeout(() => {
        setSideNav(false)
        setSideNavIsClose(false)
      }, 200)
    }
   
    return () => {
      clearTimeout(timer)
    }
  }, [sideNav, sideNavIsClose, isChangeControlsPos])

  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <div className={'container'}>
          <div className={s.row}>
            <div onClick={() => setSideNav(true)} className={s.burger}>
              <span></span>
            </div>
            
            <Link to='/flows/all/all/1' className={s.logo}>
              Хабр
            </Link>

            {
              isChangeControlsPos &&
              <Controls user={user} />
            }
          </div>
        </div>
      </div>
      <div className={'container'}>
        <div className={s.row}>
          <SideNavbar isShow={!sideNavShow} />
          {
            !isChangeControlsPos &&
            <Controls user={user} />
          }
        </div>
      </div>

      {
        sideNavShow && sideNav &&
        <div className={s.header__overlay}>
          <div ref={sideNavRef} onClick={() => setSideNavIsClose(true)} className={s.header__sideNav}>
            <SideNavbar isShow={true} />
          </div>
        </div>
      }
    </header >
  )
}

export default Header