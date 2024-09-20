import classNames from 'classnames'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import s from './UserNav.module.scss'
import { useTranslation } from 'react-i18next'

type categoriesType = {
  category: string
}

type subCategoriesType = {
  subCategory: string
}

const categories: categoriesType[] = [
  {
    category: 'profile',
  },
  {
    category: 'publications',
  },
  {
    category: 'comments',
  },
  {
    category: 'favorites',
  },
  {
    category: 'subscribers',
  },
  {
    category: 'subscriptions',
  },
]

const subCategoriesPosts: subCategoriesType[] = [
  {
    subCategory: 'articles',
  },
  {
    subCategory: 'posts',
  },
  {
    subCategory: 'news',
  },
]

const subCategoriesFavorites: subCategoriesType[] = [
  ...subCategoriesPosts,
  {
    subCategory: 'comments',
  },
]

const UserNav = () => {
  const { t } = useTranslation()
  const { type, subType, userId } = useParams()

  const [popupIsOpen, setPopupIsOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  const getSubCategories = () => {
    return type === 'publications' ? subCategoriesPosts : subCategoriesFavorites
  }
  const selectedCategory = getSubCategories().find(
    (el) => el.subCategory === subType
  )

  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        {categories.map((el: categoriesType) => (
          <Link
            key={`${el.category}`}
            to={`/user/${userId}/${el.category === 'publications' || el.category === 'favorites' ? `${el.category}/articles` : el.category}/1`}
            className={classNames(s.navigation__item, {
              [s.navigation__item_active]: el.category === type,
            })}
          >
            {t(el.category)}
          </Link>
        ))}
      </div>

      {(type === 'publications' || type === 'favorites') && (
        <div ref={popupRef} className={s.menu}>
          <div
            data-testid={`${type}-click-item`}
            onClick={() => setPopupIsOpen((prev) => !prev)}
            className={s.menu__item}
          >
            {t(`${selectedCategory?.subCategory}`)}
          </div>
          {popupIsOpen && (
            <div className={s.popup}>
              {getSubCategories().map((el: subCategoriesType) => (
                <Link
                  role={`subcategory-${type}`}
                  key={`${el.subCategory}`}
                  to={`/user/${userId}/${type}/${el.subCategory}/1`}
                  onClick={() => setPopupIsOpen(false)}
                  className={classNames(s.popup__item, {
                    [s.popup__item_active]: el.subCategory === subType,
                  })}
                >
                  {t(el.subCategory)}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserNav
