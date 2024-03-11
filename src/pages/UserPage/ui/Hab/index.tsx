import React from 'react'
import { IStatHab, IHab } from 'shared/types/habs'
import s from './Hab.module.scss'
import HabSubscribeBtn from 'shared/ui/HabSubscribeBtn'
import axios from '../../../../axios'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { getUserData } from 'entities/User'

interface HabProps{
  habData:IHab
}

const Hab: React.FC<HabProps> = ({habData}) => {
  const {user} = useAppSelector(getUserData)

  const [habInfo, setHabInfo] = React.useState<IStatHab | null>(null)
  const habRef = React.useRef<HTMLDivElement>(null)

  const [menuIsAactive, setMenuIsActive] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const overFunc = async () => {
      setMenuIsActive(true)
      const {data} = await axios.get(`/habs/short/${habData.id}`)
      setHabInfo(data)
    }

    const outFunc = () => {
      setMenuIsActive(false)
    }

    habRef.current?.addEventListener('mouseover', overFunc)
    habRef.current?.addEventListener('mouseout', outFunc)
  },[habData.id])

  return (
    <div ref={habRef} className={s.hab}>
      <Link 
        to={`/hab/${habData.id}/articles`} 
        className={classNames(s.title,{
          [s.title_active]:user?.habSubscribers.find((el) => el.id === habData.id)
        })}
      >
        {habData.title}
      </Link>
      {
        menuIsAactive && 
        <div className={s.menu}>
          <div className={s.menu__header}>
            <div className={s.image}>
              <img src={`${process.env.REACT_APP_SERVER_URL}${habData.image}`} alt={`Картинка хаба ${habData.title}`}/>
            </div>
            <div className={s.rating}>
              <span>0</span>
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