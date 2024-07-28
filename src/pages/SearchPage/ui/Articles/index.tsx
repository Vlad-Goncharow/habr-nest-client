import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IPost } from 'shared/types/posts'
import { PostsList, PostsSceleton } from 'shared/ui/PostsList'
import axios from '../../../../axios'

function Articles() {
  const { page } = useParams()

  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')

  const [articlesLength, setArticlesLength] = React.useState(0)
  const [articlesLoading, setArticlesLoading] = React.useState(false)
  const [articles, setArticles] = React.useState<IPost[] | []>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        setArticlesLoading(true)
        const { data } = await axios.get(
          `/posts/search/${q ? q : ' '}?page=${page}&pageSize=20`
        )
        setArticlesLoading(false)
        setArticles(data.posts)
        setArticlesLength(data.length)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: 'Ошибка, попробуйте еще раз!',
          })
        )
      }
    })()
  }, [page, q])

  return (
    <>
      {!articlesLoading ? (
        <PostsList
          length={articlesLength}
          posts={articles}
          navigatePath={`/search/articles/1`}
          query={[]}
        />
      ) : (
        <PostsSceleton />
      )}
    </>
  )
}

export default Articles
