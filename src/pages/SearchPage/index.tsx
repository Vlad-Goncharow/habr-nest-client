import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import Sidebar from 'pages/CreatePost/ui/Sidebar'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IPost } from 'shared/types/posts'
import Habs from 'shared/ui/Habs/ui/Habs'
import { UsersList } from 'shared/ui/UsersList'
import axios from '../../axios'
import s from './SearchPage.module.scss'
import { PostsList } from 'shared/ui/PostsList'

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

  // ======== input ref
  const inputRef = React.useRef<HTMLInputElement>(null)
  // ======== input ref

  // ======== page 
  const { page, type } = useParams()
  // ======== page 

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  const [articlesLength, setArticlesLength] = React.useState(0)
  const [articlesLoading, setArticlesLoading] = React.useState(false)
  const [articles, setArticles] = React.useState<IPost[] | []>([])
  // ======== search



  const [habsLoading, setHabsLoading] = React.useState(false)
  const [habsTotalCount, setHabsTotalCount] = React.useState<number>(0)
  const [habs, setHabs] = React.useState([])
  const [sortOptions, setSortOptions] = React.useState({
    sort: '',
    order: '',
  })

  const [users, setUsers] = React.useState([])
  const [loadingUsers, setLoadingUsers] = React.useState(false)
  const [userLength, setUsersLength] = React.useState(0)

  const loadHabs = async () => {
    try {
      if (value.length > 1 && type === 'habs') {
        setHabsLoading(true)
        const { data } = await axios.get(`/habs/search/${value}?page=${page}&pageSize=20&sort=${sortOptions.sort}&order=${sortOptions.order}`)
        setHabsLoading(false)
        setHabs(data.habs)
        setHabsTotalCount(data.length)
      }
    } catch (e) {
      setHabsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }

  const [value, setValue] = React.useState('')
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (value.length > 1 && type === 'articles') {
        setArticlesLoading(true)
        const { data } = await axios.get(`/posts/search/${value}?page=${page}&pageSize=20`)
        setArticlesLoading(false)
        setArticles(data.posts)
        setArticlesLength(data.length)
      }

      if (value.length > 1 && type === 'habs') {
        loadHabs()
      }

      if (value.length > 1 && type === 'authors') {
        setLoadingUsers(true)
        const { data } = await axios.get(`/users/authors/all/${value}?page=${page}&pageSize=20`)
        setLoadingUsers(false)
        setUsers(data.authors)
        setUsersLength(data.length)
      }
    } catch (e) {
      setLoadingUsers(false)
      setArticlesLoading(false)
      setHabsLoading(false)
    }
  }
  // ======== search

  React.useEffect(() => {
    loadHabs()
  }, [page, sortOptions])

  return (
    <div className={'page'}>
      <div className='container'>
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            <div className={s.top}>
              <form onSubmit={formSubmit} action="" className={s.form}>
                <input ref={inputRef} onChange={(e) => setValue(e.target.value)} type="text" />
                <button type='submit' className={s.form__search}>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                    <title>search</title>
                    <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                </button>
              </form>
              <nav className={s.nav}>
                {
                  navList.map(el =>
                    <Link to={`/search/${el.navEng}/1`} className={classNames(s.nav__item, {
                      [s.nav__item_active]: type === el.navEng
                    })}>{el.navRu}</Link>
                  )
                }
              </nav>
            </div>
            {
              type === 'articles' &&
                <PostsList 
                  loading={articlesLoading} 
                  length={articlesLength} 
                  posts={articles} 
                  navigatePath={`/search/articles/1`} 
                />
            }

            {
              type === 'habs' &&
              <Habs
                habs={habs}
                habsLoading={habsLoading}
                habsTotalCount={habsTotalCount}
                setSortOptions={setSortOptions}
                navigatePath={`/search/habs/1`}
              />
            }
            {
              type === 'authors' &&
              <UsersList
                usersTotalCount={userLength}
                usersLoading={loadingUsers}
                users={users}
                navigatePath={`/search/authors/1`}
              />
            }
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default SearchPage

