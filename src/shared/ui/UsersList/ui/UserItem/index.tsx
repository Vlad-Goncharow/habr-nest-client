import React from 'react'
import s from './UserItem.module.scss'
import { Link } from 'react-router-dom'
import { IUser } from 'entities/User'

interface UserItemProps{
  user:IUser
}

const UserItem: React.FC<UserItemProps> = ({user}) => {
  return (
    <div className={s.user}>
      <div className={s.user__info}>
        <div className={s.user__image}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${user.avatar}`} alt={`Картинка юзера ${user.nickname}`} />
        </div>
        <Link to={`/user/${user.id}/profile`} className={s.user__nickname}>{user.nickname}</Link>
      </div>
      <div className={s.stats}>
        <div className={s.stats__item}>
          {user.rating}
        </div>
        <div className={s.stats__item}>
          {user.karma}
        </div>
      </div>
    </div>
  )
}

export default UserItem