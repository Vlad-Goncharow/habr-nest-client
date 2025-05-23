import classNames from 'classnames'
import Draft, { Editor, EditorState, convertFromRaw } from 'draft-js'
import { fetchModalActions } from 'entities/FetchModal'
import moment from 'moment'
import { blockRenderMap, styleMap } from 'pages/CreatePost/ui/FirstStep'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ReactComponent as Views } from 'shared/images/svg/postViews.svg'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import { SidebarReadWeekly } from 'widgets/SidebarReadWeekly'
import axios from '../../../../axios'
import PostAuthor from '../PostAuthor'
import s from './PostPage.module.scss'
import { useTranslation } from 'react-i18next'
import { Comments } from '../Comments'

function PostPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { postId, type } = useParams()

  const [postData, setPostData] = React.useState<IPost | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/posts/${postId}`)
        setPostData(data)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('loadPostError'),
          })
        )
      }
    })()
  }, [postId, type])

  let contentStateFromJSON
  let restoredEditorState
  let extendedBlockRenderMap
  if (postData !== null) {
    contentStateFromJSON = convertFromRaw(JSON.parse(postData.content))
    restoredEditorState = EditorState.createWithContent(contentStateFromJSON)
    extendedBlockRenderMap =
      Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {postData ? postData?.title : 'Страница публикации'} / Не Хабр
        </title>
        <meta name='description' content={`Страница профилья`}></meta>
      </Helmet>
      {postData !== null && (
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            <div className={s.post}>
              <div className={s.author}>
                <div className={s.author__img}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/uploads/avatars/${postData.author.avatar}`}
                    alt=''
                  />
                </div>
                <Link
                  to={`/user/${postData.author.id}/profile/1`}
                  className={s.author__name}
                >
                  {postData.author.nickname}
                </Link>
                <div className={s.post__date}>
                  {moment(postData.createdAt).locale('ru').format('LLL')}
                </div>
              </div>
              <h1 className={s.post__title}>{postData.title}</h1>
              <div className={s.stats}>
                <div
                  className={classNames(s.stats__item, {
                    [s.stats__item_unknown]:
                      postData.difficulty === 'Не указано',
                    [s.stats__item_easy]: postData.difficulty === 'Легко',
                    [s.stats__item_normal]: postData.difficulty === 'Сложно',
                    [s.stats__item_hard]: postData.difficulty === 'Тяжело',
                  })}
                >
                  {t('complexity')}:<span>{t(postData.difficulty)}</span>
                </div>
                <div className={s.stats__item}>
                  <Views />
                  <span>{`${postData.views}`}</span>
                </div>
              </div>
              <div className={s.habs}>
                <span>{t('habs')}:</span>
                <ul>
                  {postData.habs.map((el: IHab) => (
                    <li key={`${el.id}`}>
                      <Link to={`/hab/${el.id}/articles/1`}>{el.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.post__img}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/uploads/publications/${postData.image}`}
                  alt=''
                />
              </div>
              <div className={s.post__text}>
                <Editor
                  editorState={restoredEditorState}
                  blockRenderMap={extendedBlockRenderMap}
                  customStyleMap={styleMap}
                  readOnly
                />
              </div>
            </div>
            <PostAuthor author={postData.author} />
            <Comments />
          </div>
          <SidebarWrapper>
            <SidebarReadWeekly category={postData.category} />
          </SidebarWrapper>
        </div>
      )}
    </>
  )
}

export default PostPage
