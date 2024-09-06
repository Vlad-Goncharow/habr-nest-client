import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { userMock } from 'shared/tests';
import { renderWithProviders } from 'shared/tests/utils/test-utils';
import { checkRolesAdmin } from '../../../../../../entities/User';
import { useAppSelector } from '../../../../../../shared/hooks/useAppSelector';
import UserHeader from './UserHeader';

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
    renderWithProviders(
      <BrowserRouter>
        <UserHeader userData={userMock} />
      </BrowserRouter>
    )

    expect(screen.getByText(`${userMock.karma}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`@${userMock?.nickname}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.fullName}`)).toBeInTheDocument();
    expect(screen.getByText(`${userMock.description}`)).toBeInTheDocument();
  })

  it('if user admin, show user-roles', () => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return true;
      }
      return {}; 
    });

    renderWithProviders(
      <BrowserRouter>
        <UserHeader userData={userMock} />
      </BrowserRouter>
    )

    const rolesMenuIcon = screen.queryByTestId('roles-menu');
    expect(rolesMenuIcon).toBeInTheDocument();
  });
});
