import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse.js';
import Button from 'react-bootstrap/esm/Button.js';
import UserPosts from '../UserPosts/UserPosts.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

export default function UserProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [showPosts, setShowPosts] = useState(false);
  const [, setErrorMessage] = useContext(ErrorContext)

  const hadnleShowPostsClick = (e) => {
    e.preventDefault();
    setShowPosts(!showPosts);
  };

  const deleteUser = async (id) => {
    try {
      const response = await userService.deleteUser(id)
      handleResponse(response)
      if(loggedUser.id === id) {
        setLoggedUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    userService
      .getOne(id)
      .then((response) => handleResponse(response))
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message)
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card data-testid = 'card' style={{ maxWidth: '500px', width: '100%', margin: '30px auto' }}>
          <Card.Img variant="top" src={user.userAvatar} />
          <Card.Body>
            <Card.Title>
              {user.firstName} {user.lastName}
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item data-testid = 'showPostsBtn' as={Button} onClick={hadnleShowPostsClick}>
              Show Posts
            </ListGroup.Item>
          </ListGroup>
          {loggedUser && loggedUser.id === user._id ? (
            <EditDeleteBtns id={user._id} item= "user" confirmTask={() =>deleteUser(user._id)}/>
          ) : null}
        </Card>
      )}
      {showPosts && <UserPosts id={user._id} />}
    </>
  );
}
