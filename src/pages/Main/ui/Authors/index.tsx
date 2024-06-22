import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { UsersList } from 'shared/ui/UsersList'
import { useAuthors } from '../../model'

interface AuthorsProps{
  title:string
}

const Authors: React.FC<AuthorsProps> = ({title}) => {
  //params
  const { type, category, page } = useParams()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  //data
  const {isLoading, isSuccess, length, authors} = useAuthors({type, category, sort, order, page,title})

  return (
    <>
      {
        isSuccess &&
        <UsersList
          navigatePath={`/flows/${category}/${type}`}
          users={authors}
          usersLoading={isLoading}
          usersTotalCount={length}
        />
      }
    </>
  )
}

export default Authors