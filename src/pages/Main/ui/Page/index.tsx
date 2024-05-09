import { PostsNavigation } from 'widgets/PostsNavigation'
import s from './Page.module.scss'
import { useParams } from 'react-router-dom'
import { postTypeOne } from 'shared/global'
import Posts from '../Posts'
import Habs from '../Habs'
import Authors from '../Authors'
import { IHab } from 'shared/types/habs'
import React from 'react'
import { IUser } from 'entities/User'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import axios from '../../../../axios'
import { fetchModalActions } from 'entities/FetchModal'

function Page() {
  const dispatch = useAppDispatch()
  const { category, type, page } = useParams()

  const [pageSize, setPageSize] = React.useState<number>(10)

  const [habs, setHabs] = React.useState<IHab[] | []>([])
  const [habsLoading, setHabsLoading] = React.useState<boolean>(true)
  const [habsTotalCount, setHabsTotalCount] = React.useState<number>(0)

  const [authors, setAuthors] = React.useState<IUser[] | []>([])
  const [authorsLoading, setAuthorsLoading] = React.useState<boolean>(true)
  const [authorsTotalCount, setAuthorsTotalCount] = React.useState<number>(0)

  const loadHabs = async (title:string) => {
    try {
      setHabsLoading(true)
      const { data } = await axios.get(`/habs/search/category/${category}/${title}/?page=${page}&pageSize=${pageSize}`)
      setHabs(data.habs);
      setHabsTotalCount(data.length)
      setHabsLoading(false)
    } catch (e) {
      setHabsLoading(false)
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
            />
          }
          {
            type === 'authors' &&
            <Authors />
          }
        </div>
      </div>
    </div>
  )
}


export default Page