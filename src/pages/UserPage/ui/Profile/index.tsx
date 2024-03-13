import React from 'react'
import { useParams } from 'react-router-dom'
import { IHab } from 'shared/types/habs'
import axios from '../../../../axios'
import Hab from '../Hab'
import ProfileSkeleton from '../ProfileSkeleton'
import s from './Profile.module.scss'

const Profile: React.FC = () => {
  const {userId} = useParams()
  const [habs, setHabs] = React.useState<IHab[] | []>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/${userId}/subscribers`)
        setHabs(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  }, [userId])

  return (
    <div className={s.wrapper}>
      {
        loading 
        ?
          <ProfileSkeleton />
        :
          habs.length > 0 ?
            <div className={s.item}>
              <h2 className={s.item__title}>Состоит в хабах</h2>
              <div className={s.item__list}>
                {
                  habs.map(el =>
                    <Hab habData={el} />
                  )
                }
              </div>
            </div>
          :
            <div className={s.item}>
              <h2 className={s.item__title}>Пользователь не состоит в хабах</h2>
            </div>
      }
    </div>
  )
}

export default Profile