import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadPostsFN } from '../api'
import { useTranslation } from 'react-i18next'

interface usePostsProps {
  userId: string | undefined
  type: string | undefined
  subType: string | undefined
  page: string | undefined
}

const usePosts = (props: usePostsProps): any => {
  const { t } = useTranslation()
  const { page, subType, type, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, subType, page],
    queryFn: () => loadPostsFN(userId, subType, page),
    select: (data) => data.data,
  })

  React.useEffect(() => {
    if (isError) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('userPageLoadPublicationsError'),
        })
      )
    }
  }, [isError])

  return { data, isLoading, isSuccess }
}

export default usePosts
