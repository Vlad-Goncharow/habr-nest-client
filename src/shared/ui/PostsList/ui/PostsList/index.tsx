import React from 'react'
import { IPost } from 'shared/types/posts'
import Pagination from 'widgets/Pagination'
import Empty from '../../../Empty'
import Post from '../Post'
import PostsSceleton from '../PostsSceleton'

interface PostsListProps{
  posts:IPost[] | []
  length:number,
  navigatePath:string
  loading:boolean,
}

const PostsList: React.FC<PostsListProps> = ({ loading, posts, length, navigatePath, }) => {
  return (
    loading 
    ?
      <PostsSceleton />
    :
      posts.length > 0 ?
        <>
          <div>
            {
              posts.map((el: IPost) =>
                <Post key={el.id} post={el} />
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