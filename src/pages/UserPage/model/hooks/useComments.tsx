import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadCommentsFN } from '../api'
import { useTranslation } from 'react-i18next'

interface useCommentsProps {
  userId: string | undefined
  type: string | undefined
  page: string | undefined
}

const useComments = (props: useCommentsProps): any => {
  const { t } = useTranslation()
  const { page, type, userId } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', userId, type, page],
    queryFn: () => loadCommentsFN(userId, page),
    select: (data) => data.data,
  })

  React.useEffect(() => {
    if (isError) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('userPageLoadCommentsError'),
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

export default useComments
