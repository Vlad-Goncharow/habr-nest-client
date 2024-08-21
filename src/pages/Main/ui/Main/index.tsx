import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { postCategories, subCategories } from 'shared/global'
import Authors from '../Authors'
import Habs from '../Habs'
import Posts from '../Posts'
import PostsNavigation from '../PostsNavigation'
import Sidebar from '../SideBar/Main'

function Main() {
  const { type, category } = useParams()

  const categoryRu = postCategories.find(
    (el) => el.categoryEng === category
  )?.categoryRu
  const typeRu = subCategories.find(
    (el) => el.subCategoryEng === type
  )?.subCategoryRu
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {categoryRu && typeRu
            ? `${categoryRu} / ${typeRu} / Не Хабр!`
            : `${typeRu} / Не Хабр!`}
        </title>
        <meta
          name='description'
          content='Лучшие статьи за последние 24 часа на Не Хабре'
        ></meta>
      </Helmet>
      <div className={'wrapper'}>
        <div className='wrapper__left'>
          <PostsNavigation />

          {(type === 'articles' || type === 'posts' || type === 'news') && (
            <Posts />
          )}
          {type === 'habs' && <Habs />}
          {type === 'authors' && <Authors />}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Main
