import React from 'react'
import { useParams } from 'react-router-dom'
import { UsersList } from 'shared/ui/UsersList'
import { useAuthors } from '../../model'

interface AuthorsProps{
  title:string
}

const Authors: React.FC<AuthorsProps> = ({title}) => {
  //params
  const { type, category, page } = useParams()

  //data
  const {isLoading, isSuccess, length, authors} = useAuthors({type, category, page,title})

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