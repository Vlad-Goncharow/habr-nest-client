import React from 'react'
import s from './ProfileInfo.module.scss'
import { IUser } from 'entities/User'
import moment from 'moment'

interface ProfileInfoProps{
  userData:IUser
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({userData}) => {
  return (
    <div className={s.info}>
      <ul className={s.stats}>
        <li>
          <div className={s.stats__name}>Пол</div>
          <div className={s.stats__info}>{userData.gender}</div>
        </li>
        <li>
          <div className={s.stats__name}>Откуда</div>
          <div className={s.stats__info}>{userData.country}</div>
        </li>
        <li>
          <div className={s.stats__name}>Зарегистрирован</div>
          <div className={s.stats__info}>{moment(userData.createdAt).locale('ru').format('LLL')}</div>
        </li>
        {
          userData.dateOfBirth !== 'Не известно' &&
          <li>
            <div className={s.stats__name}>Дата рождения</div>
            <div className={s.stats__info}>{moment(userData.dateOfBirth).locale('ru').format('LLL')}</div>
          </li>
        }
      </ul>
    </div>
  )
}

export default ProfileInfo