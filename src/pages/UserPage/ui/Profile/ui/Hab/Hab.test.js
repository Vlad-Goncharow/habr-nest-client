import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userMock } from 'shared/tests';
import { renderWithProviders } from 'shared/tests/utils/test-utils';
import { useAppSelector } from '../../../../../../shared/hooks/useAppSelector';
import Hab from './index';

const userHabsMock = {
  ...userMock,
  habSubscribers: [
    { 
      id: 1,
      title:'mock title 1'
    },{ 
      id: 2,
      title:'mock title 2'
    }
  ],
};

jest.mock('../../../../../../shared/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

describe('Hab Component', () => {
  beforeEach(() => {
    useAppSelector.mockReturnValue({user:userHabsMock});
  });

  it('check active title if user subscribe to same hab', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Hab habData={{id:1,title:'mock title 1'}} />
      </MemoryRouter>
    )
    const hab = screen.getByText('mock title 1')
    
    expect(hab).toHaveClass('title title_active'); 
  });

  it('renders without crashing', () => {
    renderWithProviders(
      <MemoryRouter>
        <Hab habData={{id:1,title:'mock title 4'}} />
      </MemoryRouter>
    )

    expect(screen.getByText('mock title 4')).toBeInTheDocument();
  });
});
