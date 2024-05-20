import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IHab } from 'shared/types/habs'
import EmptyPosts from 'shared/ui/EmptyPosts'
import UsersSkeleton from 'shared/ui/UsersSkeleton'
import Pagination from 'widgets/Pagination'
import s from './Habs.module.scss'
import { ReactComponent as ArrowSvg } from 'shared/images/svg/arrow.svg'
import classNames from 'classnames'

interface HabsProps{
  habs:IHab[] | []
  habsLoading:boolean,
  habsTotalCount: number;
  pageSize: number;
  setSortOptions:any
}

const Habs: React.FC<HabsProps> = ({ habs, habsLoading, habsTotalCount, pageSize, setSortOptions}) => {
  //params
  const { category, type } = useParams()


  const [sortActive, setSortActive] = React.useState('')

  const [ratingActive, setRatingActive] = React.useState(false)
  const [subsActive, setSubsActive] = React.useState(false)

  const [subsOrder, setSubsOrder] = React.useState('asc')
  const [ratingOrder, setRatingOrder] = React.useState('asc')
  
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.name}>
            <span>Название</span>
          </div>
          <div className={s.stats}>
            <div 
              className={classNames(s.stats__item,{
                [s.stats__item_active]: sortActive === 'rating',
                [s.stats__item_rotate]: ratingOrder === 'asc'
              })}
              onClick={() => {
                setSortActive('rating')
                setSortOptions({ sort: 'rating', order: ratingOrder })
                setSubsActive(false)
                setRatingActive(true)

                if(ratingActive){
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
              className={classNames(s.stats__item, {
                [s.stats__item_active]: sortActive === 'subs',
                [s.stats__item_rotate]: subsOrder === 'asc'
              })}
              onClick={() => {
                setSortActive('subs')
                setSortOptions({ sort: 'subs', order: subsOrder })
                setRatingActive(false)
                setSubsActive(true)

                if(subsActive){
                  setSubsOrder(prev => {
                    if(prev === 'asc'){
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
                    <div key={el.id} className={s.hab}>
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