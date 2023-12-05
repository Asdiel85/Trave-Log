import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";
import * as userService from "../../service/userService.js";
import { handleResponse } from "../../utils/handleResponse.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import {
  INITIAL_STATE,
  usersTableReducer,
} from "../../reducers/usersTableReducer.js";

export default function UsersTable() {
  const [loggedUser, setLoggedUer] = useContext(UserContext);
  const [state, dispatch] = useReducer(usersTableReducer, INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleShowModalClick = (id) => {
    dispatch({ type: "SET_USERID", payload: id });
    dispatch({ type: "SHOW_CONFIRM_MODAL" });
  };
  const closeModal = () => {
    dispatch({ type: "HIDE_CONFIRM_MODAL" });
  };

  const deleteUser = async (id) => {
    try {
      const responese = await userService.deleteUser(id);
      await handleResponse(responese);
      dispatch({
        type: "FETCH_USERS",
        payload: state.users.filter((user) => user._id !== id),
      });
      dispatch({ type: "HIDE_CONFIRM_MODAL" });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/error");
    }
  };

  useEffect(() => {
    userService
      .getUsers()
      .then((responese) => handleResponse(responese))
      .then((users) => {
        dispatch({ type: "FETCH_USERS", payload: users });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        navigate("/error");
      });
  }, []);
  return (
    <>
      {state.loading ? (
        <LoadingSpinner />
      ) : state.users.length > 0 ? (
        <Table style={{ margin: "30px auto" }} striped="columns">
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
            {state.users.map((user) => (
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
        <h2 style={{ textAlign: "center" }}>There are no users</h2>
      )}

      {state.showModal && (
        <ConfirmModal
          item="user"
          show={state.showModal}
          confirmTask={() => deleteUser(userId)}
          handleClose={closeModal}
        />
      )}
    </>
  );
}
