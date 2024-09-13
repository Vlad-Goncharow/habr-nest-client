import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import { SidebarReadWeekly } from 'widgets/SidebarReadWeekly'
import axios from '../../../../axios'
import Authors from '../Authors'
import HabHeader from '../HabHeader'
import HabPosts from '../HabPosts'
import { useTranslation } from 'react-i18next'

function HabPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { habId, type } = useParams()

  const [habData, setHabData] = React.useState<IHab | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/habs/${habId}`)
        setHabData(data)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('habPageLoadError'),
          })
        )
      }
    })()
  }, [habId])

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {habData ? habData?.title : t('habPage')} / {t('siteTitle')}
        </title>
        <meta
          name='description'
          content={`Страница хаба - ${habData?.title}`}
        ></meta>
      </Helmet>
      {habData !== null && (
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            <HabHeader habData={habData} />
            {(type === 'articles' || type === 'posts' || type === 'news') && (
              <HabPosts />
            )}
            {type === 'authors' && <Authors />}
          </div>
          <SidebarWrapper>
            <SidebarReadWeekly category={habData.category} />
          </SidebarWrapper>
        </div>
      )}
    </div>
  )
}

export default HabPage
