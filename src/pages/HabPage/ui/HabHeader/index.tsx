import { SubscribeHab } from 'features/SubscribeHab'
import React from 'react'
import { IHab } from 'shared/types/habs'
import HabNav from '../HabNav'
import s from './HabHeader.module.scss'

interface HabHeaderProps {
  habData: IHab
}

const HabHeader: React.FC<HabHeaderProps> = ({ habData }) => {
  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <div className={s.header__left}>
          <div className={s.header__image}>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${habData?.image}`}
              alt=''
            />
          </div>
          <div className={s.stat}>
            <div className={s.stat__item}>
              <span>{`${habData?.rating}`}</span>
              <p>Рейтинг</p>
            </div>
          </div>
        </div>
        <SubscribeHab habId={habData.id} />
      </div>
      <h1 className={s.name}>{habData?.title}</h1>
      <p className={s.descr}>{habData?.description}</p>
      <HabNav />
    </header>
  )
}

export default HabHeader
