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
import { userMock,userAdminMock } from 'shared/tests';

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
          <UserHeader userData={userMock} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(`${userMock.karma}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`@${userMock?.nickname}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.fullName}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.description}`)).toBeInTheDocument();
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
        preloadedState: { user: { user: userMock } }
      })}>
        <BrowserRouter>
          <UserHeader userData={userMock} />
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
        preloadedState: { user: userAdminMock } 
      })}>
        <BrowserRouter>
          <UserHeader userData={userMock} />
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
        preloadedState: { user: userAdminMock } 
      })}>
        <BrowserRouter>
          <UserHeader userData={userAdminMock} />
        </BrowserRouter>
      </Provider>
    );

    const rolesMenuIcon = screen.queryByTestId('roles-menu');
    expect(rolesMenuIcon).not.toBeInTheDocument();
  });
});
