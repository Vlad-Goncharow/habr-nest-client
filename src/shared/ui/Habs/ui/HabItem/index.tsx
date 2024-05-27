import React from 'react'
import s from './HabItem.module.scss'
import { IHab } from 'shared/types/habs'
import { Link } from 'react-router-dom'

interface HabItemProps {
  hab:IHab
}

const HabItem:React.FC<HabItemProps> = ({hab}) => {
  return (
    <div key={hab.id} className={s.hab}>
      <div className={s.hab__left}>
        <div className={s.hab__image}>
        <img src={`${process.env.REACT_APP_SERVER_URL}/${hab.image}`} alt="" />
        </div>
        <div>
          <Link to={`/hab/${hab.id}/articles/1`} className={s.hab__title}>{hab.title}</Link>
          <p className={s.hab__descr}>{hab.description}</p>
        </div>
      </div>
      <div className={s.habStats}>
        <div className={s.habStats__item}>{hab.rating}</div>
        <div className={s.habStats__item}>{hab.usersSubscribersCount}</div>
      </div>
    </div>
  )
}

export default HabItem