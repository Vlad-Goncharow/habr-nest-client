import classNames from 'classnames'
import Sidebar from 'pages/CreatePost/ui/Sidebar'
import React from 'react'
import { Link, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import s from './SearchPage.module.scss'

const navList = [
  {
    navRu: 'Статьй',
    navEng: 'articles'
  },
  {
    navRu: 'Хабы',
    navEng: 'habs'
  },
  {
    navRu: 'Пользователи',
    navEng: 'authors'
  },
]

function SearchPage() {
  const { type } = useParams()
  const navigate = useNavigate()
  
  const [value, setValue] = React.useState<any>('')

  const [searchParams] = useSearchParams()
  const q = searchParams.get('q');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    localStorage.setItem('search-query', value)
    navigate(`/search/${type ? type : 'articles'}/1?q=${value}`)
  }
  
  const searchQuery = localStorage.getItem('search-query')
  React.useEffect(() => {
    setValue(searchQuery)
  },[searchQuery])

  React.useEffect(() => {
    return () => {
      localStorage.removeItem('search-query')
    }
  },[])
  
  return (
    <div className={'wrapper'}>
      <div className={'wrapper__left'}>
        <div className={s.top}>
            <form onSubmit={handleSubmit} action="" className={s.form}>
              <input onChange={(e) => setValue(e.target.value)} value={value} type="text" />
              <button type='submit' className={s.form__search}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                  <title>search</title>
                  <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </button>
            </form>
          {
            type &&
            <nav className={s.nav}>
              {
                navList.map(el =>
                  <Link key={el.navEng} to={`/search/${el.navEng}/1?q=${q}`} className={classNames(s.nav__item, {
                    [s.nav__item_active]: type === el.navEng
                  })}>{el.navRu}</Link>
                )
              }
            </nav>
          }
        </div>
        
        <Outlet />
      </div>
      <Sidebar />
    </div>
  )
}

export default SearchPage

