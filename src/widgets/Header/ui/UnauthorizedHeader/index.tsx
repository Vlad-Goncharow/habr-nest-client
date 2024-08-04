import React, { useContext } from 'react'
import s from './UnauthorizedHeader.module.scss'
import { ReactComponent as Settings } from 'shared/images/svg/settingPage.svg'
import { Link } from 'react-router-dom'
import { HeaderContext } from '../Header/Header'

function UnauthorizedHeader() {
  const { setSettingsIsOpen } = useContext(HeaderContext)

  const openSettingMenu = () => {
    if (setSettingsIsOpen) {
      setSettingsIsOpen(true)
    }
  }

  return (
    <>
      <div onClick={openSettingMenu} className={s.settings}>
        <Settings />
      </div>
      <Link to='/login' type='button' className={s.btn}>
        Войти
      </Link>
    </>
  )
}

export default UnauthorizedHeader
