import Draft, { Editor, EditorState, convertFromRaw } from 'draft-js'
import { checkRolesAdminModerator, getUserData } from 'entities/User'
import { FavoritePostBtn } from 'features/FavoritePostBtn'
import moment from 'moment'
import { blockRenderMap, styleMap } from 'pages/CreatePost/ui/FirstStep'
import React from 'react'
import { Link } from 'react-router-dom'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { useDeletePost } from 'shared/hooks/useDeletePost'
import { ReactComponent as Delete } from 'shared/images/svg/delete.svg'
import { ReactComponent as Dots } from 'shared/images/svg/dots.svg'
import { ReactComponent as Comments } from 'shared/images/svg/postComments.svg'
import { ReactComponent as Views } from 'shared/images/svg/postViews.svg'
import { ReactComponent as Share } from 'shared/images/svg/share.svg'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import s from './Post.module.scss'

interface PostProps {
  post: IPost
  query: any
}

const Post: React.FC<PostProps> = ({ post, query }) => {
  const { user } = useAppSelector(getUserData)

  const deletePost = useDeletePost({ query })

  const checkUserAdminOrModerator = useAppSelector(checkRolesAdminModerator)

  const contentStateFromJSON = convertFromRaw(JSON.parse(post.content))
  const restoredEditorState =
    EditorState.createWithContent(contentStateFromJSON)

  const extendedBlockRenderMap =
    Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)

  const [popupIsOpen, setPopupIsOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement | null>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    setPopupIsOpen(false)
  }

  return (
    <article className={s.item}>
      <header className={s.item__header}>
        <div className={s.item__authorImg}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${post.author.avatar}`}
            alt=''
          />
        </div>
        <Link
          to={`/user/${post.author.id}/profile/1`}
          className={s.item__authorName}
        >
          {post.author.nickname}
        </Link>
        <time className={s.item__date}>
          {moment(post.createdAt).locale('ru').format('LLL')}
        </time>
      </header>
      <Link to={`/${post.type}/${post.id}`} className={s.item__title}>
        {post.title}
      </Link>
      <div className={s.item__habs}>
        {post.habs.map((hab: IHab) => (
          <Link to={`/hab/${hab.id}/articles/1`} key={hab.id}>
            {hab.title}
          </Link>
        ))}
      </div>
      <div className={s.item__img}>
        <img src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`} alt='' />
      </div>
      <div className={s.item__text}>
        <Editor
          editorState={restoredEditorState}
          blockRenderMap={extendedBlockRenderMap}
          customStyleMap={styleMap}
          readOnly
        />
      </div>
      <Link to={`/post/${post.id}`} className={s.item__link}>
        Читать далее
      </Link>
      <footer className={s.footer}>
        <div className={s.footer__left}>
          <div className={s.item__footerItem}>
            <Views />
            <span>{`${post.views}`}</span>
          </div>
          <div className={s.item__footerItem}>
            <Comments />
            <span>{post.commentsCount}</span>
          </div>
          <div className={s.item__footerItem}>
            <FavoritePostBtn postId={post.id} count={post.favoritesCount} />
          </div>
        </div>
        <div className={s.footer__right}>
          <div ref={popupRef} className={s.controls}>
            <div
              onClick={() => setPopupIsOpen((prev) => !prev)}
              className={s.controls__icon}
            >
              <Dots />
            </div>
            {popupIsOpen && (
              <div className={s.popup}>
                <ul>
                  {user !== null &&
                    (post.author.id === user.id ||
                      checkUserAdminOrModerator) && (
                      <li onClick={() => deletePost(post.id)}>
                        <Delete />
                        <span>Удалить</span>
                      </li>
                    )}
                  <li
                    onClick={() =>
                      copyToClipboard(
                        `${process.env.REACT_APP_CLIENT_URL}/articles/${post.id}`
                      )
                    }
                  >
                    <Share />
                    <span>Поделиться</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </footer>
    </article>
  )
}

export default Post
