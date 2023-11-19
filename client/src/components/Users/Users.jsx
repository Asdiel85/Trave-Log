import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserAvatar from '../UserAvatar/UserAvatar';
import { Button } from 'bootstrap';
import UserProfile from '../UserProfile/UserProfile';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    userService
      .getUsers()
      .then((responese) => handleResponse(responese))
      .then((users) => {
        setUsers(users);
        setloading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : users.length > 0 ? (
        <Table style={{margin: '30px auto'}} striped="columns">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead><tbody>
        {users.map((user) => <tr key={user._id}>
            <td>{<UserAvatar id={user._id} userAvatar={user.userAvatar} />}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
        </tr>)}
        </tbody>
        </Table>
      ) : <h2 style={{ textAlign: 'center' }}>There are no users</h2>}
    </>
  );
}
