import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import * as postService from '../../service/postService';
import styles from './PostDetails.module.css';
import heart from '../../img/heart.svg';
import heartFilled from '../../img/heartFilled.svg';
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
  const [likePost, setLikePost] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loggedUser,] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorContext);

  const handleLikePostClick = async () => {
    try {
      const response = await postService.likePost(post._id, loggedUser.id);
      await handleResponse(response);
      setLikePost(true);
      setLikesCount((prev) => prev + 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      const response = await postService.unLikePost(post._id, loggedUser.id);
      await handleResponse(response);
      setLikePost(false);
      setLikesCount((prev) => prev - 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPost(null);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    postService
      .getPostDetails(id)
      .then((res) => handleResponse(res))
      .then((post) => {
        setPost(post);
        setLikePost(post.likes.includes(loggedUser?.id));
        setLikesCount(post.likes.length);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card data-tesid = 'card' style={{ width: '60%', margin: '30px auto' }}>
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
            {loggedUser && (
              <div>
                <div>
                  <span>Likes {likesCount}</span>
                  {loggedUser.id !== post.owner && (
                    <>
                      {likePost && (
                        <img
                          onClick={handleUnlikeClick}
                          className={styles.cardIcon}
                          src={heartFilled}
                          alt="Filled Heart"
                        />
                      )}{' '}
                      {!likePost && (
                        <img
                          onClick={handleLikePostClick}
                          className={styles.cardIcon}
                          src={heart}
                          alt="Heart"
                        />
                      )}
                    </>
                  )}
                </div>
                {loggedUser.id === post.owner && (
                  <EditDeleteBtns
                    id={post._id}
                    item="post"
                    confirmTask={() => deletePost(post._id)}
                  />
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
