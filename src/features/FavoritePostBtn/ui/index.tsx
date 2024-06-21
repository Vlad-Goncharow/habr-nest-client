import classNames from 'classnames'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { ReactComponent as FavoriteSvg } from 'shared/images/svg/favorite.svg'
import { addFavoritePost, removeFavoritePost } from '../model/actions'
import { selectIsAuth, selectIsSubscribed } from '../model/selectors'
import s from './FavoritePostBtn.module.scss'

interface FavoritePostBtnProps{
  postId:number
  count:number
}

const FavoritePostBtn: React.FC<FavoritePostBtnProps> = ({postId,count}) => {
  const dispatch = useAppDispatch();

  const [myCount, setMyCount] = React.useState(() => Number(count))
  
  const isSubscribed = useAppSelector((state) => selectIsSubscribed(state, postId));
  const selectIsAuthh = useAppSelector((state) => selectIsAuth(state));
  
  const handleAddFavorite = async () => {
    dispatch(addFavoritePost(Number(postId)));
    setMyCount(prev => prev + 1)
  };

  const handleRemoveFavorite = async () => {
    dispatch(removeFavoritePost(Number(postId)));
    setMyCount(prev => prev - 1)
  };

  return (
    <div 
      className={classNames(s.item, {
        [s.item_active]:isSubscribed
      })}
      onClick={() => {
        selectIsAuthh && (isSubscribed ? handleRemoveFavorite() : handleAddFavorite())
      }}
    >
      <FavoriteSvg />
      <span>{myCount}</span>
    </div>
  )
}

export default FavoritePostBtn