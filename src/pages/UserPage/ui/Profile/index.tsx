import { IUser } from 'entities/User'
import React from 'react'
import { IHab } from 'shared/types/habs'
import axios from '../../../../axios'
import Hab from '../Hab'
import s from './Profile.module.scss'

interface ProfileProps{
  userData: IUser
}

const Profile: React.FC<ProfileProps> = ({userData}) => {
  const [habs, setHabs] = React.useState<IHab[] | []>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/habs/${userData.id}/subscribers`)
        setHabs(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[userData.id])

  return (
    <div className={s.wrapper}>
      {
        !loading &&
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