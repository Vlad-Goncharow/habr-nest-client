import { getUserData } from 'entities/User'
import React, { createContext } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import Controls from '../Controls'
import Navbar from '../Navbar'
import SettingsMenu from '../SettingsMenu'
import SidebarNavbar from '../SidebarNavbar'
import s from './Header.module.scss'

interface IHeaderContext {
  settingIsOpen?: boolean
  setSettingsIsOpen?: (bool: boolean) => void
}

export const HeaderContext = createContext<IHeaderContext>({})

function Header() {
  const { user } = useAppSelector(getUserData)

  const [settingIsOpen, setSettingsIsOpen] = React.useState<boolean>(false)
  const [sideNav, setSideNav] = React.useState<Boolean>(false)

  return (
    <HeaderContext.Provider value={{ settingIsOpen, setSettingsIsOpen }}>
      <header className={s.header}>
        <div className={s.header__top}>
          <div className={'container'}>
            <div className={s.row}>
              <div onClick={() => setSideNav(true)} className={s.burger}>
                <span></span>
              </div>

              <Link to='/flows/all/articles/1' className={s.logo}>
                Не Хабр!
              </Link>

              <div className={s['media__controls-top']}>
                <Controls user={user} />
              </div>
            </div>
          </div>
        </div>
        <div className={'container'}>
          <div className={s.row}>
            <div className={s.media__nav}>
              <Navbar />
            </div>
            <div className={s['media__controls-bottom']}>
              <Controls user={user} />
            </div>
          </div>
        </div>
      </header>

      {sideNav &&
        createPortal(<SidebarNavbar setSideNav={setSideNav} />, document.body)}

      {settingIsOpen &&
        createPortal(
          <SettingsMenu onClose={() => setSettingsIsOpen(false)} />,
          document.body
        )}
    </HeaderContext.Provider>
  )
}

export default Header
