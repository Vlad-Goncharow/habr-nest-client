import React from 'react'
import s from './Navbar.module.scss'
import { Link, useParams } from 'react-router-dom'
import { postCategories } from 'shared/global'
import classNames from 'classnames'

const Navbar = () => {
  const { category } = useParams()

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
        Все потоки
      </Link>
      {postCategories.map((el) => (
        <Link
          key={el.categoryEng}
          className={classNames(s.nav__link, {
            [s.nav__link_active]: category === el.categoryEng,
          })}
          to={`/flows/${el.categoryEng}/articles/1`}
        >
          {el.categoryRu}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
