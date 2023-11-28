import styles from './EditUser.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import {useForm} from '../../hooks/useForm.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {loggedUser, setLoggedUer} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [, setErrorMessage] = useContext(ErrorContext);

 
  useEffect(() => {
    userService
      .getOne(id)
      .then((response) => handleResponse(response))
      .then((user) => {
       setFormValues(user)
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id]);

  const { formValues, setFormValues, onChangeHandler, handleSubmit, errors, submitting } = useForm({});
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      userService.editUser(id, formValues)
      .then(response => handleResponse(response))
      .then(() => {
        if (loggedUser.id === id) {
          loggedUser.avatar = formValues.userAvatar;
          loggedUser.isAdmin = formValues.isAdmin;
          setLoggedUer(loggedUser);
          localStorage.setItem('user', JSON.stringify(loggedUser));
        }
        navigate(`/user/${id}/details`);
      })
      .catch(error => {
        if (error.message.includes('E1100')) {
          setErrorMessage('Email Already Exists!');
        } else {
          setErrorMessage(error.message);
        }
      })
    }
  }, [errors]);

  return (
    <>
    {loading ? (
      <LoadingSpinner data-testid = 'loading' />
    ) : (
    <form className={styles.login} onSubmit={(e) => handleSubmit(e, validateUserValues)}>
      <h2>Edit User</h2>
      <InputField
        label="email"
        title="Email"
        type="email"
        name="email"
        placeholder="Email is required"
        id="email"
        value={formValues.email}
        onChange={onChangeHandler}
        error={errors.email}
        testid= 'email'
      />
      {errors.email && <ErrorParagraph message={errors.email} />}
      <InputField
        label="firstName"
        title="First name"
        type="firstName"
        name="firstName"
        placeholder="First name is required"
        id="firstName"
        value={formValues.firstName}
        onChange={onChangeHandler}
        error={errors.firstName}
        testid= 'firstName'
      />
      {errors.firstName && <ErrorParagraph message={errors.firstName} />}
      <InputField
        label="lastName"
        title="Last name"
        type="lastName"
        name="lastName"
        placeholder="Last name is required"
        id="lastName"
        value={formValues.lastName}
        onChange={onChangeHandler}
        error={errors.lastName}
        testid= 'lastName'
      />
      {errors.lastName && <ErrorParagraph message={errors.lastName} />}
      <InputField
        label="password"
        title="Password"
        type="password"
        name="password"
        placeholder="Minimum 5 characters"
        id="password"
        value={formValues.password}
        onChange={onChangeHandler}
        error={errors.password}
        testid= 'password'
      />
      {errors.password && <ErrorParagraph message={errors.password} />}
      <InputField
        label="repeatPassword"
        title="Repeat password"
        type="password"
        name="repeatPassword"
        placeholder="Repeat password is required"
        id="repeatPassword"
        value={formValues.repeatPassword || ''}
        onChange={onChangeHandler}
        error={errors.repeatPassword}
        testid= 'repeatPassword'
      />
      {errors.repeatPassword && (
        <ErrorParagraph message={errors.repeatPassword} />
      )}
      <InputField
        label="userAvatar"
        title="User Avatar"
        type="text"
        name="userAvatar"
        placeholder="Avatar is required"
        id="userAvatar"
        value={formValues.userAvatar}
        onChange={onChangeHandler}
        error={errors.userAvatar}
        testid= 'userAvatar'
      />
      {errors.userAvatar && <ErrorParagraph message={errors.userAvatar} />}
      <SubmitBtn name="Register" />
    </form>
    )}
  </>
  );
}
