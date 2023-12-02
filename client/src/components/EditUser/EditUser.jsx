import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import UserForm from '../UserForm/UserForm.jsx';
import { useForm } from '../../hooks/useForm.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loggedUser, setLoggedUer] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [, setErrorMessage] = useContext(ErrorContext);

  useEffect(() => {
    userService
      .getOne(id)
      .then((response) => handleResponse(response))
      .then((user) => {
        setFormValues(user);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id]);

  const {
    formValues,
    setFormValues,
    onChangeHandler,
    handleSubmit,
    errors,
    submitting,
  } = useForm({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      userService
        .editUser(id, formValues)
        .then((response) => handleResponse(response))
        .then(() => {
          loggedUser.avatar = formValues.userAvatar;
          loggedUser.isAdmin = formValues.isAdmin;
          setLoggedUer(loggedUser);
          localStorage.setItem('user', JSON.stringify(loggedUser));
          navigate(`/user/${id}/details`);
        })
        .catch((error) => {
          if (error.message.includes('E1100')) {
            setErrorMessage('Email Already Exists!');
          } else {
            setErrorMessage(error.message);
          }
        });
    }
  }, [errors]);

  return (
    <>
      {loading ? (
        <LoadingSpinner data-testid="loading" />
      ) : (
        <UserForm
      onSubmitHandler={handleSubmit}
      formValues={formValues}
      onChangeHandler={onChangeHandler}
      validate={validateUserValues}
      errors={errors}
      title="Edit user"
      btnName="Edit"
    />
      )}
    </>
  );
}
