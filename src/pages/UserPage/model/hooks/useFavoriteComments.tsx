import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadFavoriteCommentsFN } from '../api'

interface useFavoritesPostsProps {
  userId: string | undefined
  subType: string | undefined
  type: string | undefined
  page: string | undefined
}

const useFavoritesComments = (props: useFavoritesPostsProps): any => {
  const { page, type, subType, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, subType, page],
    queryFn: () => loadFavoriteCommentsFN(userId, page),
    select: (data) => data.data,
  })

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

export default useFavoritesComments
