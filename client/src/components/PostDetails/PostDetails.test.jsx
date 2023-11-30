import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import {  BrowserRouter, MemoryRouter} from 'react-router-dom';
import Router from 'react-router';
import { describe, expect, it, vi } from 'vitest';
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

  it('should render component with the correct data',  async() => {
    global.fetch = vi.fn();
    const loggedUser = null;
    const setLoggedUser = vi.fn();
    const setErrorMessage = vi.fn();
    const errorMessage = '';
    const currentPost = post;
    const setPost = vi.fn();

    function createFetchResponse(data) {
      return { json: () => new Promise((resolve) => resolve(data)) };
    }

    fetch.mockResolvedValue(createFetchResponse(post));
   
    async () => { render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <PostDetails />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    
    const data =  await postService.getPostDetails(post._id);
   

    expect(screen.getByTestId('card')).toBeTruthy()
    }
  });
});
