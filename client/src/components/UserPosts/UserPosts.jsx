import * as userService from '../../service/userService.js';
import * as postsService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useEffect, useState, useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import PostCard from '../PostCard/PostCard.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';

export default function UserPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setErrorMessage] = useContext(ErrorContext);

  const deletePost = async (id) => {
    try {
      const response = await postsService.deletePost(id);
      await handleResponse(response);
      setPosts((posts) => posts.filter((post) => post._id !== id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    userService
      .getUserPosts(id)
      .then((response) => handleResponse(response))
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id]);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            {...post}
            confirmTask={() => deletePost(post._id)}
          />
        ))
      ) : (
        <h2 style={{ textAlign: 'center' }}>User has no posts</h2>
      )}
    </>
  );
}
