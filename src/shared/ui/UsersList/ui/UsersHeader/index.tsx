import React from 'react'
import s from './UsersHeader.module.scss'
import { Link, useSearchParams } from 'react-router-dom'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

function UsersHeader() {
  const {t} = useTranslation()
  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const query = searchParams.get('q')
  const queryString = query ? `&q=${query}` : ''

  return (
    <div className={s.row}>
      <div className={s.name}>{t('authorsListSortTitle')}</div>
      <div className={s.sort}>
        <Link
          to={`./?sort=rating&order=${order === 'desc' ? 'asc' : 'desc'}${queryString}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'rating',
            [s.sort__item_rotate]: order === 'asc' && sort === 'rating',
          })}
        >
          <span>{t('authorsListSortRating')}</span>
          <ArrowSvg />
        </Link>
        <Link
          to={`./?sort=karma&order=${order === 'desc' ? 'asc' : 'desc'}${queryString}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'karma',
            [s.sort__item_rotate]: order === 'asc' && sort === 'karma',
          })}
        >
          <span>{t('authorsListSortKarma')}</span>
          <ArrowSvg />
        </Link>
      </div>
    </div>
  )
}

export default UsersHeader
