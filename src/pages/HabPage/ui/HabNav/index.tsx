import classNames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import s from './HabNav.module.scss'
import { useTranslation } from 'react-i18next'

type categoriesType = {
  category: string
}

const categories: categoriesType[] = [
  {
    category: 'articles',
  },
  {
    category: 'posts',
  },
  {
    category: 'news',
  },
  {
    category: 'authors',
  },
]

function HabNav() {
  const { t } = useTranslation()
  const { type, habId } = useParams()

  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        {categories.map((el: categoriesType) => (
          <Link
            key={`${el.category}`}
            to={`/hab/${habId}/${el.category}/1`}
            className={classNames(s.navigation__item, {
              [s.navigation__item_active]: el.category === type,
            })}
          >
            {t(el.category)}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HabNav
