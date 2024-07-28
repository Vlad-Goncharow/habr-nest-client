import React from 'react'
import Habs from '../Habs'
import s from './Profile.module.scss'
import { IUser } from 'entities/User'
import ProfileInfo from '../ProfileInfo'

interface ProfileProps {
  userData: IUser
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <div className={s.wrapper}>
      <ProfileInfo userData={userData} />
      <Habs />
    </div>
  )
}

export default Profile
