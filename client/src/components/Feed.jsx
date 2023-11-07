import Post from './Post';
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
        <Post key={post._id} country={post.country} postImgUrl={post.imageUrl} />
      ))}
    </>
  );
}
