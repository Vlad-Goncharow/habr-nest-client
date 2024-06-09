import { IUser } from "entities/User"
import { IPost } from "./posts"

export interface CommentsType {
  id: number
  content: string
  userId: number
  postId: number
  author: IUser
  createdAt: string
  updatedAt: string
}
export interface CommentsTypeEx extends CommentsType {
  post: IPost
  author: IUser
}