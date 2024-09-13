import { IUser } from 'entities/User'
import moment from 'moment'
import React from 'react'
import s from './UserInfo.module.scss'
import { useTranslation } from 'react-i18next'

interface UserInfoProps {
  userData: IUser
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const { t } = useTranslation()
  return (
    <aside className={s.sidebar}>
      <div className={s.title}>{t('userSidebarTitleInfo')}</div>
      <ul className={s.stats}>
        <li className={s.stats__li}>
          <div className={s.stats__item}>{t('userGender')}</div>
          <div className={s.stats__item}>{t(userData.gender)}</div>
        </li>
        <li className={s.stats__li}>
          <div className={s.stats__item}>{t('userCounrty')}</div>
          <div className={s.stats__item}>{t(userData.country)}</div>
        </li>
        <li className={s.stats__li}>
          <div className={s.stats__item}>{t('userRegisterDate')}</div>
          <div className={s.stats__item}>
            {moment(userData.createdAt).locale('ru').format('LLL')}
          </div>
        </li>
        {userData.dateOfBirth !== t('userCounrtyEmpty') && (
          <li className={s.stats__li}>
            <div className={s.stats__item}>{t('userDateOfBirth')}</div>
            <div className={s.stats__item}>
              {moment(userData.dateOfBirth).locale('ru').format('LLL')}
            </div>
          </li>
        )}
      </ul>
    </aside>
  )
}

export default UserInfo
