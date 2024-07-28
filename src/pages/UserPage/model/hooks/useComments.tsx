import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadCommentsFN } from '../api'

interface useCommentsProps {
  userId: string | undefined
  type: string | undefined
  page: string | undefined
}

const useComments = (props: useCommentsProps): any => {
  const { page, type, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, page],
    queryFn: () => loadCommentsFN(userId, page),
    select: (data) => data.data,
  })

  //error handled
  React.useEffect(() => {
    if (isError) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'Ошибка, попробуйте еще раз!',
        })
      )
    }
  }, [isError])

  return (
    isSuccess && {
      comments: data.comments,
      length: data.length,
      isLoading,
      isSuccess,
    }
  )
}

export default useComments
