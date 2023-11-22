import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import * as userService from '../../service/userService';
import { handleResponse } from '../../utils/handleResponse';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserAvatar from '../UserAvatar/UserAvatar';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function Users() {
  const [loggedUser, setLoggedUer] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null)
  const [loading, setloading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShowModalClick = (id) => {
    setUserId(id)
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const deleteUser = async (id) => {
    await userService.deleteUser(id);
    setUsers(users.filter((user) => user._id !== id));
    setShowModal(false);
  };

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
        <Table style={{ margin: '30px auto' }} striped="columns">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {<UserAvatar id={user._id} userAvatar={user.userAvatar} />}
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {loggedUser.id !== user._id ? (
                    <Button
                      onClick={() => handleShowModalClick(user._id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2 style={{ textAlign: 'center' }}>There are no users</h2>
      )}
             {showModal && (
        <ConfirmModal
          item="user"
          show={showModal}
          confirmTask={() => deleteUser(userId)}
          handleClose={closeModal}
        />
      )}
    </>
  );
}
