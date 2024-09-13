import { useTranslation } from 'react-i18next'
import axios from '../../axios'
import { useAppDispatch } from './useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { queryClient } from 'shared/api/query-client'

interface useDeletePostProps {
  query: any
}

export const useDeletePost = (props: useDeletePostProps): any => {
  const { t } = useTranslation()
  const { query } = props
  const dispatch = useAppDispatch()

  const deletePost = async (id: number) => {
    try {
      const { data } = await axios.delete(`/posts/delete/${id}`)
      if (data.success) {
        queryClient.invalidateQueries(query)
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('deletePostError'),
        })
      )
    }
  }

  return deletePost
}
