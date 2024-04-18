import { IUser } from 'entities/User'
import s from './SubscribersList.module.scss'
import React from 'react'
import UsersSkeleton from '../UsersSkeleton'
import Pagination from 'widgets/Pagination'
import SubsList from 'shared/ui/SubsList'

interface SubscribersListProps{
  loading:boolean
  users: IUser[] | []
  length:number
  navigatePath:string
}

const SubscribersList: React.FC<SubscribersListProps> = ({ loading, users, length, navigatePath }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <div className={s.name}>Имя</div>
        <div className={s.stats}>
          <div className={s.stats__item}>Рейтинг</div>
          <div className={s.stats__item}>Карма</div>
        </div>
      </div>
      {
        loading
          ?
            <UsersSkeleton />
          :
          <>
            <div className={s.list}>
              {
                <SubsList subs={users} />
              }
            </div>
            <Pagination length={length} navigatePath={navigatePath} pageSize={10} />
          </>
      }
    </div>
  )
}

export default SubscribersList