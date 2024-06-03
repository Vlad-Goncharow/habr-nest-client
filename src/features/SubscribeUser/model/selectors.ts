
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/StoreProvider';
import { IUser, getUserData } from 'entities/User';


export const selectIsSubscribed = createSelector(
  [getUserData, (state: RootState, userId: number) => userId],
  (user, userId) => user.user !== null && user.user.subscriptions.find((el: IUser) => el.id === userId) !== undefined
);