import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse';
import Interaction from '../Interaction/Interaction.jsx';


export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

useEffect(() => {
   userService.getOne(id)
   .then(response => handleResponse(response))
   .then(setUser)
   .catch(error => {
    navigate('*')
   })
},[id])
   
  return (
    <Card style={{'max-width':'500px', width: '100%', margin: '30px auto' }}>
    <Card.Img variant="top" src={user.userAvatar} />
    <Card.Body>
      <Card.Title>{user.firstName} {user.lastName}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Email: {user.email}</ListGroup.Item>
      <ListGroup.Item>Posts: </ListGroup.Item>
    </ListGroup>  
        <Interaction id={user._id} />
  </Card>
  );
}
