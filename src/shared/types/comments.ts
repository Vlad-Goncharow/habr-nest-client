import { IUser } from 'entities/User'
import { IPost } from './posts'

export interface IComment {
  id: number
  content: string
  userId: number
  postId: number
  author: IUser
  createdAt: string
  updatedAt: string
}
export interface ICommentEx extends IComment {
  post: IPost
  author: IUser
}
