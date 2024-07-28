import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadAuthorsFN } from '../lib'

interface usePostsProps {
  type: string | undefined
  category: string | undefined
  page: string | undefined
  title: string | null
  sort: string | null
  order: string | null
}

const useAuthors = (props: usePostsProps): any => {
  const { page, category, type, title, order, sort } = props
  const dispatch = useAppDispatch()

  const queryTitle = title ? title : ' '

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['authors', category, type, sort, order, queryTitle, page],
    queryFn: () => loadAuthorsFN(category, queryTitle, sort, order, page),
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
      authors: data.authors,
      length: data.length,
      isLoading,
      isSuccess,
    }
  )
}

export default useAuthors
