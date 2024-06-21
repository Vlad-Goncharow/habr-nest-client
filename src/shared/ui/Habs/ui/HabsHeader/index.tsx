import classNames from 'classnames'
import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import s from './HabsHeader.module.scss'

const HabsHeader: React.FC = () => {
  const { category, type, page } = useParams()
  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <div className={s.row}>
      <div className={s.name}>
        <span>Название</span>
      </div>
      <div className={s.sort}>
        <Link to={`/flows/${category}/${type}/${page}?sort=rating&order=${order === 'desc' ? 'asc' : 'desc'}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'rating',
            [s.sort__item_rotate]: order === 'asc' && sort === 'rating'
          })}
        >
          <span>Рейтинг</span>
          <ArrowSvg />
        </Link>
        <Link to={`/flows/${category}/${type}/${page}?sort=subs&order=${order === 'desc' ? 'asc' : 'desc'}`}
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'subs',
            [s.sort__item_rotate]: order === 'asc' && sort === 'subs'
          })}
        >
          <span>Подписчики</span>
          <ArrowSvg />
        </Link>
      </div>
    </div>
  )
}

export default HabsHeader
