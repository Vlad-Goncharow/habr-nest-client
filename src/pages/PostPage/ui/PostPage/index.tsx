import classNames from 'classnames'
import Draft, { Editor, EditorState, convertFromRaw } from 'draft-js'
import { fetchModalActions } from 'entities/FetchModal'
import moment from 'moment'
import { blockRenderMap, styleMap } from 'pages/CreatePost/ui/FirstStep'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ReactComponent as Views } from 'shared/images/svg/postViews.svg'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import { SidebarReadWeekly } from 'widgets/SidebarReadWeekly'
import axios from '../../../../axios'
import Comments from '../Comments'
import PostAuthor from '../PostAuthor'
import s from './PostPage.module.scss'

function PostPage() {
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
            content: 'Ошибка, попробуйте еще раз!',
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
      {postData !== null && (
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            <div className={s.post}>
              <header className={s.post__header}>
                <div className={s.post__authorImg}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}/${postData.author.avatar}`} alt='' />
                </div>
                <Link
                  to={`/user/${postData.author.id}/profile/1`}
                  className={s.post__authorName}
                >
                  {postData.author.nickname}
                </Link>
                <div className={s.post__date}>
                  {moment(postData.createdAt).locale('ru').format('LLL')}
                </div>
              </header>
              <h1 className={s.post__title}>{postData.title}</h1>
              <div className={s.stats}>
                <div className={classNames(s.stats__item,{
                  [s.stats__item_unknown]:postData.difficulty === 'Не указано',
                  [s.stats__item_easy]:postData.difficulty === 'Легко',
                  [s.stats__item_normal]:postData.difficulty === 'Сложно',
                  [s.stats__item_hard]:postData.difficulty === 'Тяжело',
                })}>
                  Сложность:<span>{postData.difficulty}</span>
                </div>
                <div className={s.stats__item}>
                  <Views />
                  <span>{`${postData.views}`}</span>
                </div>
              </div>
              <div className={s.post__info}>
                <span>Хабы:</span>
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
                  src={`${process.env.REACT_APP_SERVER_URL}/${postData.image}`}
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
