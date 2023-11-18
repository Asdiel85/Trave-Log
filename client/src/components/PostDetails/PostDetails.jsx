import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import * as postService from '../../service/postService';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { handleResponse } from '../../utils/handleResponse.js';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  useEffect(() => {
    postService
      .getPostDetails(id)
      .then((res) => handleResponse(res))
      .then((post) => {
        setPost(post);
        setLoading(false)
      })
      .catch((err) => {
        navigate('*');
      });
  }, [id]);

  return (
    <>
    {loading ? <LoadingSpinner /> :
    <Card style={{ width: '60%', margin: '30px auto' }}>
      <Card.Img variant="top" src={post.imageUrl} />
      <Card.Body>
        <Card.Title>
          <span>
            <UserAvatar userAvatar={post.userAvatar} />
          </span>{' '}
          Country: {post.country}
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>City: {post.city}</ListGroup.Item>
        <ListGroup.Item>Cost: {post.cost} Euro</ListGroup.Item>
        <ListGroup.Item> {post.description}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {loggedUser && loggedUser.id === post.owner ? (
          <EditDeleteBtns id={post.owner} />
        ) : null}
      </Card.Body>
    </Card>
        }
        </>
  );
}
