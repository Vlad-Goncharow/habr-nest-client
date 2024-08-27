import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import { configureStore } from '@reduxjs/toolkit';
import UserHeader from './UserHeader'; 
import { userReducer } from '../../../../../../entities/User';
import { checkRolesAdmin } from '../../../../../../entities/User';
import { useAppSelector } from '../../../../../../shared/hooks/useAppSelector';
import '@testing-library/jest-dom';

const mockAdminUser = {
  id: 1,
  nickname: 'mockAdminUser',
  fullName: 'mockAdminUser mockAdminUser',
  karma: 1234,
  description: 'mockAdminUser mockAdminUser',
  rating: 5252,
  avatar: 'https://example.com/avatar.jpg',
  roles: [{
    id: 1,
    value: "ADMIN",
    description: "ADMIN role"
  }]
};

const mockUser = {
  id: 1,
  nickname: 'mockUser',
  fullName: 'mockUser mockUser',
  karma: 12342,
  description: 'mockUser mockUser',
  rating: 52522,
  isSubscribed: true, // или false в зависимости от теста
  avatar: 'https://example.com/avatar.jpg',
  roles: [{
    id: 2,
    value: "USER",
    description: "USER role"
  }]
};

jest.mock('../../../../../../shared/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn()
}));

describe('UserHeader Component', () => {
  beforeEach(() => {
    useAppSelector.mockReset(); // Reset mock before each test
  });

  it('show user data values', () => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return false;
      }
      return {};
    });

    render(
      <Provider store={configureStore({
        reducer: { user: userReducer },
      })}>
        <BrowserRouter>
          <UserHeader userData={mockUser} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(`${mockUser.karma}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser?.nickname}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.fullName}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.description}`)).toBeInTheDocument();
  })

  it('if user not admin, dont show user-roles', () => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return false;
      }
      return {}; 
    });

    render(
      <Provider store={configureStore({
        reducer: { user: userReducer },
        preloadedState: { user: { user: mockUser } }
      })}>
        <BrowserRouter>
          <UserHeader userData={mockUser} />
        </BrowserRouter>
      </Provider>
    );

    const rolesMenuIcon = screen.queryByTestId('roles-menu');
    expect(rolesMenuIcon).toBeNull();
  });

  it('if user admin, show user-roles', () => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return true;
      }
      return {}; 
    });

    render(
      <Provider store={configureStore({
        reducer: { user: userReducer },
        preloadedState: { user: mockAdminUser } 
      })}>
        <BrowserRouter>
          <UserHeader userData={mockUser} />
        </BrowserRouter>
      </Provider>
    );

    const rolesMenuIcon = screen.queryByTestId('roles-menu');
    expect(rolesMenuIcon).toBeInTheDocument();
  });

  it('hide user-roles if opened user has admin role', () => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return true;
      }
      return {}; 
    });

    render(
      <Provider store={configureStore({
        reducer: { user: userReducer },
        preloadedState: { user: mockAdminUser } 
      })}>
        <BrowserRouter>
          <UserHeader userData={mockAdminUser} />
        </BrowserRouter>
      </Provider>
    );

    const rolesMenuIcon = screen.queryByTestId('roles-menu');
    expect(rolesMenuIcon).not.toBeInTheDocument();
  });
});
