import React from 'react';
import {  render } from '@testing-library/react';
import {  MemoryRouter} from 'react-router-dom';
import Router from 'react-router';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import PostDetails from './PostDetails.jsx';
import * as postService from '../../service/postService.js';



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

describe('testing post details component',  () => {
  jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
  }));
  
  it('should render component with the correct data',  async() => {
    const spy = jest.spyOn(postService, 'getPostDetails');
    const loggedUser = null;
    const setLoggedUser = jest.fn();
    const setErrorMessage = jest.fn();
    const errorMessage = '';
    const currentPost = post;
    const setPost = jest.fn();

    jest.spyOn(Router, 'useParams').mockReturnValue({
      id: '65579776286ee71f5cbf1021',
    });
    jest.spyOn(React, 'useEffect').mockReturnValue(post);
    jest.spyOn(React, 'useState').mockReturnValueOnce([currentPost, setPost])


   const {getByTestId} = render(
      <MemoryRouter initialEntries={[`/post-details/${post._id}`]}>   
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>          
            <PostDetails/>
          </UserContext.Provider>
        </ErrorContext.Provider>
      </MemoryRouter>
    );

      expect(getByTestId('card')).toBeTruthy()

  });
});
