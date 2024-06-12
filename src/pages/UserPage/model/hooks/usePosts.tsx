import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadPostsFN } from '../api'

interface usePostsProps{
  userId:string | undefined
  type:string | undefined
  subType:string | undefined
  page:string | undefined
}

const usePosts = (props: usePostsProps):any => {
  const { page, subType, type, userId } = props
  const dispatch = useAppDispatch()
  
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, subType, page],
    queryFn: () => loadPostsFN(userId, subType, page),
    select: (data) => data.data,
  })

  //error handled
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])
  
  return isSuccess && {posts:data.posts, length:data.length, isLoading, isSuccess}
}

export default usePosts