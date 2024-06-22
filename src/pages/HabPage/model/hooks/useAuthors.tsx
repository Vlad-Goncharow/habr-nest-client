import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadAuthorsFN } from '../lib'

interface usePostsProps {
  habId: string | undefined
  page: string | undefined
  type: string | undefined
  sort: string | null
  order: string | null
}

const useAuthors = (props: usePostsProps): any => {
  const { page, type, order, sort, habId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['hab', habId, type, sort, order, page],
    queryFn: () => loadAuthorsFN(habId, sort, order, page),
    select: (data) => data.data,
  })

  //error handled
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])

  return isSuccess && { users: data.users, length: data.length, isLoading, isSuccess }
}

export default useAuthors