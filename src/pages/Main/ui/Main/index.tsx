import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { postCategories, subCategories } from 'shared/global'
import Authors from '../Authors'
import Habs from '../Habs'
import Posts from '../Posts'
import PostsNavigation from '../PostsNavigation'
import Sidebar from '../SideBar/Main'
import 'shared/lib/i18n'
import { useTranslation } from 'react-i18next'

function Main() {
  const { t } = useTranslation()
  const { type, category } = useParams()

  const categoryFind = postCategories.find((el) => el.categoryEng === category)

  const typeFind = subCategories.find((el) => el.subCategoryEng === type)

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {(
            categoryFind
              ? t(`${categoryFind.categoryI18n}`)
              : false && t(`${typeFind?.subCategoryI18n}`)
          )
            ? `${t(`${categoryFind?.categoryI18n}`)} / ${t(`${typeFind?.subCategoryI18n}`)} / ${t('siteTitle')}!`
            : `${t(`${typeFind?.subCategoryI18n}`)} / ${t('siteTitle')}!`}
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
