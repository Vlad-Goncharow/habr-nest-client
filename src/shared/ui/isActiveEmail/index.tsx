import React from 'react'
import s from './isActiveEmail.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { checkIsActiveEmail } from 'entities/User'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const IsActiveEmail = ({ children }: any) => {
  const { t } = useTranslation()
  const isActiveEmail = useAppSelector(checkIsActiveEmail)

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !isActiveEmail) {
      e.preventDefault()
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      title={!isActiveEmail && t('createHabTitleAtr')}
      className={classNames(s.item, {
        [s.item_disable]: !isActiveEmail,
      })}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

export default IsActiveEmail
