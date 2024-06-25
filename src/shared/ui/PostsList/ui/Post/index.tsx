import Draft, { Editor, EditorState, convertFromRaw } from 'draft-js'
import moment from 'moment'
import { blockRenderMap, styleMap } from 'pages/CreatePost/ui/FirstStep'
import React from 'react'
import { Link } from 'react-router-dom'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import s from './Post.module.scss'
import { ReactComponent as Views } from 'shared/images/svg/postViews.svg'
import { ReactComponent as Comments } from 'shared/images/svg/postComments.svg'
import { FavoritePostBtn } from 'features/FavoritePostBtn'

interface PostProps{
  post:IPost
}

const Post: React.FC<PostProps> = ({post}) =>{
  const contentStateFromJSON = convertFromRaw(JSON.parse(post.content));
  const restoredEditorState = EditorState.createWithContent(contentStateFromJSON);

  const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);
  return (
    <article className={s.item}>
      <header className={s.item__header}>
        <div className={s.item__authorImg}>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${post.author.avatar}`} alt="" />
        </div>
        <Link to={`/user/${post.author.id}/profile/1`} className={s.item__authorName}>{post.author.nickname}</Link>
        <time className={s.item__date}>{moment(post.createdAt).locale('ru').format('LLL')}</time>
      </header>
      <Link to={`/${post.type}/${post.id}`} className={s.item__title}>{post.title}</Link>
      <div className={s.item__habs}>
        {
          post.habs.map((hab: IHab) =>
            <Link to={`/hab/${hab.id}/articles/1`} key={hab.id}>{hab.title}</Link>
          )
        }
      </div>
      <div className={s.item__img}>
        <img src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`} alt="" />
      </div>
      <div className={s.item__text}>
        <Editor editorState={restoredEditorState} blockRenderMap={extendedBlockRenderMap} customStyleMap={styleMap} readOnly />
      </div>
      <Link to={`/post/${post.id}`} className={s.item__link}>Читать далее</Link>
      <footer className={s.item__footer}>
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
      </footer>
    </article>
  )
}

export default Post