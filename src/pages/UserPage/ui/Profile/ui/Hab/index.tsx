import classNames from 'classnames'
import { getUserData } from 'entities/User'
import { SubscribeHab } from 'features/SubscribeHab'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import s from './Hab.module.scss'
import { HabsType } from 'shared/types/habs'
import { useTranslation } from 'react-i18next'

interface HabProps {
  habData: HabsType
}

const Hab: React.FC<HabProps> = ({ habData }) => {
  const { t } = useTranslation()
  const { user } = useAppSelector(getUserData)

  const habRef = React.useRef<HTMLDivElement>(null)

  const [habFullInfoIsOpen, setHabInfoIsOpen] = React.useState<boolean>(false)

  return (
    <div
      ref={habRef}
      onMouseEnter={() => setHabInfoIsOpen(true)}
      onMouseLeave={() => setHabInfoIsOpen(false)}
      className={s.hab}
    >
      <Link
        to={`/hab/${habData.id}/articles/1`}
        className={classNames(s.title, {
          [s.title_active]: user?.habSubscribers.find(
            (el) => el.id === habData.id
          ),
        })}
      >
        {habData.title}
      </Link>
      {habFullInfoIsOpen && (
        <div className={s.menu}>
          <div className={s.menu__header}>
            <div className={s.image}>
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/${habData.image}`}
                alt={`Картинка хаба ${habData.title}`}
              />
            </div>
            <div className={s.rating}>
              <span>{habData.rating}</span>
              <span>{t('rating')}</span>
            </div>
          </div>
          <span className={s.hab__title}>{habData.title}</span>
          <span className={s.hab__descr}>{habData.description}</span>
          <SubscribeHab habId={habData.id} />
          <div className={s.stats}>
            <div className={s.stats__item}>
              {t('sidebarHabsPublicationsCount')} {habData.postsCount}
            </div>
            <div className={s.stats__item}>
              {t('subscribers')} {habData.subscribersCount}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hab
