import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import { loadAuthorsFN } from 'pages/Main/model'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { UsersList } from 'shared/ui/UsersList'

function Authors(props:any) {
  //params
  const { type, category, page } = useParams()

  //dispatch
  const dispatch = useAppDispatch()


  //query
  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['authors', category, type, props.title, page],
    queryFn: () => loadAuthorsFN(category, props.title, page),
    select: (data) => data.data,
  })

  //error handler
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])

  return (
    <>
      {
        isSuccess &&
        <UsersList
          navigatePath={`/flows/${category}/${type}`}
          users={data.authors}
          usersLoading={isLoading}
          usersTotalCount={data.length}
        />
      }
    </>
  )
}

export default Authors