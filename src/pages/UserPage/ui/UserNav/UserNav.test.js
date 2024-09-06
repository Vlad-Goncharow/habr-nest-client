import React from 'react';
import UserNav from "./UserNav"
import { screen,fireEvent } from "@testing-library/react"
import { renderWithProviders } from 'shared/tests/utils/test-utils';
import {
  MemoryRouter,
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

describe('test UserNav', () => {
  it('test user nav links', () => {
    renderWithProviders(
      <BrowserRouter >
        <UserNav />
      </BrowserRouter>
    )

    expect(screen.getByText('Профиль')).toBeInTheDocument();
    expect(screen.getByText('Публикации')).toBeInTheDocument();
    expect(screen.getByText('Коментарии')).toBeInTheDocument();
    expect(screen.getByText('Закладки')).toBeInTheDocument();
    expect(screen.getByText('Подписчики')).toBeInTheDocument();
    expect(screen.getByText('Подписки')).toBeInTheDocument();
  })
  
  it('test publications events',async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/user/1/publications/articles/1']}>
        <Routes>
          <Route path="/user/:userId/:type/:subType/:page" element={<UserNav />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('publications-click-item'));

    const subcategoryItems = screen.getAllByRole('subcategory-publications');
    expect(subcategoryItems.some(item => item.textContent === 'Статьи')).toBe(true);
    expect(subcategoryItems.some(item => item.textContent === 'Посты')).toBe(true);
    expect(subcategoryItems.some(item => item.textContent === 'Новости')).toBe(true);
  })

  it('test favorites events',async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/user/1/favorites/articles/1']}>
        <Routes>
          <Route path="/user/:userId/:type/:subType/:page" element={<UserNav />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('favorites-click-item'));

    const subcategoryItems = screen.getAllByRole('subcategory-favorites');
    expect(subcategoryItems.some(item => item.textContent === 'Статьи')).toBe(true);
    expect(subcategoryItems.some(item => item.textContent === 'Посты')).toBe(true);
    expect(subcategoryItems.some(item => item.textContent === 'Новости')).toBe(true);
    expect(subcategoryItems.some(item => item.textContent === 'Коментарии')).toBe(true);
  })
})