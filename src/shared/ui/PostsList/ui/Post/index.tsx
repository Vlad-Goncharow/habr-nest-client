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
        <div className={s.item__date}>{moment(post.createdAt).locale('ru').format('LLL')}</div>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          <span>{post.commentsCount}</span>
        </div>
        {/* <div onClick={checkClickFavorite} className={classNames(s.item__footerItem, {
          [s.item__footerItem_active]: check
        })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          <span>{`${Number(post.favorites)}`}</span>
        </div> */}
      </footer>
    </article>
  )
}

export default Post