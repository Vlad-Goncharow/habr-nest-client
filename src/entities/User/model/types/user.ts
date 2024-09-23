import { IComment } from 'shared/types/comments'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'

export interface IUser {
  id: number
  email: string
  password: string
  nickname: string
  avatar: string
  gender: string
  description: string
  country: string
  karma: number
  rating: number
  habSubscribers: IHab[]
  subscribers: IUser[]
  subscriptions: IUser[]
  favoritePosts: IPost[]
  favoriteComments: IComment[]
  roles: UserRolesSchema[]
  posts: IPost[]
  createdAt: Date
  updatedAt: Date
  fullName: string
  dateOfBirth: Date | string
}

export interface UserRolesSchema {
  id: number
  value: string
  description: string
}

export interface userStateSchema {
  user: IUser | null
  isLoading: boolean
}

export interface FormRegister {
  email: string
  password: string
  nickname: string
  passwordEqual: string
}

export interface FormLogin {
  email: string
  password: string
}

export interface AuthResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

export type FormRegisterFields =
  | 'email'
  | 'password'
  | 'nickname'
  | 'passwordEqual'
export type FormLoginFields = 'email' | 'password'

export interface AuthRegisterError {
  message: string
  param: FormRegisterFields
}
export interface AuthLoginError {
  message: string
  param: FormLoginFields
}
