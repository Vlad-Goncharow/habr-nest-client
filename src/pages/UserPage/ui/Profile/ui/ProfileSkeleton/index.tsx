import ContentLoader from 'react-content-loader'
import useElementWidth from 'shared/hooks/UseElementWidth'
import s from './ProfileSkeleton.module.scss'

function ProfileSkeleton() {
  const width = useElementWidth(s.wrapper)

  return (
    <div className={s.wrapper}>
      <ContentLoader
        speed={2}
        width={Number(width)}
        height={210}
        viewBox={`0 0 ${width} 210`}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='0' rx='7' ry='7' width={Number(width) / 2} height='20' />
        <rect x='0' y='30' rx='0' ry='0' width={Number(width)} height='20' />
        <rect
          x='0'
          y='60'
          rx='0'
          ry='0'
          width={Number(width) / 2}
          height='20'
        />
        <rect x='0' y='90' rx='0' ry='0' width={Number(width)} height='20' />
        <rect
          x='0'
          y='120'
          rx='0'
          ry='0'
          width={Number(width) / 2}
          height='20'
        />
        <rect x='0' y='150' rx='0' ry='0' width={Number(width)} height='20' />
        <rect
          x='0'
          y='180'
          rx='0'
          ry='0'
          width={Number(width) / 2}
          height='20'
        />
      </ContentLoader>
    </div>
  )
}

export default ProfileSkeleton
