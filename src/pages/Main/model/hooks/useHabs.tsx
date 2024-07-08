import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadHabsFN } from '../lib'

interface useHabsProps {
  type: string | undefined
  category: string | undefined
  page: string | undefined
  sort: string | null
  order: string | null
  title: string | null
}

const useHabs = (props: useHabsProps): any => {
  const { page, category, type,title,order,sort } = props
  const dispatch = useAppDispatch()

  const queryTitle = title ? title : ' '

  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['habs', category, type, queryTitle, page, `${sort}`, `${order}`],
    queryFn: () => loadHabsFN(category, queryTitle, `${sort}`, `${order}`, page),
    select: (data) => data.data,
  })

  //error handled
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])

  return { data, isLoading, isSuccess }
}

export default useHabs