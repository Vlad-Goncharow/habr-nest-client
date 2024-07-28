import React from 'react'

interface PageWrapperProps {
  children: JSX.Element
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className='page'>
      <div className='container'>{children}</div>
    </div>
  )
}

export default PageWrapper
