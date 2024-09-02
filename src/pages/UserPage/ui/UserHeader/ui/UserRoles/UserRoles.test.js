import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserRoles from './UserRoles'; 
import { userReducer } from '../../../../../../entities/User';
import { fetchModalActions } from '../../../../../../entities/FetchModal';
import { useAppDispatch } from '../../../../../../shared/hooks/useAppDispatch';
import axios from '../../../../../../axios'
import { userMock,userAdminMock,userModeratorMock } from 'shared/tests';

jest.mock('axios', () => {
  const originalAxios = jest.requireActual('axios');

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
      };
      return instance;
    },
  };
});

jest.mock('../../../../../../shared/hooks/useAppDispatch');

const store = configureStore({
  reducer: { user: userReducer },
});

describe('UserRoles Component', () => {
  beforeEach(() => {
    useAppDispatch.mockReturnValue(jest.fn());
  });

  it('should not render roles menu when user is admin', () => {
    render(
      <Provider store={store}>
        <UserRoles userData={userAdminMock} />
      </Provider>
    );

    const rolesMenu = screen.queryByTestId('roles-menu');
    expect(rolesMenu).not.toBeInTheDocument();
  });

  it('should render roles menu when user is not admin', () => {
    render(
      <Provider store={store}>
        <UserRoles userData={userMock} />
      </Provider>
    );

    const rolesMenu = screen.getByTestId('roles-menu');
    expect(rolesMenu).toBeInTheDocument();
  });

  it('should display the "Выдать" button when the menu icon is clicked', async () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <Provider store={store}>
        <UserRoles userData={userMock} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('open-menu-icon'));

    await waitFor(() => {
      const assignButton = screen.getByText('Выдать');
      expect(assignButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Выдать'));

    expect(axios.post).toHaveBeenCalledWith(`/users/${userMock.id}/role/3/add`);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(fetchModalActions.showModal({
        type: 'good',
        content: 'Роль успешно выдана!',
      }));
    });
  });

  it('should display the "Забрать" button when the menu icon is clicked', async () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <Provider store={store}>
        <UserRoles userData={userModeratorMock} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('open-menu-icon'));

    await waitFor(() => {
      const assignButton = screen.getByText('Забрать');
      expect(assignButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Забрать'));

    expect(axios.post).toHaveBeenCalledWith(`/users/${userModeratorMock.id}/role/3/remove`);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(fetchModalActions.showModal({
        type: 'good',
        content: 'Роль успешно забрана!',
      }));
    });
  });
});
