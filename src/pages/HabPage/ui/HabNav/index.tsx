import classNames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import s from './HabNav.module.scss'

type categoriesType = {
  categoryRu: String,
  categoryEng: String
}

const categories: categoriesType[] = [
  {
    categoryRu: 'Статьи',
    categoryEng: 'articles'
  }, {
    categoryRu: 'Посты',
    categoryEng: 'posts'
  }, {
    categoryRu: 'Новости',
    categoryEng: 'news'
  }, {
    categoryRu: 'Авторы',
    categoryEng: 'authors'
  }
]

function HabNav() {
  const { type, habId } = useParams()

  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        {
          categories.map((el: categoriesType) =>
            <Link
              key={`${el.categoryEng}`}
              to={`/hab/${habId}/${el.categoryEng}/1}`}
              className={classNames(s.navigation__item, {
                [s.navigation__item_active]: el.categoryEng === type
              })}
            >
              {el.categoryRu}
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default HabNav