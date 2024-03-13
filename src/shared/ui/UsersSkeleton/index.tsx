import React from 'react'
import ContentLoader from 'react-content-loader'
import s from './UsersSkeleton.module.scss'
import useElementWidth from 'shared/hooks/UseElementWidth'

function UsersSkeleton() {
  const width = useElementWidth(s.item)

  return (
    <div className={s.skeleton}>
      {
        Array.from({length:8}, (_, index) => 
          <div className={s.item}>
            <ContentLoader
              speed={2}
              width={Number(width)}
              height={40}
              viewBox={`0 0 ${width} 40`}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="100" ry="100" width="40" height="40" />
              <rect x="45" y="0" rx="0" ry="0" width="90" height="15" />
              <rect x="45" y="30" rx="0" ry="0" width="90" height="10" />
            </ContentLoader>
          </div>
        )
      }
    </div>
  )
}

export default UsersSkeleton