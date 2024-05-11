import { IUser } from 'entities/User'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyPosts from 'shared/ui/EmptyPosts'
import UsersSkeleton from 'shared/ui/UsersSkeleton'
import Pagination from 'widgets/Pagination'
import s from './Aurhors.module.scss'

interface AuthorsProps{
  authors:IUser[] | []
  authorsLoading:boolean
  authorsTotalCount:number
  pageSize:number
}

const Aurhors: React.FC<AuthorsProps> = ({authors,authorsLoading,authorsTotalCount,pageSize}) => {
  //params
  const { category, type, page } = useParams()

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.name}>
            <span>Имя</span>
          </div>
        </div>
        {
          authorsLoading
          ?
            <UsersSkeleton />
          :
            authorsTotalCount > 0
            ?
              <>
                {
                  authors.map((el:IUser) =>
                    <div className={s.hab}>
                      <Link to={`/user/${el.id}/profile`} className={s.hab__left}>
                        <div className={s.hab__image}>
                          <img src={`${process.env.REACT_APP_SERVER_URL}/${el.avatar}`} alt="" />
                        </div>
                        <div>
                          <h1 className={s.hab__title}>{el.nickname}</h1>
                          <p className={s.hab__descr}>{el.description}</p>
                        </div>
                      </Link>
                      <div className={s.habStats}>
                        <div className={s.habStats__item}>{el.rating}</div>
                      </div>
                    </div>
                  )
                }
              </>
            :
              <EmptyPosts />
        }
      </div>

      <Pagination length={authorsTotalCount} pageSize={pageSize} navigatePath={`/flows/${category}/${type}`} />
    </div>
  )
}

export default Aurhors