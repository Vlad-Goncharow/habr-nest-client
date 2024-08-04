import { fetchModalActions } from 'entities/FetchModal'
import { fetchLogout } from 'entities/User'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ReactComponent as LogoutSvg } from 'shared/images/svg/logout.svg'

function Logout() {
  const dispatch = useAppDispatch()

  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'Произошла ошибка!',
        })
      )
    }
  }

  return (
    <li onClick={logout}>
      <Link to='/flows/all/articles/1'>
        <LogoutSvg />
        Выход
      </Link>
    </li>
  )
}

export default Logout
