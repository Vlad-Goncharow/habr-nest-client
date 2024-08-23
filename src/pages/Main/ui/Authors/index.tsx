import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { UsersList, UsersSkeleton } from 'shared/ui/UsersList'
import { useAuthors } from '../../model'

const Authors: React.FC = () => {
  const { type, category, page } = useParams()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const query = searchParams.get('q')

  const { isLoading, isSuccess, data } = useAuthors({
    type,
    category,
    sort,
    order,
    page,
    title: query,
  })

  return (
    <>
      {!isLoading && isSuccess ? (
        <UsersList
          navigatePath={`/flows/${category}/${type}`}
          users={data.authors}
          usersLoading={isLoading}
          usersTotalCount={data.length}
        />
      ) : (
        <UsersSkeleton />
      )}
    </>
  )
}

export default Authors
