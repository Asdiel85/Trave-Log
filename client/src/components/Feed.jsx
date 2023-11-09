import PostCard from './PostCard';
import * as postService from '../service/postService';
import { useState, useEffect } from 'react';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService
      .getAllPosts()
      .then((result) => setPosts(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </>
  );
}
