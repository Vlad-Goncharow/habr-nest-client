import React from 'react'
import s from './UsersHeader.module.scss'
import { Link, useSearchParams } from 'react-router-dom'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import classNames from 'classnames'

function UsersHeader() {
  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  
  return (
    <div className={s.row}>
      <div className={s.name}>Имя</div>
      <div className={s.sort}>
        <Link 
          to={`./?sort=rating&order=${order === 'desc' ? 'asc' : 'desc'}`} 
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'rating',
            [s.sort__item_rotate]: order === 'asc' && sort === 'rating'
          })}
        >
          <span>Рейтинг</span>
          <ArrowSvg />
        </Link>
        <Link 
          to={`./?sort=karma&order=${order === 'desc' ? 'asc' : 'desc'}`} 
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sort === 'karma',
            [s.sort__item_rotate]: order === 'asc' && sort === 'karma'
          })}
        >
          <span>Карма</span>
          <ArrowSvg />
        </Link>
      </div>
    </div>
  )
}

export default UsersHeader