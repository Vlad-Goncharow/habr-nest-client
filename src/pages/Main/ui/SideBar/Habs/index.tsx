import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsType } from 'shared/types/habs'
import axios from '../../../../../axios'
import s from './Habs.module.scss'

function Habs() {
  const { category } = useParams()

  const dispatch = useAppDispatch()
  
  const [loading, setLoading] = React.useState(true)
  const [habs, setHabs] = React.useState<HabsType[]>([])
  
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/category/${category}`)
        setHabs(data)
        setLoading(false)
      } catch (e) {
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
        setLoading(false)
      }
    })()
  }, [category])

  if(loading) {
    return (null)
  }

  return (
    <section className={s.habs}>
      <header className="sidebar__header">
        <h2 className="sidebar__title">
          Хабы
        </h2>
      </header>

      <ul className={s.habs__list}>
        {
          habs.map((hab: HabsType) => (
            <li className={s.hab}>
              <div className={s.hab__row}>
                <div className={s.hab__image}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}/${hab.image}`} alt={`Картинка хаба ${hab.title}`} />
                </div>
                <div className={s.hab__info}>
                  <Link to={`/hab/${hab.id}/articles/1`} className={s.hab__title}>{hab.title}</Link>
                  <div className={s.hab__row}>
                    <Link
                      className={s.hab__stats}
                      to={`/hab/${hab.id}/authors/1`}
                    >
                      Авторы {hab.authorsCount}
                    </Link>
                    <Link
                      className={s.hab__stats}
                      to={`/hab/${hab.id}/articles/1`}
                    >
                      Публицкаий {hab.postsCount}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default Habs