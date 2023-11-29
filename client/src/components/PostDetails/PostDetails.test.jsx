import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import PostDetails from './PostDetails.jsx';

describe('testing post details component', () => {
  it('should render component with the correct data', () => {
    const loggedUser = 'Pesho';
    const setLoggedUser = vi.fn()
    const setErrorMessage = vi.fn()
    const errorMessage = '';
   const id = '65579776286ee71f5cbf1021'
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[id]}>
        <ErrorContext.Provider value={[errorMessage ,setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <PostDetails />
          </UserContext.Provider>
        </ErrorContext.Provider>
        </MemoryRouter> 
    );
   waitFor(() => {
    expect(getByTestId('card')).toBeTruthy()
   }) 
  }); 
});
