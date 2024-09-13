import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loadPostsFN } from '../lib'
import { useTranslation } from 'react-i18next'

interface usePostsProps {
  habId: string | undefined
  type: string | undefined
  page: string | undefined
}

const usePosts = (props: usePostsProps): any => {
  const { t } = useTranslation()
  const { page, habId, type } = props
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['hab', habId, type, page],
    queryFn: () => loadPostsFN(habId, type, page),
    select: (data) => data.data,
  })

  React.useEffect(() => {
    if (isError) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('habPageLoadPostsError'),
        })
      )
    }
  }, [isError])

  return { data, isLoading, isSuccess }
}

export default usePosts
