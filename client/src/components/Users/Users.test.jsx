import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import * as userService from '../../service/userService';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import Users from './Users.jsx';

const users = [ {
    "_id": "65579551286ee71f5cbf0fff",
    "userAvatar": "https://i.ytimg.com/vi/IQ5TQn5gE7o/maxresdefault.jpg",
    "firstName": "Martin",
    "lastName": "Hristov",
    "email": "asdiel@abv.bg",
    "password": "$2b$10$0NPrdN1xCcTK1PQ56aB1zuLxfjFfhNIrdNx3KFWz8p95usGwaHOh.",
    "isAdmin": true,
    "createdAt": "2023-11-17T16:31:13.131+00:00",
    "updatedAt": "2023-11-20T13:21:11.349+00:00",
    "__v": 0
  },
  {
    "_id": "655795a5286ee71f5cbf100e",
    "userAvatar": "https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Co…",
    "firstName": "Martina",
    "lastName": "Hristova",
    "email": "asdiel6111@abv.bg",
    "password": "$2b$10$5U1eoKrLlYBIwgLx9pxaPu5KGJ2dIZS8oFJLZq6L5oj1drww0hHNW",
    "isAdmin": true,
    "createdAt": "2023-11-17T16:32:37.501+00:00",
    "updatedAt": "2023-11-21T15:00:42.098+00:00",
    "__v": 0
  },]

describe('testing users component', () => {
  const loggedUser = 'Pesho';
  const setLoggedUser = vi.fn();
  const errorMessage = '';
  const setErrorMessage = vi.fn();

  it('should render users data correctly', async () => {
    vi.spyOn(userService, 'getUsers').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(users)
    })
    const { getByText } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <Users />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
        expect(getByText('asdiel@abv.bg')).toBeTruthy();
        expect(getByText('asdiel6111@abv.bg')).toBeTruthy();
    })
  });
});
