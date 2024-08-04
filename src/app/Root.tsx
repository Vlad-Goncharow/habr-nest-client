import { fetchAuth } from 'entities/User'
import React from 'react'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import useLoadLocalTheme from 'shared/hooks/useLoadLocalTheme'
import useSaveUrl from 'shared/hooks/useSaveUrl'
import useScrollPosition from 'shared/hooks/useScrollPosition'
import PageWrapper from 'shared/ui/PageWrapper'
import FetchModal from 'widgets/FetchModal'
import Header from 'widgets/Header/ui/Header/Header'

function Root() {
  useSaveUrl()
  useScrollPosition()
  useLoadLocalTheme()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const auth = async () => {
    const data = await dispatch(fetchAuth())

    if (data.payload !== undefined && 'accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken)
    }
  }

  React.useEffect(() => {
    auth()

    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl')
    if (lastVisitedUrl && lastVisitedUrl !== '/') {
      navigate(lastVisitedUrl, { replace: true })
    } else {
      navigate('/flows/all/articles/1', { replace: true })
    }
  }, [navigate])

  //i dont know how to do it if user have low internet connection
  const appRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    let timer: any
    let scrollData: string | null = localStorage.getItem('scrollPosition')

    if (scrollData && appRef.current) {
      timer = setTimeout(() => {
        if (appRef.current && window) {
          window.scrollTo(0, Number(scrollData))
        }
      }, 100)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={appRef} className='App'>
      <Header />
      <FetchModal />

      <PageWrapper>
        <Outlet />
      </PageWrapper>

      <ScrollRestoration />
    </div>
  )
}

export default Root
