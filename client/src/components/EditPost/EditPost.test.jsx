import React from 'react';
import Router from 'react-router';
import EditPost from './EditPost';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('testing edit post component', () => {
  jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
  }));
  
  global.fetch = jest.fn();

  function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) };
  }

  const post = {
    _id: '65579776286ee71f5cbf1021',
    userAvatar: 'https://i.ytimg.com/vi/IQ5TQn5gE7o/maxresdefault.jpg',
    country: 'Usa',
    city: 'Portland',
    imageUrl: 'https://media.timeout.com/images/105937857/750/562/image.jpg',
    cost: 6983,
    description:
      'Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.',
    likes: [],
    owner: '65579551286ee71f5cbf0fff',
    createdAt: '2023-11-17T16:40:22.748Z',
    updatedAt: '2023-11-17T16:40:22.748Z',
  };
  fetch.mockResolvedValue(createFetchResponse(post));
  it('it should render with the correct data', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({
      id: '65579776286ee71f5cbf1021',
    });
    (async () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      );
      expect(getByTestId('country').value).toEqual('Usa');
      expect(getByTestId('city').value).toEqual('Portland');
      expect(getByTestId('imageUrl').value).toEqual(
        'https://media.timeout.com/images/105937857/750/562/image.jpg'
      );
      expect(getByTestId('description').value).toEqual(
        'Portland is known for many things: its eccentric culture, its incredibly creative restaurants its theater and arts scene, and its outdoor beauty top the list of reasons to visit.'
      );
    });
  });
});
