import ContentLoader from 'react-content-loader'
import s from './CommentsSkeleton.module.scss'

function CommentsSkeleton() {
  return (
    <div className={s.wrapper}>
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className={s.item}>
          <ContentLoader
            speed={2}
            width={600}
            height={38}
            viewBox='0 0 600 38'
            backgroundColor='var(--seashell)'
            foregroundColor='var(--romance)'
          >
            <rect x='0' y='0' rx='0' ry='0' width='38' height='38' />
            <rect x='55' y='0' rx='0' ry='0' width='170' height='20' />
          </ContentLoader>
        </div>
      ))}
    </div>
  )
}

export default CommentsSkeleton
