import PostCard from '../PostCard/PostCard';
import * as postService from '../../service/postService';
import { useState, useEffect } from 'react';

export default function Feed(confirmTask) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService
      .getAllPosts()
      .then((result) => setPosts(result))
      .catch((err) => console.log(err));
  }, []);

  const deletePost = async (id) =>  {
    await postService.deletePost(id)
    setPosts(posts.filter(post => post._id !== id))
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} confirmTask={() => deletePost(post._id)} />
      ))}
    </>
  );
}
