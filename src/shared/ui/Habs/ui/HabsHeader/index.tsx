import classNames from 'classnames'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import s from './HabsHeader.module.scss'
import { useTranslation } from 'react-i18next'

const HabsHeader: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const query = searchParams.get('q')

  const newOrder = order === 'desc' ? 'asc' : 'desc'
  const queryString = query ? `&q=${query}` : ''

  return (
    <div className={s.row}>
      <div className={s.name}>
        <span>{t('habsListSortTitle')}</span>
      </div>
      <div className={s.sort}>
        <Link
          to={`./?sort=rating&order=${newOrder}${queryString}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'rating',
            [s.sort__item_rotate]: order === 'asc' && sort === 'rating',
          })}
        >
          <span>{t('habsListSortRating')}</span>
          <ArrowSvg />
        </Link>
        <Link
          to={`./?sort=subs&order=${newOrder}${queryString}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'subs',
            [s.sort__item_rotate]: order === 'asc' && sort === 'subs',
          })}
        >
          <span>{t('habsListSortSubs')}</span>
          <ArrowSvg />
        </Link>
      </div>
    </div>
  )
}

export default HabsHeader
