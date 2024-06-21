import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadHabsFN } from '../lib'

interface useHabsProps {
  type: string | undefined
  category: string | undefined
  page: string | undefined
  sort: any
  order: any
  title: string | undefined
}

const useHabs = (props: useHabsProps): any => {
  const { page, category, type,title,order,sort } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['habs', category, type, title, page, `${sort}`, `${order}`],
    queryFn: () => loadHabsFN(category, title, `${sort}`, `${order}`, page),
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