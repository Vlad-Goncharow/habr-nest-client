import { IUser } from 'entities/User'
import React from 'react'
import EmptyPosts from 'shared/ui/EmptyPosts'
import s from './SubsList.module.scss'
import { Link } from 'react-router-dom'

interface SubsListProps {
  subs: IUser[] | []
}

const SubsList: React.FC<SubsListProps> = ({subs}) => {
  return (
    <> 
      {
        subs.length > 0 ?
          subs.map((el: IUser) =>
            <div className={s.user}>
              <div className={s.user__info}>
                <div className={s.user__image}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}${el.avatar}`} alt={`Картинка юзера ${el.nickname}`} />
                </div>
                <Link to={`/user/${el.id}/profile`} className={s.user__nickname}>{el.nickname}</Link>
              </div>
              <div className={s.stats}>
                <div className={s.stats__item}>
                  {el.rating}
                </div>
                <div className={s.stats__item}>
                  {el.karma}
                </div>
              </div>
            </div>
          )
          :
          <EmptyPosts />
      }
    </>
  )
}

export default SubsList