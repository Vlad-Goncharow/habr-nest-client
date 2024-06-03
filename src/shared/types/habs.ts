import { IUser } from "entities/User";
import { IPost } from "./posts";

export interface IHab {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: string;
  posts: IPost[];
  authors: IUser[];
  usersSubscribers: IUser[];
  usersSubscribersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStatHab {
  hab: IHab,
  posts:number,
  subscribers:number
}

export interface HabsType extends IHab {
  postsCount: number
  subscribersCount: number
  authorsCount: number
}