import { IUser, checkRolesAdminModerator } from 'entities/User'
import React from 'react'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import RolesInfo from '../RolesInfo'
import UserInfo from '../UserInfo'

interface SideBarProps{
  userData:IUser
}

const SideBar: React.FC<SideBarProps> = ({userData}) => {
  const isUserAdminOrModerator = useAppSelector(checkRolesAdminModerator)
  
  return (
    <SidebarWrapper>
      <>
        {
          isUserAdminOrModerator &&
          <RolesInfo userData={userData} />
        }
        <UserInfo userData={userData} />
      </>
    </SidebarWrapper>
  )
}

export default SideBar