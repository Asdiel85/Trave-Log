import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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

describe('testing post details component', () => {
  it('should render component with the correct data', async ({expect}) => {
  const request =  vi.spyOn(postService, 'getPostDetails').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(post),
    });
    const loggedUser = null;
    const setLoggedUser = vi.fn();
    const setErrorMessage = vi.fn();
    const errorMessage = '';

    render(
      <BrowserRouter>
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <PostDetails />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );

  
      expect(request).toHaveBeenCalled()
    
  });
});
