import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as postService from '../service/postService';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    postService.getPostDetails(id)
    .then(res => {
        if (!res.ok) {
            throw new Error('Not found');
        }

        return res.json();
    })
    .then(setPost)
    .catch((err) => {
        navigate('*');
    });
  }, [id]);

  return <h2>{post._id}</h2>;
}
