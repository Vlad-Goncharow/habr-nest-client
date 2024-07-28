import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/StoreProvider'
import { getUserData } from 'entities/User'
import { IHab } from 'shared/types/habs'

export const selectIsSubscribed = createSelector(
  [getUserData, (state: RootState, habId: number) => habId],
  (user, habId) =>
    user.user !== null &&
    user.user.habSubscribers.find((el: IHab) => el.id === habId) !== undefined
)
