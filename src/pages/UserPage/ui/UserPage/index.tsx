import { IUser } from 'entities/User'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import UseWindowWidth from 'shared/hooks/UseWindowWidth'
import axios from '../../../../axios'
import PageSkeleton from '../PageSkeleton'
import SideBar from '../SideBar'
import UserHeader from '../UserHeader'
import s from './UserPage.module.scss'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'

function UserPage() {
  //dispatch
  const dispatch = useAppDispatch()

  //params
  const { userId, type } = useParams()
  
  //user data | loading
  const [userData, setUserData] = React.useState<IUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/users/${userId}`)
        setUserData(data)
        setLoading(false)
      } catch(e){
        setLoading(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  },[userId])

  const isMobile = UseWindowWidth(1024)
  
  return (
    <div className={'wrapper'}>
      {
        loading 
        ?
          <PageSkeleton />
        : 
          userData !== null &&
          <>
            <div className={'wrapper__left'}>
              <UserHeader userData={userData} />
              {/* if opened user profile and window < 1024 */}
              {isMobile && type === 'profile' && <SideBar userData={userData} />}

              <Outlet />
            </div>
            {!isMobile && <SideBar userData={userData} />}
          </>
      }
    </div>
  )
}

export default UserPage