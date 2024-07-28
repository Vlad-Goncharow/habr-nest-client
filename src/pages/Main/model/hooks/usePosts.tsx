import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadPostsFN } from '../lib'

interface usePostsProps {
  type: string | undefined
  category: string | undefined
  page: string | undefined
}

const usePosts = (props: usePostsProps): any => {
  const { page, category, type } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['posts', category, type, page],
    queryFn: () => loadPostsFN(category, type, page),
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

  return { data, isLoading, isSuccess }
}

export default usePosts
