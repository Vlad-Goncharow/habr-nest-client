import { IHab } from "shared/types/habs";
import { IPost } from "shared/types/posts";

export interface IUser {
  id: number;
  email: string;
  password: string;
  nickname: string;
  avatar: string;
  gender: string;
  description?: string | null;
  country?: string | null;
  karma:number,
  rating:number,
  habSubscribers: IHab[];
  subscribers: IUser[];
  subscriptions: IUser[];
  posts: IPost[];
  createdAt: Date;
  updatedAt: Date;
}

export interface userStateSchema {
  user: IUser | null
  isLoading: boolean
}

export interface formRegister {
  email:string
  password:string
  nickname:string
}

export interface formLogin {
  email: string
  password: string
}

export interface IShortUserSubs {
  _id: string;
  nickname: string;
  avatar: string;
  description?: string | null;
}

export interface IUserSubsList {
  length:number,
  subs: IShortUserSubs[] | []
}