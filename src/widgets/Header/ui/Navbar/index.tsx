import React from 'react'
import s from './Navbar.module.scss'
import { Link, useParams } from 'react-router-dom'
import { postCategories } from 'shared/global'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { category } = useParams()

  const {t} = useTranslation()
  return (
    <nav className={s.nav}>
      <Link
        className={classNames(s.nav__link, {
          [s.nav__link_active]: !postCategories.some(
            (el) => el.categoryEng === category
          ),
        })}
        to='/flows/all/articles/1'
      >
        {t('categoryAll')}
      </Link>
      {postCategories.map((el) => (
        <Link
          key={el.categoryEng}
          className={classNames(s.nav__link, {
            [s.nav__link_active]: category === el.categoryEng,
          })}
          to={`/flows/${el.categoryEng}/articles/1`}
        >
          {t(el.categoryI18n)}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
