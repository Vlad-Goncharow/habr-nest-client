import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/StoreProvider'
import { getUserData } from 'entities/User'
import { IPost } from 'shared/types/posts'

export const selectIsSubscribed = createSelector(
  [getUserData, (state: RootState, postId: number) => postId],
  (user, postId) =>
    user.user !== null &&
    user.user.favoritePosts.find((el: IPost) => el.id === postId) !== undefined
)
