import { fireEvent, render, waitFor } from '@testing-library/react';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import Post from './PostCard.jsx';
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

describe('Testing post card component', () => {
  const setErrorMessage = jest.fn();

  it('should render post correctly', () => {
    const loggedUser = null;
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser]}>
            <Post
              userAvatar={post.userAvatar}
              country={post.country}
              imageUrl={post.imageUrl}
              _id={post._id}
              owner={post.owner}
              confirmTask={jest.fn()}
              liked={false}
              likes={post.likes}
            />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    expect(getByTestId('postCard')).toBeTruthy();
    expect(queryByTestId('interaction')).toBeNull();
  });
  it('should render properly with logged user', () => {
    const loggedUser = 'Pesho';
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser]}>
            <Post
              userAvatar={post.userAvatar}
              country={post.country}
              imageUrl={post.imageUrl}
              _id={post._id}
              owner={post.owner}
              confirmTask={jest.fn()}
              liked={false}
              likes={post.likes}
            />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );
    expect(getByTestId('postCard')).toBeTruthy();
    expect(getByTestId('interaction')).toBeTruthy();
    expect(getByTestId('likePost')).toBeTruthy();
    expect(queryByTestId('unLikePost')).toBeNull();
  });
  it('should show if liked or not correctly', async () => {
    const loggedUser = { email: 'Pesho', id: '1' };
    const { getByTestId } = render(
      <BrowserRouter>
        <ErrorContext.Provider value={[, setErrorMessage]}>
          <UserContext.Provider value={[loggedUser]}>
            <Post
              userAvatar={post.userAvatar}
              country={post.country}
              imageUrl={post.imageUrl}
              _id={post._id}
              owner={post.owner}
              confirmTask={jest.fn()}
              liked={false}
              likes={post.likes}
            />
          </UserContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    );

    const spy = jest.spyOn(postService, 'likePost');

    fireEvent.click(getByTestId('likePost'));
    expect(spy).toHaveBeenCalledWith(post._id, '1'); 
        expect(getByTestId('unLikePost')).toBeTruthy();
  });
});
