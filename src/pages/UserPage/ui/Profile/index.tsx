import React from 'react'
import s from './Profile.module.scss'
import Hab from '../Hab'
import { IUser } from 'entities/User'

interface ProfileProps{
  userData: IUser
}

const Profile: React.FC<ProfileProps> = ({userData}) => {
  return (
    <div className={s.wrapper}>
      {
        userData.habSubscribers.length > 0 ?
          <div className={s.item}>
            <h2 className={s.item__title}>Состоит в хабах</h2>
            <div className={s.item__list}>
              {
                userData.habSubscribers.map(el =>
                  <Hab habData={el} />
                )
              }
            </div>
          </div>
        :
          <div className={s.item}>
            <h2 className={s.item__title}>Пользователь не состоит в хабах</h2>
          </div>
      }
    </div>
  )
}

export default Profile