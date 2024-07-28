import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/StoreProvider'

export const getUserData = (state: RootState) => state.user

export const checkRolesAdminModerator = createSelector(
  [getUserData, (state: RootState) => state.user],
  (user) =>
    user.user?.roles.some(
      (el) => el.value === 'ADMIN' || el.value === 'MODERATOR'
    )
)

export const checkRolesAdmin = createSelector(
  [getUserData, (state: RootState) => state.user],
  (user) => user.user?.roles.some((el) => el.value === 'ADMIN')
)

export const selectIsAuth = createSelector(
  [getUserData, (state: RootState) => state.user],
  (user) => user.user !== null
)
