import * as userService from '../../service/userService.js';
import * as postsService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../PostCard/PostCard.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';

export default function UserPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const deletePost = async (id) => {
    try {
      await postsService.deletePost(id);
      setPosts((posts) => posts.filter((post) => post._id !== id));
    } catch (error) {
      navigate('*');
    }
  };

  useEffect(() => {
    userService
      .getUserPosts(id)
      .then((response) => handleResponse(response))
      .then((posts) => {
        setPosts(posts);
        setLoading(false)
      })
      .catch((error) => navigate('/login'));
  }, [id]);
  return (
    <>
      {loading ? <LoadingSpinner />:
      posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            {...post}
            confirmTask={() => deletePost(post._id)}
          />
        ))
      ) : (
        <h2 style={{ textAlign: 'center' }}>User has no posts</h2>
      )
}
    </>
  );
}
