import React from 'react'

interface SidebarWrapperProps {
  children: JSX.Element
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ children }) => {
  return <div className='sidebar'>{children}</div>
}

export default SidebarWrapper
