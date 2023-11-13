import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as postService from '../../service/postService';
import styles from './PostDetails.module.css'
import heart from '../../img/heart.svg'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    postService
      .getPostDetails(id)
      .then((res) => {
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

  return (
    <Card style={{ width: '60%', margin: '30px auto' } }>
      <Card.Img variant="top" src={post.imageUrl} />
      <Card.Body>
        <Card.Title>Country: {post.country}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>City: {post.city}</ListGroup.Item>
        <ListGroup.Item>Cost: {post.cost} Euro</ListGroup.Item>
        <ListGroup.Item> {post.description}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <span>0</span> <img className={styles.cardIcon} src={heart} alt="Heart" />
      </Card.Body>
    </Card>
  );
}
