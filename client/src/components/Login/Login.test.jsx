import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import ErrorProvider from '../../contexts/ErrorContext';
import AuthProvider from '../../contexts/AuthContext';
import * as userService from '../../service/userService';

describe('testing login component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorProvider>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorProvider>
      </BrowserRouter>
    );
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
    expect(getByTestId('submit')).toBeTruthy();
  });
  it('should show error messages when fields are empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorProvider>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorProvider>
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
        <ErrorProvider>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ErrorProvider>
      </BrowserRouter>
    );

    const spy = vi.spyOn(userService, 'login');

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
