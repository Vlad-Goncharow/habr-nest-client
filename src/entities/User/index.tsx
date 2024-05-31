export { getUserData } from './model/selectors';
export { fetchAuth, fetchLogin, fetchLogout, fetchRegister, fetchUpdateUser, userActions, userReducer } from './model/slice';
export type { IUser, userStateSchema, AuthRegisterError, AuthLoginError, FormRegister, FormLogin } from "./model/types/user";