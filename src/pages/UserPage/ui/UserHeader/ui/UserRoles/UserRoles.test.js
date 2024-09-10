import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userAdminMock, userMock, userModeratorMock } from 'shared/tests'
import { renderWithProviders } from 'shared/tests/utils/test-utils'
import axios from '../../../../../../axios'
import { fetchModalActions } from '../../../../../../entities/FetchModal'
import { useAppDispatch } from '../../../../../../shared/hooks/useAppDispatch'
import UserRoles from './UserRoles'

jest.mock('axios', () => {
  const originalAxios = jest.requireActual('axios')

  return {
    ...originalAxios,
    create: () => {
      const instance = {
        post: jest.fn(), // Мокируем метод post
        interceptors: {
          request: {
            use: jest.fn(),
            eject: jest.fn(),
          },
          response: {
            use: jest.fn(),
            eject: jest.fn(),
          },
        },
      }
      return instance
    },
  }
})

jest.mock('../../../../../../shared/hooks/useAppDispatch')

describe('UserRoles Component', () => {
  beforeEach(() => {
    useAppDispatch.mockReturnValue(jest.fn())
  })

  it('should not render roles menu when user is admin', () => {
    renderWithProviders(<UserRoles userData={userAdminMock} />)

    const rolesMenu = screen.queryByTestId('roles-menu')
    expect(rolesMenu).not.toBeInTheDocument()
  })

  it('should render roles menu when user is not admin', () => {
    renderWithProviders(<UserRoles userData={userMock} />)

    const rolesMenu = screen.getByTestId('roles-menu')
    expect(rolesMenu).toBeInTheDocument()
  })

  it('should display the "Выдать" button when the menu icon is clicked', async () => {
    const mockDispatch = jest.fn()
    useAppDispatch.mockReturnValue(mockDispatch)
    axios.post.mockResolvedValue({ data: { success: true } })

    renderWithProviders(<UserRoles userData={userMock} />)

    fireEvent.click(screen.getByTestId('open-menu-icon'))

    await waitFor(() => {
      const assignButton = screen.getByText('Выдать')
      expect(assignButton).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Выдать'))

    expect(axios.post).toHaveBeenCalledWith(`/users/${userMock.id}/role/3/add`)
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchModalActions.showModal({
          type: 'good',
          content: 'Роль успешно выдана!',
        })
      )
    })
  })

  it('should display the "Забрать" button when the menu icon is clicked', async () => {
    const mockDispatch = jest.fn()
    useAppDispatch.mockReturnValue(mockDispatch)
    axios.post.mockResolvedValue({ data: { success: true } })

    renderWithProviders(<UserRoles userData={userModeratorMock} />)
    fireEvent.click(screen.getByTestId('open-menu-icon'))

    await waitFor(() => {
      const assignButton = screen.getByText('Забрать')
      expect(assignButton).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Забрать'))

    expect(axios.post).toHaveBeenCalledWith(
      `/users/${userModeratorMock.id}/role/3/remove`
    )
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchModalActions.showModal({
          type: 'good',
          content: 'Роль успешно забрана!',
        })
      )
    })
  })
})
