import React from 'react'
import { IPost } from 'shared/types/posts'
import Pagination from 'widgets/Pagination'
import Empty from '../../../Empty'
import Post from '../Post'

interface PostsListProps{
  posts:IPost[] | []
  length:number,
  navigatePath:string
  query: any
}

const PostsList: React.FC<PostsListProps> = ({ posts, length, navigatePath, query }) => {
  return (
      posts.length > 0 ?
        <>
          <div>
            {
              posts.map((el: IPost) =>
                <Post key={el.id} post={el} query={query} />
              )
            }
          </div>
          <Pagination length={length} navigatePath={navigatePath} pageSize={20} />
        </>
      :
        <Empty />
  )
}

export default PostsList