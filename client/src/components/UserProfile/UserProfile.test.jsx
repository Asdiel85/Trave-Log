import { afterEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import * as userService from '../../service/userService';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import UserProfile from './UserProfile.jsx';

const user = {
  _id: '655795e0286ee71f5cbf1014',
  userAvatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…',
  firstName: 'Martina',
  lastName: 'Hristova',
  email: 'asdiel4@abv.bg',
  password: '$2b$10$T0lL5K.4HGj7R5ar5BNjQOtho/Kb8HRSjqmA6Z5AqMZ/DdHmqWh1S',
  isAdmin: false,
  createdAt: '2023-11-17T16:33:36.929+00:00',
  updatedAt: '2023-11-17T16:33:36.929+00:00',
  __v: 0,
};

const posts = [ {
  "_id": "65649b1b2834ac660cf7c8cf",
  "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…",
  "country": "Usa",
  "city": "Boston",
  "imageUrl": "https://media.timeout.com/images/105937857/750/562/image.jpg",
  "cost": 22232,
  "description": "sdasdDSFASDFASDFASDFASDFASFASDFASDF",
  "likes": [],
  "owner": "655795e0286ee71f5cbf1014",
  "createdAt": "2023-11-27T13:35:23.777+00:00",
  "updatedAt": "2023-11-28T12:50:34.458+00:00",
  "__v": 0
},
{
  "_id": "6564d2a82834ac660cf7c947",
  "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…",
  "country": "UsaEdit",
  "city": "Boston",
  "imageUrl": "https://media.timeout.com/images/105483065/750/562/image.jpg",
  "cost": 2222,
  "description": "dadasdasdasdasdsddsadas",
  "likes": [],
  "owner": "655795e0286ee71f5cbf1014",
  "createdAt": "2023-11-27T17:32:24.109+00:00",
  "updatedAt": "2023-11-28T12:50:34.458+00:00",
  "__v": 0
}]

describe('testing user profile component', () => {
  
  afterEach(() => {
    vi.clearAllMocks() 
  })

  const loggedUser = 'Pesho';
  const setLoggedUser = vi.fn();
  const errorMessage = '';
  const setErrorMessage = vi.fn();

  it('should render properly', async () => {
    vi.spyOn(userService, 'getOne').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(user),
    });
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <UserProfile />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(getByText('Email: asdiel4@abv.bg')).toBeTruthy();
      expect(getByText('Martina Hristova')).toBeTruthy();
      expect(getByTestId('showPostsBtn')).toBeTruthy();
    });
  });
});
