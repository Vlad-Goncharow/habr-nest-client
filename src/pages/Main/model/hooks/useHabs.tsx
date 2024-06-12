import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadHabsFN } from '../lib'

interface usePostsProps {
  type: string | undefined
  category: string | undefined
  page: string | undefined
  title: string | undefined
  sortOptions: any
}

const useHabs = (props: usePostsProps): any => {
  const { page, category, type,sortOptions,title } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['habs', category, type, title, page, sortOptions.sort, sortOptions.order],
    queryFn: () => loadHabsFN(category, title, sortOptions.sort, sortOptions.order, page),
    select: (data) => data.data,
  })

  //error handled
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])

  return isSuccess && { habs: data.habs, length: data.length, isLoading, isSuccess }
}

export default useHabs