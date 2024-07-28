import Draft, { Editor, EditorState, convertFromRaw } from 'draft-js'
import { fetchModalActions } from 'entities/FetchModal'
import moment from 'moment'
import { blockRenderMap, styleMap } from 'pages/CreatePost/ui/FirstStep'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import SidebarWrapper from 'shared/ui/SidebarWrapper'
import axios from '../../../../axios'
import Comments from '../Comments'
import PostAuthor from '../PostAuthor'
import s from './PostPage.module.scss'
import { SidebarReadWeekly } from 'widgets/SidebarReadWeekly'

function PostPage() {
  //dispatch
  const dispatch = useAppDispatch()

  //params
  const { postId, type } = useParams()

  //posts data | loading
  const [postData, setPostData] = React.useState<IPost | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/posts/${postId}`)
        setPostData(data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
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

  if (loading) <div>loading</div>

  return (
    <>
      {postData !== null && (
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            <div className={s.post}>
              <header className={s.post__header}>
                <div className={s.post__authorImg}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/${postData.author.avatar}`}
                    alt=''
                  />
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
              <h2 className={s.post__title}>{postData.title}</h2>
              <div className={s.stats}>
                <div className={s.stats__item}>
                  Сложность:<span>{postData.difficulty}</span>
                </div>
                <div className={s.stats__item}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                  </svg>
                  <span>{`${postData.views}`}</span>
                </div>
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
