import { fetchModalActions } from 'entities/FetchModal';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { UsersList } from 'shared/ui/UsersList';
import axios from '../../../../axios';

function Authors() {
  const {page} = useParams()

  const dispatch = useAppDispatch()

  const [users, setUsers] = React.useState([])
  const [loadingUsers, setLoadingUsers] = React.useState(false)
  const [userLength, setUsersLength] = React.useState(0)
  
  const [searchParams] = useSearchParams()
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const q = searchParams.get('q');

  React.useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true)
        const { data } = await axios.get(`/users/authors/all/${q ? q : ' '}?sort=${sort}&order=${order}&page=${page}&pageSize=20`)
        setLoadingUsers(false)
        setUsers(data.authors)
        setUsersLength(data.length)
      } catch(e){
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
      }
    })()
  },[order, page, q, sort])

  return (
    <UsersList
      usersTotalCount={userLength}
      usersLoading={loadingUsers}
      users={users}
      navigatePath={`/search/authors`}
    />
  )
}

export default Authors