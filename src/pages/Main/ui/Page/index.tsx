import { fetchModalActions } from 'entities/FetchModal'
import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import { postTypeOne } from 'shared/global'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import { PostsNavigation } from 'widgets/PostsNavigation'
import axios from '../../../../axios'
import Authors from '../Authors'
import Habs from '../Habs'
import Posts from '../Posts'
import s from './Page.module.scss'

function Page() {
  const dispatch = useAppDispatch()
  const { category, type, page } = useParams()

  const [pageSize, setPageSize] = React.useState<number>(10)

  const [habs, setHabs] = React.useState<IHab[] | []>([])
  const [habsLoading, setHabsLoading] = React.useState<boolean>(true)
  const [habsTotalCount, setHabsTotalCount] = React.useState<number>(0)

  //sort options
  const [sortOptions, setSortOptions] = React.useState({
    sort:'',
    order:'',
  })
  
  const [authors, setAuthors] = React.useState<IUser[] | []>([])
  const [authorsLoading, setAuthorsLoading] = React.useState<boolean>(true)
  const [authorsTotalCount, setAuthorsTotalCount] = React.useState<number>(0)

  const loadHabs = async (title:string) => {
    try {
      setHabsLoading(true)
      const { data } = await axios.get(`/habs/search/${category}/${title}?sort=${sortOptions.sort}&order=${sortOptions.order}&page=${page}&pageSize=${pageSize}`)
      setHabs(data.habs);
      setHabsTotalCount(data.length)
      setHabsLoading(false)
    } catch (e) {
      setHabsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }

  const loadAuthors = async () => {
    try {
      setAuthorsLoading(true)
      const { data } = await axios.get(`/users/authors/${category}/?page=${page}&pageSize=${pageSize}`)
      setAuthors(data.authors);
      setAuthorsTotalCount(data.length)
      setAuthorsLoading(false)
    } catch (e) {
      setAuthorsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }
  
  return (
    <div className={'page'}>
      <div className="container">
        <div className="row">
          <PostsNavigation 
            page={Number(page)}
            loadHabs={loadHabs}
            loadAuthors={loadAuthors}
            sortOptions={sortOptions}
          />
          <div className="right"></div>
        </div>
        <div className={s.wrapper}>
          {
            postTypeOne.find((el) => el.typeEng === type) &&
            <Posts />
          }
          {
            type === 'habs' &&
            <Habs 
              habs={habs} 
              habsLoading={habsLoading} 
              habsTotalCount={habsTotalCount} 
              pageSize={pageSize}
              setSortOptions={setSortOptions}
            />
          }
          {
            type === 'authors' &&
            <Authors 
              authors={authors}
              authorsLoading={authorsLoading}
              authorsTotalCount={authorsTotalCount}
              pageSize={pageSize}
            />
          }
        </div>
      </div>
    </div>
  )
}


export default Page