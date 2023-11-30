import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CreatePost from './CreatePost';
import * as postService from '../../service/postService';
import { screen, render } from '@testing-library/react';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

describe('Testing create post component', () => {
  const setErrorMessage = jest.fn();
  const errorMessage = '';
  it('should render properly', () => {
    render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <CreatePost />
        </ErrorContext.Provider>
       </BrowserRouter>
    );
    expect(screen.getByText('Create Post')).toBeTruthy();
    expect(screen.getByTestId('country')).toBeTruthy();
    expect(screen.getByTestId('city')).toBeTruthy();
    expect(screen.getByTestId('imageUrl')).toBeTruthy();
    expect(screen.getByTestId('cost')).toBeTruthy();
    expect(screen.getByTestId('description')).toBeTruthy();
    expect(screen.getByTestId('create')).toBeTruthy();
  });

  // it('should show error paragraph if data is filled incorectly', async () => {
  //   render(
  //     <BrowserRouter>
  //       <ErrorContext.Provider value="message">
  //         <CreatePost />
  //       </ErrorContext.Provider>
  //     </BrowserRouter>
  //   );

  //   fireEvent.change(getByTestId('country'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.change(getByTestId('city'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.change(getByTestId('imageUrl'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.change(getByTestId('cost'), { target: { value: '0' } });
  //   fireEvent.change(getByTestId('description'), {
  //     target: { value: '' },
  //   });

  //   fireEvent.click(getByTestId('create'));

  //   expect(getByTestId('error-country')).toBeTruthy();
  //   expect(getByTestId('error-city')).toBeTruthy();
  //   expect(getByTestId('error-imageUrl')).toBeTruthy();
  //   expect(getByTestId('error-cost')).toBeTruthy();
  //   expect(getByTestId('error-description')).toBeTruthy();
  // });
  // it('should make api call when data filled correctly', async () => {
  //   const spy = jest.spyOn(postService, 'createPost');
  //   const errorMessage = null;

  //   render(
  //     <BrowserRouter>
  //       <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
  //         <CreatePost />
  //       </ErrorContext.Provider>
  //     </BrowserRouter>
  //   );

  //   fireEvent.change(getByTestId('country'), {
  //     target: { value: 'Usa' },
  //   });
  //   fireEvent.change(getByTestId('city'), {
  //     target: { value: 'Portland' },
  //   });
  //   fireEvent.change(getByTestId('imageUrl'), {
  //     target: {
  //       value: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
  //       cost: '6983',
  //     },
  //   });
  //   fireEvent.change(getByTestId('cost'), { target: { value: '6983' } });
  //   fireEvent.change(getByTestId('description'), {
  //     target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
  //   });

  //   fireEvent.click(getByTestId('create'));
  //   await expect(spy).toHaveBeenCalledWith({
  //     country: 'Usa',
  //     city: 'Portland',
  //     imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
  //     cost: '6983',
  //     description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  //   });
  // });
});
