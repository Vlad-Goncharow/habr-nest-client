export { getUserData } from './model/selectors';
export { userActions, userReducer } from './model/slice';
export { fetchAuth, fetchLogin, fetchLogout, fetchRegister, fetchUpdateUser} from './model/thunks'
export type { IUser, userStateSchema, AuthRegisterError, AuthLoginError, FormRegister, FormLogin } from "./model/types/user";