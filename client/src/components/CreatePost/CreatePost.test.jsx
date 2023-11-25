// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import ErrorProvider from '../../contexts/ErrorContext.jsx';
// import CreatePost from './CreatePost';
// import { BrowserRouter } from 'react-router-dom';
// import * as postService from '../../service/postService.js';
// import { handleResponse } from '../../utils/handleResponse.js';
// import { getToken } from '../../utils/auth';

// // Mock the handleResponse function
// jest.mock('../../utils/handleResponse.js');

// // Mock the postService module
// jest.mock('../../service/postService.js');

// jest.mock('../../utils/auth', () => ({
//   getToken: jest.fn(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU3OTU1MTI4NmVlNzFmNWNiZjBmZmYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDA4OTkxNjMsImV4cCI6MTcwMTA3MTk2M30.l1yFIPViWAUvHOBIygJYqj1eWl_GT48c0J_INC9SHLQ'),
// }));

// describe('CreatePost component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders CreatePost component', () => {
//     render(
//       <BrowserRouter>
//         <ErrorProvider>
//           <CreatePost />
//         </ErrorProvider>
//       </BrowserRouter>
//     );

//     expect(screen.getByText('Create Post')).toBeInTheDocument();
//   });

//   test('submits the form successfully', async () => {
//     // Mock fetch to resolve with an empty response
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({}),
//       })
//     );
  
//     render(
//       <BrowserRouter>
//         <ErrorProvider>
//           <CreatePost />
//         </ErrorProvider>
//       </BrowserRouter>
//     );
  
//     // Your provided fireEvent.change events...
  
//     fireEvent.click(screen.getByTestId('Create'));
  
//     await act(async () => {
//       // No need for extra Promise.resolve() here
//     });
  
//     // Ensure the correct mock function was called with the expected data
//     expect(jest.fn()).toHaveBeenCalledWith(
//       'http://localhost:3000/posts/create', // Replace with your actual API endpoint
//       expect.objectContaining({
//         method: 'POST',
//         headers: expect.objectContaining({
//           'Content-type': 'application/json',
//           'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU3OTU1MTI4NmVlNzFmNWNiZjBmZmYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDA4OTkxNjMsImV4cCI6MTcwMTA3MTk2M30.l1yFIPViWAUvHOBIygJYqj1eWl_GT48c0J_INC9SHLQ', // Use the mocked token
//         }),
//         body: JSON.stringify({
//           country: 'USA',
//           city: 'New York',
//           imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
//           cost: 6983,
//           description: 'Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.',
//         }),
//       })
//     );
  
//     // Ensure the mock handleResponse function was called
//     expect(handleResponse).toHaveBeenCalled();
//   });

//   test('handles form submission error', async () => {
//     // Mock postService.createPost to reject
//     postService.createPost.mockRejectedValueOnce(
//       new Error('Failed to create post')
//     );

//     render(
//       <BrowserRouter>
//         <ErrorProvider>
//           <CreatePost />
//         </ErrorProvider>
//       </BrowserRouter>
//     );

//     fireEvent.click(screen.getByTestId('Create'));

//     await act(async () => {
//       // No need for extra Promise.resolve() here
//     });

//     // Ensure postService.createPost was called
//     expect(postService.createPost).toHaveBeenCalled();

//     // Ensure the mock dispatch function was called with the correct payload
//     expect(handleResponse).toHaveBeenCalledWith({
//       type: 'SET_ERROR_MESSAGE',
//       payload: 'Failed to create post',
//     });
//   });

//   // test('validates form inputs and shows error messages', async () => {
//   //   jest
//   //     .spyOn(require('../../utils/validateForms.js'), 'validatePostValues')
//   //     .mockReturnValueOnce({
//   //       country: '',
//   //       city: 'City is required',
//   //       imageUrl: 'Image is required',
//   //       description: 'Description is required',
//   //     });

//   //   render(
//   //     <BrowserRouter>
//   //       <ErrorProvider>
//   //         <CreatePost />
//   //       </ErrorProvider>
//   //     </BrowserRouter>
//   //   );

//   //   fireEvent.click(screen.getByTestId('Create'));

//   //   // Ensure validatePostValues was called
//   //   expect(
//   //     require('../../utils/validateForms.js').validatePostValues
//   //   ).toHaveBeenCalled();

//   //   // Ensure error messages are displayed
//   //   expect(screen.getByTestId('error-country')).toBeInTheDocument();
//   //   expect(screen.getByTestId('error-city')).toBeInTheDocument();
//   //   expect(screen.getByTestId('error-imageUrl')).toBeInTheDocument();
//   //   expect(screen.getByTestId('error-description')).toBeInTheDocument();
//   // });
// });
