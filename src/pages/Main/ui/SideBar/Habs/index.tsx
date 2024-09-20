import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsType } from 'shared/types/habs'
import axios from '../../../../../axios'
import s from './Habs.module.scss'
import { useTranslation } from 'react-i18next'

function Habs() {
  const { t } = useTranslation()
  const { category } = useParams()

  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState(true)
  const [habs, setHabs] = React.useState<HabsType[]>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/category/${category}`)
        setHabs(data)
        setLoading(false)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('mainLoadHabsError'),
          })
        )
        setLoading(false)
      }
    })()
  }, [category])

  return (
    <>
      {!loading && (
        <section className={s.habs}>
          <header className='sidebar__header'>
            <h2 className='sidebar__title'>{t('sidebarHabsTitle')}</h2>
          </header>

          <ul className={s.habs__list}>
            {habs.map((hab: HabsType) => (
              <li key={hab.id} className={s.hab}>
                <div className={s.hab__row}>
                  <div className={s.hab__image}>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/uploads/habs/${hab.image}`}
                      alt={`${t('habImageAltText')} ${hab.title}`}
                    />
                  </div>
                  <div className={s.hab__info}>
                    <Link
                      to={`/hab/${hab.id}/articles/1`}
                      className={s.hab__title}
                    >
                      {hab.title}
                    </Link>
                    <div className={s.hab__row}>
                      <Link
                        className={s.hab__stats}
                        to={`/hab/${hab.id}/authors/1`}
                      >
                        {t('sidebarHabsAuthorsCount')} {hab.authorsCount}
                      </Link>
                      <Link
                        className={s.hab__stats}
                        to={`/hab/${hab.id}/articles/1`}
                      >
                        {t('sidebarHabsPublicationsCount')} {hab.postsCount}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default Habs
