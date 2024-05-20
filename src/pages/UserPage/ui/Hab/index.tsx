import React from 'react'
import { IStatHab, IHab } from 'shared/types/habs'
import s from './Hab.module.scss'
import HabSubscribeBtn from 'shared/ui/HabSubscribeBtn'
import axios from '../../../../axios'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { getUserData } from 'entities/User'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'

interface HabProps{
  habData:IHab
}

const Hab: React.FC<HabProps> = ({habData}) => {
  const dispatch = useAppDispatch()

  //current user
  const {user} = useAppSelector(getUserData)

  //is loaded hab info
  const [loading, setLoading] = React.useState<boolean>(true)

  //loaded hab
  const [habInfo, setHabInfo] = React.useState<IStatHab | null>(null)
  const habRef = React.useRef<HTMLDivElement>(null)

  //menu is open
  const [menuIsAactive, setMenuIsActive] = React.useState<boolean>(true)

  const mouseEnter = async () => {
    try {
      setLoading(true)
      setMenuIsActive(true)
      const { data } = await axios.get(`/habs/short/${habData.id}`)
      setHabInfo(data)
      setLoading(false)
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      setMenuIsActive(false)
      setLoading(false)
    }
  }

  const mouseLeave = () => {
    setMenuIsActive(false)
  }

  return (
    <div 
      ref={habRef} 
      onMouseEnter={mouseEnter} 
      onMouseLeave={mouseLeave} 
      className={s.hab}
    >
      <Link 
        to={`/hab/${habData.id}/articles/1`} 
        className={classNames(s.title,{
          [s.title_active]:user?.habSubscribers.find((el) => el.id === habData.id)
        })}
      >
        {habData.title}
      </Link>
      {
        menuIsAactive && loading === false &&
        <div className={s.menu}>
          <div className={s.menu__header}>
            <div className={s.image}>
              <img src={`${process.env.REACT_APP_SERVER_URL}${habData.image}`} alt={`Картинка хаба ${habData.title}`}/>
            </div>
            <div className={s.rating}>
              <span>{habInfo?.hab.rating}</span>
              <span>Рейтинг</span>
            </div>
          </div>
            <span className={s.hab__title}>{habInfo?.hab.title}</span>
            <span className={s.hab__descr}>{habInfo?.hab.description}</span>
            <HabSubscribeBtn habId={habData.id} />
          <div className={s.stats}>
            <div className={s.stats__item}>Публикации {habInfo?.posts}</div>
              <div className={s.stats__item}>Подписчики {habInfo?.subscribers}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default Hab