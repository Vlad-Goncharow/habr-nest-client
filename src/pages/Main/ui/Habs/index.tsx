import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IHab } from 'shared/types/habs'
import EmptyPosts from 'shared/ui/EmptyPosts'
import UsersSkeleton from 'shared/ui/UsersSkeleton'
import Pagination from 'widgets/Pagination'
import s from './Habs.module.scss'

interface HabsProps{
  habs:IHab[] | []
  habsLoading:boolean,
  habsTotalCount: number;
  pageSize: number;
}

const Habs: React.FC<HabsProps> = ({habs,habsLoading,habsTotalCount,pageSize}) => {
  //params
  const { category, type } = useParams()

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.name}>
            <span>Название</span>
          </div>
          <div className={s.stats}>
            <div className={s.stats__item}>Рейтинг</div>
            <div className={s.stats__item}>Подписчики</div>
          </div>
        </div>
        {
          habsLoading 
          ?
            <UsersSkeleton />
          :
            habsTotalCount > 0 
            ?
              <>
                {
                  habs.map(el =>
                    <div className={s.hab}>
                      <div className={s.hab__left}>
                        <div className={s.hab__image}>
                          <img src={`${process.env.REACT_APP_SERVER_URL}/${el.image}`} alt="" />
                        </div>
                        <div>
                          <Link to={`/hab/${el.id}/articles/1`} className={s.hab__title}>{el.title}</Link>
                          <p className={s.hab__descr}>{el.description}</p>
                        </div>
                      </div>
                      <div className={s.habStats}>
                        <div className={s.habStats__item}>{el.rating}</div>
                        <div className={s.habStats__item}>{el.usersSubscribersCount}</div>
                      </div>
                    </div>
                  )
                }
              </>
            : 
              <EmptyPosts />
        }
      </div>
      
      <Pagination length={habsTotalCount} pageSize={pageSize} navigatePath={`/flows/${category}/${type}`} />
    </div>
  )
}

export default Habs