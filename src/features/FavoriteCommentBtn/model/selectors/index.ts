import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/providers/StoreProvider";
import { getUserData } from "entities/User";
import { IComment } from "shared/types/comments";

export const selectIsSubscribed = createSelector(
  [getUserData, (state: RootState, commentId: number) => commentId],
  (user, commentId) => user.user !== null && user.user.favoriteComments.find((el: IComment) => el.id === commentId) !== undefined
);

export const selectIsAuth = createSelector(
  [getUserData, (state: RootState) => state.user],
  (user) => user.user !== null
);