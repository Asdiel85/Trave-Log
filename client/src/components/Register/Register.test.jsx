import { describe, expect, it, vi } from 'vitest';
import * as userService from '../../service/userService';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext';
import { fireEvent, render } from '@testing-library/react';

describe('testing register page', () => {
  const setErrorMessage = vi.fn();
  const errorMessage = null;
  it('should render with empty fields', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <Register />
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    expect(getByTestId('firstName')).toBeTruthy();
    expect(getByTestId('lastName')).toBeTruthy();
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('userAvatar')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
    expect(getByTestId('repeatPassword')).toBeTruthy();
  });
  it('should show error paragraphs if fields filled incorectly', () => {
    const { getByTestId } = render(
        <BrowserRouter>
          <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
            <Register />
          </ErrorContext.Provider>
        </BrowserRouter>
      );
      fireEvent.change(getByTestId('firstName'), {
        target: { value: '' },
      });
      fireEvent.change(getByTestId('lastName'), {
        target: { value: '' },
      });
      fireEvent.change(getByTestId('email'), {
        target: { value: '' },
      });
      fireEvent.change(getByTestId('userAvatar'), { target: { value: '0' } });
      fireEvent.change(getByTestId('password'), {
        target: { value: '' },
      });
      fireEvent.change(getByTestId('repeatPassword'), {
        target: { value: '' },
      });
  
      fireEvent.click(getByTestId('register'));

    expect(getByTestId('error-firstName')).toBeTruthy();
    expect(getByTestId('error-lastName')).toBeTruthy();
    expect(getByTestId('error-email')).toBeTruthy();
    expect(getByTestId('error-userAvatar')).toBeTruthy();
    expect(getByTestId('error-password')).toBeTruthy();
  })
  it('should api call when data is filled correctly', async () => {
    const spy = vi.spyOn(userService, 'register');

    const { getByTestId } = render(
        <BrowserRouter>
          <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
            <Register />
          </ErrorContext.Provider>
        </BrowserRouter>
      );
      fireEvent.change(getByTestId('firstName'), {
        target: { value: 'Martin' },
      });
      fireEvent.change(getByTestId('lastName'), {
        target: { value: 'Hristov' },
      });
      fireEvent.change(getByTestId('email'), {
        target: { value: 'asdiel@abv.bg' },
      });
      fireEvent.change(getByTestId('userAvatar'), { target: { value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…' } });
      fireEvent.change(getByTestId('password'), {
        target: { value: '11111' },
      });
      fireEvent.change(getByTestId('repeatPassword'), {
        target: { value: '11111' },
      });
  
      fireEvent.click(getByTestId('register'));

      await expect(spy).toHaveBeenCalledWith({
        firstName: 'Martin',
        lastName: 'Hristov',
        userAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lj6Uv0ddAQ8LHb…',
        email: 'asdiel@abv.bg',
        password: '11111',
        repeatPassword: '11111'
      });
  })
});
