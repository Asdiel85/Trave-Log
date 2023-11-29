import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import Navigation from './Navigation.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('testing navigation component', () => {
  const setLoggedUser = vi.fn();
  it('should render correctly without user', () => {
    const loggedUser = null;

    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>
          <Navigation />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(queryByTestId('avatar')).toBeNull();
    expect(getByTestId('login')).toBeTruthy();
    expect(getByTestId('register')).toBeTruthy();
  });

  it('should render correctly with logged user', () => {
    const loggedUser = {
      id: '1',
      isAdmin: true,
      avatar: 'image',
    };

    const {getByTestId, queryByTestId} = render(
      <BrowserRouter>
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>
          <Navigation />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(getByTestId('avatar')).toBeTruthy()
    expect(queryByTestId('login')).toBeNull();
    expect(queryByTestId('register')).toBeNull();
  });
});
