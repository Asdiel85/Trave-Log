// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

// import CreatePost from './CreatePost';

// jest.mock('../../service/postService.js', () => ({
//   createPost: jest.fn(),
// }));

// describe('CreatePost Component', () => {
//   it('displays error messages for invalid input in each field', async () => {
//     render(
//       <MemoryRouter>
//         <CreatePost />
//       </MemoryRouter>
//     );

//     // Submit form with invalid input
//     fireEvent.click(screen.getByTestId('create'));

//     // Wait for the asynchronous operation to complete
//     await waitFor(() => {
//       // Add assertions based on the expected behavior after a form submission with errors
//       // For example, check if error messages are displayed for each field
//       expect(screen.getByTestId('error-country')).toBeInTheDocument();
//       expect(screen.getByTestId('error-city')).toBeInTheDocument();
//       expect(screen.getByTestId('error-imageUrl')).toBeInTheDocument();
//       expect(screen.getByTestId('error-cost')).toBeInTheDocument();
//       expect(screen.getByTestId('error-description')).toBeInTheDocument();
//     });
//   });

//   it('does not display error messages for valid input', async () => {
//     render(
//       <MemoryRouter>
//         <CreatePost />
//       </MemoryRouter>
//     );

//     // Fill in the form with valid input
//     fireEvent.change(screen.getByTestId('country'), { target: { value: 'Valid Country' } });
//     fireEvent.change(screen.getByTestId('city'), { target: { value: 'Valid City' } });
//     fireEvent.change(screen.getByTestId('imageUrl'), { target: { value: 'Valid Image URL' } });
//     fireEvent.change(screen.getByTestId('cost'), { target: { value: '10' } });
//     fireEvent.change(screen.getByTestId('description'), { target: { value: 'Valid Description' } });

//     // Submit form
//     fireEvent.click(screen.getByTestId('create'));

//     // Wait for the asynchronous operation to complete
//     await waitFor(() => {
//       // Add assertions based on the expected behavior after a successful form submission
//       // For example, check if error messages are NOT displayed
//       expect(screen.queryByTestId('error-country')).not.toBeInTheDocument();
//       expect(screen.queryByTestId('error-city')).not.toBeInTheDocument();
//       expect(screen.queryByTestId('error-imageUrl')).not.toBeInTheDocument();
//       expect(screen.queryByTestId('error-cost')).not.toBeInTheDocument();
//       expect(screen.queryByTestId('error-description')).not.toBeInTheDocument();
//     });
//   });
// });
