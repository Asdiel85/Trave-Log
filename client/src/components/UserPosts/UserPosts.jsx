import * as userService from '../../service/userService.js';
import handleResponse from '../../utils/handleResponse.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard/PostCard';
export default function UserPosts(id) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserPosts(id)
      .then((response) => handleResponse(response))
      .then(setPosts)
      .catch((error) => {
        navigate('/login');
      });
  }, [id]);
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </>
  );
}
