import React from 'react'
import s from './SidebarNavbar.module.scss'
import Navbar from '../Navbar'

interface SidebarNavbarProps {
  setSideNav: (bool: boolean) => void
}

const SidebarNavbar: React.FC<SidebarNavbarProps> = ({ setSideNav }) => {
  const [show, setShow] = React.useState(true)
  const [isClose, setIsClose] = React.useState(false)

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let timer: any
    if (show) {
      timer = setTimeout(() => {
        document.body.style.overflow = 'hidden'

        wrapperRef.current?.classList.remove(s.sidebar_close)
        wrapperRef.current?.classList.add(s.sidebar_open)
      }, 200)
    }

    if (isClose) {
      document.body.style.overflow = ''

      wrapperRef.current?.classList.remove(s.sidebar_open)
      wrapperRef.current?.classList.add(s.sidebar_close)

      timer = setTimeout(() => {
        setShow(false)
        setSideNav(false)
      }, 200)
    }

    return () => {
      document.body.style.overflow = ''
      clearTimeout(timer)
    }
  }, [isClose, show])

  return (
    <div className={s.wrapper}>
      <div
        onClick={() => setIsClose(true)}
        className={s.wrapper__overlay}
      ></div>
      <div ref={wrapperRef} className={s.sidebar}>
        <Navbar setIsClose={setIsClose} />
      </div>
    </div>
  )
}

export default SidebarNavbar
