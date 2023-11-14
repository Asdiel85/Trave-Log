import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import * as postService from '../../service/postService';
import styles from './PostDetails.module.css';
import heart from '../../img/heart.svg';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useContext(UserContext);
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
    <Card style={{ width: '60%', margin: '30px auto' }}>
      <Card.Img variant="top" src={post.imageUrl} />
      <Card.Body>
        <Card.Title><span><UserAvatar userAvatar={post.userAvatar} /></span> Country: {post.country}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>City: {post.city}</ListGroup.Item>
        <ListGroup.Item>Cost: {post.cost} Euro</ListGroup.Item>
        <ListGroup.Item> {post.description}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      {loggedUser ? (
        <div className={styles.interaction}>
          <div>
          <span>0</span>
          {loggedUser.id !== post.owner ? (
            <>
              <img className={styles.cardIcon} src={heart} alt="Heart" />
            </>
          ) : null}
          </div>
          {loggedUser.id === post.owner ? <EditDeleteBtns /> : null}
        </div>
      ) : null}
      </Card.Body>
    </Card>
  );
}
