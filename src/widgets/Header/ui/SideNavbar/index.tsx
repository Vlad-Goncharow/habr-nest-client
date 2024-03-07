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
          <Link to='/flows/all/posts/1'>Все потоки</Link>
          <Link to='/flows/develop/posts/1'>Разработка</Link>
          <Link to='/flows/admin/posts/1'>Администрирование</Link>
          <Link to='/flows/design/posts/1'>Дизайн</Link>
          <Link to='/flows/management/posts/1'>Менеджмент</Link>
          <Link to='/flows/marketing/posts/1'>Маркетинг</Link>
          <Link to='/flows/popsci/posts/1'>Научпоп</Link>
        </ nav>
      }
    </>
  )
}

export default SideNavbar