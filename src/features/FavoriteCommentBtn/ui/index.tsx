import React from 'react'
import { ReactComponent as FavoriteSvg } from 'shared/images/svg/favorite.svg'
import s from './FavoriteCommentBtn.module.scss'
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectIsAuth, selectIsSubscribed } from '../model/selectors';
import { addFavoriteComment, removeFavoriteComment } from '../model/actions';
import classNames from 'classnames';

interface FavoriteCommentBtnProps{
  commentId:number
}

const FavoriteCommentBtn: React.FC<FavoriteCommentBtnProps> = ({commentId}) => {
  const dispatch = useAppDispatch();

  const isSubscribed = useAppSelector((state) => selectIsSubscribed(state, commentId));
  const selectIsAuthh = useAppSelector((state) => selectIsAuth(state));

  const handleAddFavorite = async () => {
    dispatch(addFavoriteComment(Number(commentId)));
  };

  const handleRemoveFavorite = async () => {
    dispatch(removeFavoriteComment(Number(commentId)));
  };
  
  return (
    <div
      className={classNames(s.item, {
        [s.item_active]: isSubscribed
      })}
      onClick={() => {
        selectIsAuthh && (isSubscribed ? handleRemoveFavorite() : handleAddFavorite())
      }}
    >
      <FavoriteSvg />
    </div>
  )
}

export default FavoriteCommentBtn