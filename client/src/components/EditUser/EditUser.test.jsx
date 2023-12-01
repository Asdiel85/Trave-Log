import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL, USERS,  } from '../../utils/constants.js';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditUser from './EditUser';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import * as userService from '../../service/userService.js'
import { handleResponse } from '../../utils/handleResponse.js';

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

describe('testing edit user component', () => {
  it('shoul render with correct data', async () => {

    jest.spyOn(userService, 'getOne').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(user)
    })
    
    const token = 'token';
    const setLoggedUser = jest.fn();
    
    const loggedUser = {
      _id: '655795e0286ee71f5cbf1014'
    }
    const setErrorMessage = jest.fn();
    const errorMessage = '';
    
    render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <EditUser />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    )
    
      await waitFor(() => {
        expect(screen.getByTestId('firstName').value).toEqual('Martina');
        expect(screen.getByTestId('lastName').value).toEqual('Hristova');
        expect(screen.getByTestId('email').value).toEqual('asdiel4@abv.bg');
        expect(screen.getByTestId('password').value).toEqual(
          '$2b$10$T0lL5K.4HGj7R5ar5BNjQOtho/Kb8HRSjqmA6Z5AqMZ/DdHmqWh1S'
        );
        expect(screen.getByTestId('repeatPassword').value).toEqual('');   
      })
     
  });
});
