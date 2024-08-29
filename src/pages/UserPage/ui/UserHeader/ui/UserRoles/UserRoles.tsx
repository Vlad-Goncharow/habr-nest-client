import React from 'react'
import s from './UserRoles.module.scss'
import { ReactComponent as Dotst } from 'shared/images/svg/dots.svg'
import { IUser } from 'entities/User'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import axios from '../../../../../../axios'
import { fetchModalActions } from 'entities/FetchModal'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import classNames from 'classnames'

interface UserRolesProps {
  userData: IUser
}

const UserRoles: React.FC<UserRolesProps> = ({ userData }) => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  UseClickOutside(menuRef, () => setIsOpen(false))

  const [isUserModer, setIsUserModer] = React.useState<boolean>(() =>
    userData.roles.find((el) => el.id === 3) ? true : false
  )

  const addUserRole = async () => {
    try {
      const { data } = await axios.post(`/users/${userData.id}/role/3/add`)
      if (data.success === true) {
        setIsUserModer(true)
        dispatch(
          fetchModalActions.showModal({
            type: 'good',
            content: 'Роль успешно выдана!',
          })
        )
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'При добовлении роли произошла ошибка!',
        })
      )
    }
  }

  const removeUserRole = async () => {
    try {
      const { data } = await axios.post(`/users/${userData.id}/role/3/remove`)
      if (data.success === true) {
        setIsUserModer(false)
        dispatch(
          fetchModalActions.showModal({
            type: 'good',
            content: 'Роль успешно забрана!',
          })
        )
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'При удалении роли произошла ошибка!',
        })
      )
    }
  }

  const handleRoles = async () => {
    if (!isUserModer) {
      addUserRole()
    } else {
      removeUserRole()
    }
  }

  return (
    <>
      {!userData.roles.find((el) => el.id === 1) && (
        <div data-testid='roles-menu' ref={menuRef} className={s.menu}>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={s.menu__icon}
            data-testid='open-menu-icon'
          >
            <Dotst />
          </div>
          {isOpen && (
            <div className={s.popup}>
              <h2 className={s.popup__title}>Роль Модератора</h2>
              <button
                onClick={handleRoles}
                className={classNames(s.button, {
                  [s.button_active]: isUserModer === false,
                  [s.button_disable]: isUserModer === true,
                })}
              >
                {isUserModer ? 'Забрать' : 'Выдать'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default UserRoles
