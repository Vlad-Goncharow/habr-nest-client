import { fetchModalActions } from 'entities/FetchModal'
import { fetchLogout } from 'entities/User'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ReactComponent as LogoutSvg } from 'shared/images/svg/logout.svg'

function Logout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('defaultError'),
        })
      )
    }
  }

  return (
    <li onClick={logout}>
      <Link to='/flows/all/articles/1'>
        <LogoutSvg />
        {t('headerLogout')}
      </Link>
    </li>
  )
}

export default Logout
