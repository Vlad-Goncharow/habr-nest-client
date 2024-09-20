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

  const categoryFind = postCategories.find((el) => el.category === category)
  const typeFind = subCategories.find((el) => el.subCategory === type)

  const myMeth = () =>{
    if(categoryFind){
      return `${t(categoryFind.category)} / ${t(`${typeFind?.subCategory}`)} / ${t('siteTitle')}`
    } else {
      return `${t('AllStreams')} / ${t(`${typeFind?.subCategory}`)} / ${t('siteTitle')}`
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{myMeth()}</title>
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
