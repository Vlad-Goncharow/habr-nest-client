import classNames from 'classnames'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import s from './UserNav.module.scss'

type categoriesType = {
  categoryRu: String,
  categoryEng: String
}

type subCategoriesType = {
  subCategoryRu: String,
  subCategoryEng: String
}

const categories: categoriesType[] = [
  {
    categoryRu: 'Профиль',
    categoryEng: 'profile'
  }, {
    categoryRu: 'Публикации',
    categoryEng: 'publications'
  }, {
    categoryRu: 'Коментарии',
    categoryEng: 'comments'
  }, {
    categoryRu: 'Закладки',
    categoryEng: 'favorites'
  }, {
    categoryRu: 'Подписчики',
    categoryEng: 'subscribers'
  }, {
    categoryRu: 'Подписки',
    categoryEng: 'subscriptions'
  },
]

const subCategories: subCategoriesType[] = [
  {
    subCategoryRu: 'Статьи',
    subCategoryEng: 'articles'
  }, {
    subCategoryRu: 'Посты',
    subCategoryEng: 'posts'
  }, {
    subCategoryRu: 'Новости',
    subCategoryEng: 'news'
  }
]

const UserNav = () => {
  //params
  const { type, subType, userId } = useParams()


  //popup
  const [popupIsOpen, setPopupIsOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))
  
  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        {
          categories.map((el: categoriesType) =>
            <Link
              key={`${el.categoryEng}`}
              to={`/user/${userId}/${el.categoryEng === 'publications' ? `${el.categoryEng}/articles` : el.categoryEng}/${el.categoryEng !== 'profile' ? 1 : ''}`}
              className={classNames(s.navigation__item, {
                [s.navigation__item_active]: el.categoryEng === type
              })}
            >
              {el.categoryRu}
            </Link>
          )
        }
      </div>
      {
        type === 'publications' &&
        <div ref={popupRef} className={s.menu}>
          <div onClick={() => setPopupIsOpen(prev => !prev)} className={s.menu__item}>
            {subCategories.find((el) => el.subCategoryEng === subType)?.subCategoryRu}
          </div>
          {
            popupIsOpen &&
              <div className={s.popup}>
              {
                subCategories.map((el:subCategoriesType) => 
                  <Link 
                    to={`/user/${userId}/${type}/${el.subCategoryEng}/1`}
                    onClick={() => setPopupIsOpen(false)}
                    className={s.popup__item}
                  >
                    {el.subCategoryRu}
                  </Link>
                )
              }
            </div>
          }
        </div>
      }
    </div>
  )
}

export default UserNav