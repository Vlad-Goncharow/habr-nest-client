import React from 'react'
import { ReactComponent as FavoriteSvg } from 'shared/images/svg/favorite.svg'
import s from './FavoriteCommentBtn.module.scss'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import classNames from 'classnames'
import { selectIsAuth } from 'entities/User'
import {
  addFavoriteComment,
  removeFavoriteComment,
  selectIsSubscribed,
} from '../model'
import IsActiveEmail from 'shared/ui/isActiveEmail'

interface FavoriteCommentBtnProps {
  commentId: number
}

const FavoriteCommentBtn: React.FC<FavoriteCommentBtnProps> = ({
  commentId,
}) => {
  const dispatch = useAppDispatch()

  const isSubscribed = useAppSelector((state) =>
    selectIsSubscribed(state, commentId)
  )
  const selectIsAuthh = useAppSelector((state) => selectIsAuth(state))

  const handleAddFavorite = async () => {
    dispatch(addFavoriteComment(Number(commentId)))
  }

  const handleRemoveFavorite = async () => {
    dispatch(removeFavoriteComment(Number(commentId)))
  }

  return (
    <IsActiveEmail>
      <div
        className={classNames(s.item, {
          [s.item_active]: isSubscribed,
        })}
        onClick={() => {
          selectIsAuthh &&
            (isSubscribed ? handleRemoveFavorite() : handleAddFavorite())
        }}
      >
        <FavoriteSvg />
      </div>
    </IsActiveEmail>
  )
}

export default FavoriteCommentBtn
