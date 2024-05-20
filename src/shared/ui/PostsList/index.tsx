import React from 'react'
import { IPost } from 'shared/types/posts'
import Pagination from 'widgets/Pagination'
import EmptyPosts from '../EmptyPosts'
import Post from '../Post'


interface PostsListProps{
  posts:IPost[] | []
  length:number,
  navigatePath:string
  pageSize:number,
}

const PostsList: React.FC<PostsListProps> = ({ posts, length, navigatePath, pageSize }) => {
  return (
    posts.length > 0 ?
      <>
        {
          posts.map((el: IPost) =>
            <Post key={el.id} post={el} />
          )
        }
        <Pagination length={length} navigatePath={navigatePath} pageSize={pageSize} />
      </>
    :
      <EmptyPosts />
  )
}

export default PostsList