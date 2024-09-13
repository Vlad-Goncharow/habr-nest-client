import React from 'react'
import ContentLoader from 'react-content-loader'
import s from './CommentsSkeleton.module.scss'

function CommentsSkeleton() {
  return (
    <div className={s.wrapper}>
      {Array.from({ length: 3 }, (_, index) => (
        <div className={s.wrapper__item}>
          <ContentLoader
            speed={2}
            width={400}
            height={100}
            viewBox='0 0 400 100'
            backgroundColor='var(--seashell)'
            foregroundColor='var(--romance)'
          >
            <circle cx='12' cy='57' r='12' />
            <rect x='34' y='50' rx='0' ry='0' width='100' height='15' />
            <rect x='0' y='0' rx='0' ry='0' width='400' height='20' />
            <rect x='0' y='30' rx='0' ry='0' width='418' height='2' />
            <rect x='155' y='52' rx='0' ry='0' width='121' height='10' />
            <rect x='0' y='75' rx='0' ry='0' width='90' height='15' />
          </ContentLoader>
        </div>
      ))}
    </div>
  )
}

export default CommentsSkeleton
