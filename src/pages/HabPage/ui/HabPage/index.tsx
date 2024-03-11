import React from 'react'
import s from './HabPage.module.scss'
import { IHab } from 'shared/types/habs'
import { useParams } from 'react-router-dom'
import axios from '../../../../axios'
import HabHeader from '../HabHeader'

function HabPage() {
  const {habId, type} = useParams()

  const [loading, setLoading] = React.useState<boolean>(false)
  const [habData, setHabData] = React.useState<IHab | null>(null)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/habs/${habId}`)
        setHabData(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
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