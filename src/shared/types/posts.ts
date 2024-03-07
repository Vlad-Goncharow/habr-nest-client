import { IUser } from "entities/User";
import { IHab } from "./habs";

export interface IPost {
  id: number;
  title: string;
  image: string;
  content: string;
  views: number;
  category: string;
  type: string;
  author: IUser;
  habs: IHab[];
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
