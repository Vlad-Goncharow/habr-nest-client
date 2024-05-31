import classNames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import s from './HabsHeader.module.scss'

interface HabsHeaderProps{
  setSortOptions: Dispatch<SetStateAction<{ sort: string; order: string; }>>
}

const HabsHeader: React.FC<HabsHeaderProps> = ({setSortOptions}) => {
  const [sortActive, setSortActive] = React.useState('')

  const [ratingActive, setRatingActive] = React.useState(false)
  const [subsActive, setSubsActive] = React.useState(false)

  const [subsOrder, setSubsOrder] = React.useState('asc')
  const [ratingOrder, setRatingOrder] = React.useState('asc')

  return (
    <div className={s.row}>
      <div className={s.name}>
        <span>Название</span>
      </div>
      <div className={s.sort}>
        <div
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sortActive === 'rating',
            [s.sort__item_rotate]: ratingOrder === 'asc'
          })}
          onClick={() => {
            setSortActive('rating')
            setSortOptions({ sort: 'rating', order: ratingOrder })
            setSubsActive(false)
            setRatingActive(true)

            if (ratingActive) {
              setRatingOrder(prev => {
                if (prev === 'asc') {
                  setSortOptions({ sort: 'rating', order: 'desc' })
                  return 'desc'
                } else {
                  setSortOptions({ sort: 'rating', order: 'asc' })
                  return 'asc'
                }
              })
            }
          }}
        >
          <span>
            Рейтинг
          </span>
          <ArrowSvg />
        </div>
        <div
          className={classNames(s.sort__item, {
            [s.sort__item_active]: sortActive === 'subs',
            [s.sort__item_rotate]: subsOrder === 'asc'
          })}
          onClick={() => {
            setSortActive('subs')
            setSortOptions({ sort: 'subs', order: subsOrder })
            setRatingActive(false)
            setSubsActive(true)

            if (subsActive) {
              setSubsOrder(prev => {
                if (prev === 'asc') {
                  setSortOptions({ sort: 'subs', order: 'desc' })
                  return 'desc'
                } else {
                  setSortOptions({ sort: 'subs', order: 'asc' })
                  return 'asc'
                }
              })
            }
          }}
        >
          <span>Подписчики</span>
          <ArrowSvg />
        </div>
      </div>
    </div>
  )
}

export default HabsHeader