import { fetchModalActions } from 'entities/FetchModal'
import { IUser } from 'entities/User'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import axios from '../../../../axios'
import PageSkeleton from '../PageSkeleton'
import SideBar from '../SideBar'
import { UserHeader } from '../UserHeader'
import { Helmet } from 'react-helmet'

function UserPage() {
  const dispatch = useAppDispatch()

  const { userId } = useParams()

  const [userData, setUserData] = React.useState<IUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/users/${userId}`)
        setUserData(data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: 'Ошибка, попробуйте еще раз!',
          })
        )
      }
    })()
  }, [userId])

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {userData ? userData?.nickname : 'Страница пользователя'} — Не Хабр
        </title>
        <meta
          name='description'
          content={`Страница пользователя - ${userData?.nickname} Не Хабре`}
        ></meta>
      </Helmet>
      <div className={'wrapper'}>
        {loading ? (
          <PageSkeleton />
        ) : (
          userData !== null && (
            <>
              <div className={'wrapper__left'}>
                <UserHeader userData={userData} />
                <Outlet context={userData} />
              </div>
              <SideBar userData={userData} />
            </>
          )
        )}
      </div>
    </>
  )
}

export default UserPage
