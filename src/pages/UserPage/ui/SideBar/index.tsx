import { IUser } from 'entities/User'
import moment from 'moment'
import React from 'react'
import s from './SideBar.module.scss'

interface SideBarProps{
  userData:IUser
}

const SideBar: React.FC<SideBarProps> = ({userData}) => {
  return (
    <aside className={s.sidebar}>
      <div className={s.title}>Информация</div>
      <ul className={s.stats}>
        <li className={s.stats__li}>
          <div className={s.stats__item}>Пол</div>
          <div className={s.stats__item}>{userData.gender}</div>
        </li>
        <li className={s.stats__li}>
          <div className={s.stats__item}>Откуда</div>
          <div className={s.stats__item}>{userData.country}</div>
        </li>
        <li className={s.stats__li}>
          <div className={s.stats__item}>Зарегистрирован</div>
          <div className={s.stats__item}>{moment(userData.createdAt).locale('ru').format('LLL')}</div>
        </li>
        {
          userData.dateOfBirth !== 'Не известно' &&
          <li className={s.stats__li}>
            <div className={s.stats__item}>Дата рождения</div>
            <div className={s.stats__item}>{moment(userData.dateOfBirth).locale('ru').format('LLL')}</div>
          </li>
        }
      </ul>
    </aside>
  )
}

export default SideBar