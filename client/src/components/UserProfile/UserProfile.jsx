import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse.js';
import Button from 'react-bootstrap/esm/Button.js';
import UserPosts from '../UserPosts/UserPosts.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { INITIAL_STATE, userProfileReducer } from '../../reducers/userProfileReducer.js';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(userProfileReducer, INITIAL_STATE)
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorContext)

  const hadnleShowPostsClick = (e) => {
    e.preventDefault();
    dispatch({type: "HANDLE_POSTS", payload: state.showPosts})
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
      navigate('/error')
    }
  }

  useEffect(() => {
    userService
      .getOne(id)
      .then((response) => handleResponse(response))
      .then((user) => {
        dispatch({type: "FETCH_USER", payload: user})
      })
      .catch((error) => {
        setErrorMessage(error.message)
        navigate('/error')
      });
  }, [id]);

  return (
    <>
      {state.loading ? (
        <LoadingSpinner />
      ) : (
        <Card data-testid = 'card' style={{ maxWidth: '500px', width: '100%', margin: '30px auto' }}>
          <Card.Img variant="top" src={state.user.userAvatar} />
          <Card.Body>
            <Card.Title>
              {state.user.firstName} {state.user.lastName}
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {state.user.email}</ListGroup.Item>
            <ListGroup.Item data-testid = 'showPostsBtn' as={Button} onClick={hadnleShowPostsClick}>
              Show Posts
            </ListGroup.Item>
          </ListGroup>
          {loggedUser && loggedUser.id === state.user._id ? (
            <EditDeleteBtns id={state.user._id} item= "user" confirmTask={() =>deleteUser(state.user._id)}/>
          ) : null}
        </Card>
      )}
      {state.showPosts && <UserPosts id={state.user._id} />}
    </>
  );
}
