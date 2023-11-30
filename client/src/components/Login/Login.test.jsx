import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import ErrorProvider, { ErrorContext } from '../../contexts/ErrorContext';
import AuthProvider from '../../contexts/AuthContext';
import * as userService from '../../service/userService';

const setErrorMessage = jest.fn();
const errorMessage = ''

describe('testing login component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
    expect(getByTestId('submit')).toBeTruthy();
  });
  it('should show error messages when fields are empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(getByTestId('email'), {
      target: { value: '' },
    });
    fireEvent.change(getByTestId('password'), {
      target: { value: '' },
    });

    fireEvent.click(getByTestId('submit'));

    expect(getByTestId('error-email')).toBeTruthy();
    expect(getByTestId('error-password')).toBeTruthy();
  });
  it('should make correct api call with correct filled data', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );

    const spy = jest.spyOn(userService, 'login');

    fireEvent.change(getByTestId('email'), {
      target: { value: 'asdiel@abv.bg' },
    });
    fireEvent.change(getByTestId('password'), {
      target: { value: '11111' },
    });

    fireEvent.click(getByTestId('submit'));

    expect(spy).toHaveBeenCalledWith({
      email: 'asdiel@abv.bg',
      password: '11111',
    });
  });
});
