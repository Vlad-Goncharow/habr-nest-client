import React from 'react'
import s from './SideNavbar.module.scss'
import { Link } from 'react-router-dom'

interface SideNavbarProps {
  isShow: boolean
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isShow }) => {
  return (
    <>
      {
        isShow &&
        <nav className={s.left} >
          <Link to='/flows/all/articles/1'>Все потоки</Link>
          <Link to='/flows/develop/articles/1'>Разработка</Link>
          <Link to='/flows/admin/articles/1'>Администрирование</Link>
          <Link to='/flows/design/articles/1'>Дизайн</Link>
          <Link to='/flows/management/articles/1'>Менеджмент</Link>
          <Link to='/flows/marketing/articles/1'>Маркетинг</Link>
          <Link to='/flows/popsci/articles/1'>Научпоп</Link>
        </ nav>
      }
    </>
  )
}

export default SideNavbar