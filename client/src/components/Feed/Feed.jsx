import PostCard from '../PostCard/PostCard';
import * as postService from '../../service/postService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feed(confirmTask) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    postService
      .getAllPosts()
      .then((result) => setPosts(result))
      .catch((err) => navigate('*'));
  }, []);

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      navigate('*')
    }
  };

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          {...post}
          confirmTask={() => deletePost(post._id)}
        />
      ))}
    </>
  );
}
