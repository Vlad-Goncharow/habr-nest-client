import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadFavoritePostsFN } from '../api'
import { fetchModalActions } from 'entities/FetchModal'

interface useFavoritesPostsProps {
  userId: string | undefined
  subType: string | undefined
  type: string | undefined
  page: string | undefined
}

const useFavoritesPosts = (props: useFavoritesPostsProps): any => {
  const { page, type, subType, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, subType, page],
    queryFn: () => loadFavoritePostsFN(userId, subType, page),
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

  return { data, isLoading, isSuccess }
}

export default useFavoritesPosts
