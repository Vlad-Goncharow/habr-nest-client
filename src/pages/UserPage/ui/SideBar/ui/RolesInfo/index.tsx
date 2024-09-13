import React from 'react'
import s from './RolesInfo.module.scss'
import { IUser } from 'entities/User'
import { useTranslation } from 'react-i18next'

interface RolesInfoProps {
  userData: IUser
}

const RolesInfo: React.FC<RolesInfoProps> = ({ userData }) => {
  const { t } = useTranslation()
  return (
    <div className={s.sidebar}>
      <div className={s.title}>{t('userSidebarTitleRoles')}</div>
      <ul className={s.stats}>
        {userData.roles.map((el) => (
          <li className={s.stats__li}>
            <div className={s.stats__item}>{el.value}</div>
            <div className={s.stats__item}>{el.description.toLowerCase()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RolesInfo
