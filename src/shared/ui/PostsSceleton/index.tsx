import ContentLoader from 'react-content-loader';
import useElementWidth from 'shared/hooks/UseElementWidth';
import s from './PostsSceleton.module.scss';

function PostsSceleton() {
  const width = useElementWidth(s.item)
  
  return (
    <>
      {
        Array.from({length: 8 }, (_, index) =>
          <div className={s.item}>
            <ContentLoader
              speed={2}
              width={200}
              height={36}
              viewBox="0 0 200 36"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="100" ry="100" width="36" height="36" />
              <rect x="45" y="0" rx="0" ry="0" width="128" height="15" />
              <rect x="45" y="20" rx="0" ry="0" width="76" height="15" />
            </ContentLoader>
            <br />
            <br />
            <ContentLoader
              speed={2}
              width={Number(width)}
              height={250}
              viewBox={`0 0 ${Number(width)} 250`}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="400" height="25" />
              <rect x="0" y="40" rx="3" ry="3" width={Number(width) - 30} height="150" />
              <rect x="0" y="195" rx="3" ry="3" width="600" height="20" />
              <rect x="0" y="225" rx="3" ry="3" width="400" height="20" />
            </ContentLoader>
          </div>
        )
      }
    </>
  )
}

export default PostsSceleton