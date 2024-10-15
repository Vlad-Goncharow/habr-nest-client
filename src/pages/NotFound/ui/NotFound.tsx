import React from 'react'
import { useTranslation } from 'react-i18next'
import s from './NotFound.module.scss'

function NotFound() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className={s.title}>{t('notFoundPageTitle')}</h1>
      <p className={s.subTitle}>{t('notFoundPageSubTitle')}</p>
    </div>
  )
}

export default NotFound
