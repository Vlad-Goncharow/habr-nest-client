import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../../axios'
import Profile from '../Profile'
import UserHeader from '../UserHeader'
import UserPosts from '../UserPosts'
import s from './UserPage.module.scss'

function UserPage() {
  const { userId, type } = useParams()
  const [pageSize, setPageSize] = React.useState<number>(10)
  
  const [userData, setUserData] = React.useState<IUser | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/users/${userId}`)
        setUserData(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
      }
    })()
  },[userId])

  return (
    <div>
      {
        loading
        ?
          <div>loading</div>
        :
          userData !== null &&
          <div className="page">
            <div className="container">
              <div className={s.wrapper}>
                <div className={s.wrapper__left}>
                  <UserHeader userData={userData} />
                  {
                    type === 'profile' && <Profile userData={userData} />
                  }{
                    type === 'publications' && <UserPosts pageSize={pageSize} />
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

export default UserPage