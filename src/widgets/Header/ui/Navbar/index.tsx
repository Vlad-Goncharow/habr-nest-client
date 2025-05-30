import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { postCategories } from 'shared/global'
import s from './Navbar.module.scss'

interface NavbarProps {
  setIsClose?: (bool: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({ setIsClose }) => {
  const { category } = useParams()
  const { t } = useTranslation()

  const handleNavClick = () => {
    if (setIsClose) {
      setIsClose(true)
    }
  }

  return (
    <nav className={s.nav} onClick={handleNavClick}>
      <Link
        className={classNames(s.nav__link, {
          [s.nav__link_active]: !postCategories.some(
            (el) => el.category === category
          ),
        })}
        to='/flows/all/articles/1'
      >
        {t('AllStreams')}
      </Link>
      {postCategories.map((el) => (
        <Link
          key={el.category}
          className={classNames(s.nav__link, {
            [s.nav__link_active]: category === el.category,
          })}
          to={`/flows/${el.category}/articles/1`}
        >
          {t(el.category)}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
