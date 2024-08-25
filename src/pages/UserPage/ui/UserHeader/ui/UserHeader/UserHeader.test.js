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
const mockUserData = {
  id: 1,
  nickname: 'vladika',
  fullName: 'vladika vip',
  karma: 1234,
  description: 'vlad test',
  rating: 5252,
  isSubscribed: true, // или false в зависимости от теста
  avatarUrl: 'https://example.com/avatar.jpg',
  roles: [{
    id: 1,
    value: "ADMIN",
    description: "ADMIN role"
  }]
};

jest.mock('../../../../../../shared/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn()
}));

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe('UserHeader Component', () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(selector => {
      if (selector === checkRolesAdmin) {
        return true; 
      }
      return {}; 
    });
  });

  it('should render user data correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserHeader userData={mockUserData} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('@vladika')).toBeInTheDocument();
    expect(screen.getByText('Карма')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('vlad test')).toBeInTheDocument();
    expect(screen.getByText('Полное имя - vladika vip')).toBeInTheDocument();
  });
});
