import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ErrorContext } from '../../contexts/ErrorContext';
import CreatePost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';

// Mock data and functions
const defaultState = {}; // Adjust based on your context state
const mockedDispatch = jest.fn(); // Adjust based on your context dispatch function

const mockedPostService = {
  createPost: jest.fn(),
};

const mockedHandleResponse = jest.fn();

jest.mock('../../service/postService.js', () => ({
  __esModule: true,
  ...mockedPostService,
}));

jest.mock('../../utils/handleResponse.js', () => ({
  __esModule: true,
  handleResponse: mockedHandleResponse,
}));

// Adjust the useForm mock based on your actual useForm implementation
jest.mock('../../hooks/useForm.jsx', () => ({
  __esModule: true,
  default: () => ({
    formValues: {
      country: '',
      city: '',
      imageUrl: '',
      cost: 0,
      description: '',
    },
    onChangeHandler: jest.fn(),
  }),
}));

// Mock validation function
jest.mock('../../utils/validateForms.js', () => ({
  __esModule: true,
  validatePostValues: jest.fn(() => ({})),
}));

describe('CreatePost component', () => {
  beforeEach(() => {
    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  test('renders CreatePost component', () => {
    render(
      <BrowserRouter>
      <ErrorContext.Provider value={[defaultState, mockedDispatch]}>
        <CreatePost />
      </ErrorContext.Provider>
      </BrowserRouter>
    );

    // Your test assertions go here
    expect(screen.getByText('Create Post')).toBeInTheDocument();
    // Add more assertions based on your component structure
  });

  test('submits the form successfully', async () => {
    // Mock successful post creation
    mockedPostService.createPost.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
      <ErrorContext.Provider value={[defaultState, mockedDispatch]}>
        <CreatePost />
      </ErrorContext.Provider>
      </BrowserRouter>
    );

    // Simulate form input
    fireEvent.change(screen.getByTestId('country'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'New York' } });
    // ... simulate input for other fields

    // Trigger form submission
    fireEvent.click(screen.getByTestId('Create'));

    // Ensure that the postService.createPost is called
    await act(async () => {
      await Promise.resolve();
    });
    expect(mockedPostService.createPost).toHaveBeenCalledWith({
      country: 'USA',
      city: 'New York',
      imageUrl: '',
      cost: 0,
      description: '',
    });

    // Ensure that handleResponse is called
    expect(mockedHandleResponse).toHaveBeenCalled();
  });

  test('handles form submission error', async () => {
    // Mock post creation error
    mockedPostService.createPost.mockRejectedValueOnce(new Error('Failed to create post'));

    render(
      <BrowserRouter>
      <ErrorContext.Provider value={[defaultState, mockedDispatch]}>
        <CreatePost />
      </ErrorContext.Provider>
      </BrowserRouter>
    );

    // Trigger form submission
    fireEvent.click(screen.getByTestId('Create'));

    // Ensure that the postService.createPost is called
    await act(async () => {
      await Promise.resolve();
    });
    expect(mockedPostService.createPost).toHaveBeenCalled();

    // Ensure that setErrorMessage is called with the correct error message
    expect(mockedDispatch).toHaveBeenCalledWith({ type: 'SET_ERROR_MESSAGE', payload: 'Failed to create post' });
  });

  test('validates form inputs and shows error messages', async () => {
    // Mock validation errors
    jest.spyOn(require('../../utils/validateForms.js'), 'validatePostValues').mockReturnValueOnce({
      country: 'Country is required',
      city: 'City is required',
      // ... other validation errors
    });

    render(
      <BrowserRouter>
      <ErrorContext.Provider value={[defaultState, mockedDispatch]}>
        <CreatePost />
      </ErrorContext.Provider>
      </BrowserRouter>
    );

    // Trigger form submission
    fireEvent.click(screen.getByTestId('Create'));

    // Ensure that validatePostValues is called
    expect(require('../../utils/validateForms.js').validatePostValues).toHaveBeenCalled();

    // Ensure that error messages are displayed
    expect(screen.getByTestId('error-country')).toBeInTheDocument();
    expect(screen.getByTestId('error-city')).toBeInTheDocument();
    // ... assert other error messages
  });

  // Add more tests as needed
});
