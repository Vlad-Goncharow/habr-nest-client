import React from 'react'
import s from './Controls.module.scss'
import { Link } from 'react-router-dom'
import { IUser } from 'entities/User'
import AuthoraizedHeader from '../AuthoraizedHeader'
import { ReactComponent as SearchSvg } from 'shared/images/svg/search.svg'
import UnauthorizedHeader from '../UnauthorizedHeader'

interface ControlsProps {
  user: IUser | null
}

const Controls: React.FC<ControlsProps> = ({ user }) => {
  return (
    <div className={s.right}>
      <Link to='/search' className={s.right__search}>
        <SearchSvg />
      </Link>
      {user !== null ? (
        <AuthoraizedHeader user={user} />
      ) : (
        <UnauthorizedHeader />
      )}
    </div>
  )
}

export default Controls
