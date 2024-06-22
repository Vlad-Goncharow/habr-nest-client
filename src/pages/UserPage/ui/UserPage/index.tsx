import { fetchModalActions } from 'entities/FetchModal'
import { IUser } from 'entities/User'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import axios from '../../../../axios'
import PageSkeleton from '../PageSkeleton'
import ProfileInfo from '../ProfileInfo'
import SideBar from '../SideBar'
import UserHeader from '../UserHeader'

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
              {type === 'profile' && <ProfileInfo userData={userData} />}
              
              <Outlet />
            </div>
            <SidebarWrapper><SideBar userData={userData} /></SidebarWrapper>
          </>
      }
    </div>
  )
}

export default UserPage