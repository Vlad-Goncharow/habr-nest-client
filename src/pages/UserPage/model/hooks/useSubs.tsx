import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadSubsFN } from '../api'
import { useTranslation } from 'react-i18next'

interface useSubsProps {
  userId: string | undefined
  type: string | undefined
  page: string | undefined
}

const useSubs = (props: useSubsProps): any => {
  const { t } = useTranslation()
  const { page, type, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, page],
    queryFn: () => loadSubsFN(userId, type, page),
    select: (data) => data.data,
  })

  const typeError =
    type === 'subscribers'
      ? 'userPageLoadSubscribersError'
      : 'userPageLoadSubscriptionsError'

  React.useEffect(() => {
    if (isError) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t(typeError),
        })
      )
    }
  }, [isError])

  return isSuccess && { data, length: data.length, isLoading, isSuccess }
}

export default useSubs
