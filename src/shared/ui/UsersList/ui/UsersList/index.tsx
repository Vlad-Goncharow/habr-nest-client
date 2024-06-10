import { IUser } from 'entities/User'
import React from 'react'
import Empty from 'shared/ui/Empty'
import Pagination from 'widgets/Pagination'
import Skeleton from '../UsersSkeleton'
import UserItem from '../UserItem'
import s from './UsersList.module.scss'

interface UsersProps {
  users: IUser[] | []
  usersLoading: boolean
  usersTotalCount: number
  navigatePath:string
}

const UsersList: React.FC<UsersProps> = ({users,usersLoading,usersTotalCount,navigatePath}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.name}>Имя</div>
          <div className={s.stats}>
            <div className={s.stats__item}>Рейтинг</div>
            <div className={s.stats__item}>Карма</div>
          </div>
        </div>
        {
          usersLoading ? <Skeleton />  :
            usersTotalCount > 0 ?
                users.map((el: IUser) =>
                  <UserItem key={el.id} user={el} />
                )
              :
                <Empty />
        }
      </div>
      <Pagination length={usersTotalCount} pageSize={20} navigatePath={navigatePath} />
    </div>
  )
}

export default UsersList