import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from './ErrorModal';


// Mock the useContext hook to provide a mock value for ErrorContext
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

// Mock react-bootstrap's Modal and Button components
jest.mock('react-bootstrap/Modal', () => ({ children, show, onHide }) => (
  <div data-testid="modal" style={{ display: show ? 'block' : 'none' }}>
    <div onClick={onHide}>Close</div>
    {children}
  </div>
));

jest.mock('react-bootstrap/Button', () => ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
));

describe('ErrorModal component', () => {
  test('renders modal with error message', () => {
    // Mock the value returned by useContext
    useContext.mockReturnValue(['Test error message', jest.fn()]);

    render(<ErrorModal />);

    // Check if the modal renders with the correct error message
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  test('closes modal when Close button is clicked', () => {
    // Mock the value returned by useContext
    const setErrorMessageMock = jest.fn();
    useContext.mockReturnValue(['Test error message', setErrorMessageMock]);

    render(<ErrorModal />);

    // Click the Close button
    fireEvent.click(screen.getByText('Close'));

    // Check if the setErrorMessage function is called
    expect(setErrorMessageMock).toHaveBeenCalledTimes(1);
    // Check if the setErrorMessage function is called with null (closing the modal)
    expect(setErrorMessageMock).toHaveBeenCalledWith(null);
  });

  test('does not render when no error message is provided', () => {
    // Mock the value returned by useContext with null error message
    useContext.mockReturnValue([null, jest.fn()]);

    render(<ErrorModal />);

    // Check if the modal is not rendered when no error message is provided
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
});
