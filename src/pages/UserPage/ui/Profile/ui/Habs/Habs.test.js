
import React from 'react'
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, } from 'react-router-dom';
import { renderWithProviders } from 'shared/tests/utils/test-utils';
import axios from '../../../../../../axios';
import { fetchModalActions } from '../../../../../../entities/FetchModal';
import { useAppDispatch } from '../../../../../../shared/hooks/useAppDispatch';
import Habs from './index';

jest.mock('../../../../../../axios', () => ({
  get: jest.fn(),
}));
jest.mock('../../../../../../shared/hooks/useAppDispatch');

describe('test Habs list', () => {
  beforeEach(() => {
    useAppDispatch.mockReturnValue(jest.fn());
  });

  it('test loading', () => {
    renderWithProviders(
      <Habs />
    )
    expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument()
  })

  it('displays habs list when data is available', async () => {
    const mockHabs = [
      { id: 1, title: 'Hab 1' },
      { id: 2, title: 'Hab 2' },
    ]
    axios.get.mockResolvedValueOnce({ data: mockHabs })

    renderWithProviders(
      <MemoryRouter initialEntries={['/user/1/profile/1']}>
        <Routes>
          <Route path="/user/:userId/:type/:subType?/:page" element={<Habs />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`/habs/user/1/subscribed-habs`);
    });
    expect(screen.getByText('Hab 1')).toBeInTheDocument();
    expect(screen.getByText('Hab 2')).toBeInTheDocument();
  })
  
  it('empty test when habs []', async () => {
    axios.get.mockResolvedValueOnce({ data: [] })

    renderWithProviders(
      <MemoryRouter initialEntries={['/user/1/profile/1']}>
        <Routes>
          <Route path="/user/:userId/:type/:subType?/:page" element={<Habs />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`/habs/user/1/subscribed-habs`);
    });
    expect(screen.getByText('Пользователь не состоит в хабах')).toBeInTheDocument();
  })

  it('show modal error', async () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    axios.get.mockRejectedValueOnce(new Error('API Error'))

    renderWithProviders(
      <MemoryRouter>
        <Habs />
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(fetchModalActions.showModal({
        type: 'bad',
        content: 'Ошибка, попробуйте еще раз!',
      }));
    });
  })
})