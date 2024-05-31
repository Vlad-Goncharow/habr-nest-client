import classNames from 'classnames'
import { IUser, getUserData } from 'entities/User'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import Empty from 'shared/ui/Empty'
import axios from '../../../../axios'
import Comment from '../Comment'
import s from './Comments.module.scss'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { UsersSkeleton } from 'shared/ui/UsersList'

export interface CommentsType {
  id: number
  content:string
  userId:number
  postId:number
  author:IUser
  createdAt:string
  updatedAt:string
}

const Comments: React.FC = () => {
  //dispatch
  const dispatch = useAppDispatch()
  
  //params
  const {postId} = useParams()

  //current user
  const {user} = useAppSelector(getUserData)

  //loading comments
  const [loading, setLoding] = React.useState<boolean>(true)

  //comments
  const [comments, setComments] = React.useState<CommentsType[]>([])

  //comments row ref
  const commentsRef = React.useRef<HTMLDivElement>(null)

  //input values
  const [inputValue, setInputValue] = React.useState('')

  //add new comment
  const clickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length > 5) {
      try{
        const { data } = await axios.post(`/comments/create/${postId}`, {
          content: inputValue
        })

        if (data) {
          setComments((prev: CommentsType[]) => [...prev, data])
          setInputValue('')
        }
      } catch(e){
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При отправке комментария произошла ошибка!' }))
      }
    }
  }

  //load comments
  React.useEffect(() => {
    (async () => {
      try{
        setLoding(true)
        const {data} = await axios.get(`/comments/load/${postId}`)
        setComments(data)
        setLoding(false)
      } catch(e){
        setLoding(false)
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При загрузки комментариев произошла ошибка!' }))
      }
    })()
  },[postId])

  //scroll to bottom when comments loaded
  React.useEffect(() => {
    if(!loading){
      if (commentsRef.current) {
        commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
      }
    }
  },[loading, comments])


  const deleteComment = async (commentId:number) => {
    const { data } = await axios.post(`/comments/delete/${commentId}`)
    if(data.success === true){
      setComments((prev:CommentsType[]) => {
        return prev.filter((el) => el.id !== commentId)
      })
    }
  }  

  return (
    <div className={s.wrapper}>
      <div className={s.comments}>
        <h2 className={s.comments__title}>Коментарии</h2>
        {
          loading ?
            <UsersSkeleton />
          :
            <div ref={commentsRef} className={s.row}>
              {
                comments.length > 0 ?
                  comments.map((item: CommentsType, index) =>
                    <Comment 
                      key={`${item.id}`} 
                      deleteComment={deleteComment} 
                      item={item} 
                      user={user} 
                      length={comments.length}
                      index={index}
                    />
                  )
                  : <Empty />
              }
            </div>
        }
        {
          user !== null &&
          <form onSubmit={clickSubmit} action="" className={s.form}>
            <h3 className={s.form__title}>Ваш Коментарий</h3>
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={s.form__input} />
            <div className={s.form__bottom}>
              <div className={s.buttons}>
                <button type='submit' className={classNames(s.buttons__btn, {
                  [s.buttons__btn_disable]: inputValue.length < 5,
                  [s.buttons__btn_active]: inputValue.length >= 5
                })}>Отправить</button>
              </div>
            </div>
          </form>
        }
      </div>
      {
        user === null &&
        <div className={s.auth}>
          <span>Только полноправные пользователи могут оставлять комментарии. <Link to='/login'>Войдите</Link>, пожалуйста.</span>
        </div>
      }
    </div>
  )
}

export default Comments