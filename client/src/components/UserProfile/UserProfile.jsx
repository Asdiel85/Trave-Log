import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse.js';
import Button from 'react-bootstrap/esm/Button.js';
import UserPosts from '../UserPosts/UserPosts.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';



export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [showPosts, setShowPosts] = useState(false)

  const hadnleShowPostsClick = (e) => {
    e.preventDefault();
    setShowPosts(!showPosts)
  }

useEffect(() => {
   userService.getOne(id)
   .then(response => handleResponse(response))
   .then(setUser)
   .catch(error => {
     navigate('/login')
    })
  },[id])
  
  return (
    <>
    <Card style={{'maxWidth':'500px', width: '100%', margin: '30px auto' }}>
    <Card.Img variant="top" src={user.userAvatar} />
    <Card.Body>
      <Card.Title>{user.firstName} {user.lastName}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Email: {user.email}</ListGroup.Item>
      <ListGroup.Item as={Button} onClick={hadnleShowPostsClick}>Show Posts</ListGroup.Item>
    </ListGroup>  
    {loggedUser &&
          loggedUser.id === user._id ? <EditDeleteBtns id={user._id} /> : null}
  </Card>
    {showPosts && <UserPosts id ={user._id}/>}
    </>
  );
}
