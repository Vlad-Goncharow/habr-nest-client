import ContentLoader from 'react-content-loader'
import useElementWidth from 'shared/hooks/UseElementWidth'
import ProfileSkeleton from '../Profile/ui/ProfileSkeleton'
import s from './PageSkeleton.module.scss'

function PageSkeleton() {
  const width = useElementWidth(s.user)

  return (
    <div className={s.wrapper}>
      <div className={s.user}>
        <ContentLoader
          speed={2}
          width={Number(width) - 30}
          height={180}
          viewBox={`0 0 ${Number(width) - 30} 180`}
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
          style={{ marginBottom: 15 }}
        >
          <rect x='0' y='0' rx='7' ry='7' width='48' height='48' />
          <rect x='0' y='60' rx='0' ry='0' width='153' height='20' />
          <rect x='0' y='85' rx='0' ry='0' width='153' height='15' />
          <rect x='0' y='160' rx='0' ry='0' width='100' height='15' />
          <rect x='115' y='160' rx='0' ry='0' width='100' height='15' />
          <rect x='225' y='160' rx='0' ry='0' width='100' height='15' />
          <rect x='345' y='160' rx='0' ry='0' width='100' height='15' />
        </ContentLoader>
      </div>
      <div className={s.profile}>
        <ProfileSkeleton />
      </div>
    </div>
  )
}

export default PageSkeleton
