export type { userStateSchema, IUser, IUserSubsList, IShortUserSubs } from "./model/types/user";
export { userActions, userReducer } from './model/slice';
export { fetchAuth, fetchRegister, fetchLogin, fetchLogout } from './model/slice';
export { getUserData } from './model/selectors'

