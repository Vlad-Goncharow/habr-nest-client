import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { PostsList } from 'shared/ui/PostsList'
import axios from '../../../../axios'

function Posts() {
  //params
  const {type, category, page} = useParams()

  //dispatch
  const dispatch = useAppDispatch()

  //query
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['posts', category, type, page], 
    queryFn: () => axios.get(`/posts/${category}/${type}/?page=${page}&pageSize=${20}`),
    select:(data) => data.data,
  })
  
  //error handled
  React.useEffect(() => {
    if(isError){
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  },[isError])
  
  return (
    <>
      {
        isSuccess &&
        <PostsList loading={isLoading} posts={data.posts} length={data.length} navigatePath={`/flows/${category}/${type}`} />
      }
    </>
  )
}

export default Posts