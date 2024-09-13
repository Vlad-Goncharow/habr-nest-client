import React from 'react'
import s from './ProfileInfo.module.scss'
import { IUser } from 'entities/User'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface ProfileInfoProps {
  userData: IUser
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userData }) => {
  const { t } = useTranslation()
  return (
    <div className={s.info}>
      <ul className={s.stats}>
        <li>
          <div className={s.stats__name}>{t('userGender')}</div>
          <div className={s.stats__info}>{userData.gender}</div>
        </li>
        <li>
          <div className={s.stats__name}>{t('userCounrty')}</div>
          <div className={s.stats__info}>{userData.country}</div>
        </li>
        <li>
          <div className={s.stats__name}>{t('userRegisterDate')}</div>
          <div className={s.stats__info}>
            {moment(userData.createdAt).locale('ru').format('LLL')}
          </div>
        </li>
        {userData.dateOfBirth !== t('userCounrtyEmpty') && (
          <li>
            <div className={s.stats__name}>{t('userDateOfBirth')}</div>
            <div className={s.stats__info}>
              {moment(userData.dateOfBirth).locale('ru').format('LLL')}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ProfileInfo
