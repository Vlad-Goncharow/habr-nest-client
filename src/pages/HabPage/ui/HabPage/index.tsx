import React from 'react'
import { useParams } from 'react-router-dom'
import { IHab } from 'shared/types/habs'
import axios from '../../../../axios'
import Authors from '../Authors'
import HabHeader from '../HabHeader'
import HabPosts from '../HabPosts'
import s from './HabPage.module.scss'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'

function HabPage() {
  //dispatch
  const dispatch = useAppDispatch()
  
  //params
  const { habId, type } = useParams()

  //loading | hab data
  const [loading, setLoading] = React.useState<boolean>(false)
  const [habData, setHabData] = React.useState<IHab | null>(null)

  //load hab data
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/habs/${habId}`)
        setHabData(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  },[habId])
  
  return (
    <div>
      {
        loading ?
          <div>loading</div>
          :
          habData !== null &&
          <div className="page">
            <div className="container">
              <div className={s.wrapper}>
                <div className={s.wrapper__left}>
                  <HabHeader habData={habData} />
                  {
                    (type === 'articles' || type === 'posts' || type === 'news') &&
                    <HabPosts />
                  }
                  {
                    type === 'authors' &&
                    <Authors />
                  }
                </div>
                <div className="sidebar"></div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default HabPage