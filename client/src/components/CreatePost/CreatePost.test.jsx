import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { debug } from 'jest-preview';
import userEvent from '@testing-library/user-event'
import ErrorProvider from '../../contexts/ErrorContext.jsx';
import CreatePost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';
import * as postService from '../../service/postService';


jest.mock('../../service/postService')
postService.createPost = jest.fn();
const onSubmit = jest.fn();

test('renders CreatePost component', () => {
    render(
      <BrowserRouter>
        <ErrorProvider>
          <CreatePost />
        </ErrorProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    render(
      <BrowserRouter>
        <ErrorProvider>
          <CreatePost />
        </ErrorProvider>
      </BrowserRouter>
    );
      debug()
    const country = screen.getByTestId('country')
    const city = screen.getByTestId('city')
    const imageUrl = screen.getByTestId('imageUrl')
    const cost = screen.getByTestId('cost')
    const description = screen.getByTestId('description')

    userEvent.type(country, 'Usa')
    userEvent.type(city, 'New York')
    userEvent.type(imageUrl, 'https://media.timeout.com/images/105937857/750/562/image.jpg')
    userEvent.type(cost, '6983')
    userEvent.type(description, 'Portland is known for many things: its eccentric culture, its incredibly creative restaurants')
    
    const button = screen.getByTestId('create')
  
    // await act(async () => {
    //   // No need for extra Promise.resolve() here
    // });
  
    // // Ensure the correct mock function was called with the expected data
    // expect(jest.fn()).toHaveBeenCalledWith(
    //   'http://localhost:3000/posts/create', // Replace with your actual API endpoint
    //   expect.objectContaining({
    //     method: 'POST',
    //     headers: expect.objectContaining({
    //       'Content-type': 'application/json',
    //       'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU3OTU1MTI4NmVlNzFmNWNiZjBmZmYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDA4OTkxNjMsImV4cCI6MTcwMTA3MTk2M30.l1yFIPViWAUvHOBIygJYqj1eWl_GT48c0J_INC9SHLQ', // Use the mocked token
    //     }),
    //     body: JSON.stringify({
    //       country: 'USA',
    //       city: 'New York',
    //       imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
    //       cost: 6983,
    //       description: 'Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.',
    //     }),
    //   })
    // );
  
    userEvent.click(button)
     await waitFor(() => {
      expect(postService.createPost).toHaveBeenCalledTimes(1)
     })

  })


//   { country: 'USA',
//           city: 'New York',
//           imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
//           cost: 6983,
//           description: 'Portland is known for many things: its eccentric culture, its incredibly creative restaurants'
//   }