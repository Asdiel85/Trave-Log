import styles from './EditUser.module.css';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import { UserContext } from '../../contexts/AuthContext.js';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import useForm from '../../hooks/useForm.jsx';

export default function Register() {
  const {formValues, onChangeHandler} = useForm({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    userAvatar: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [loggedUser, setLoggedUer] = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateUserValues(formValues));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await userService.editUser(id, formValues);
      await handleResponse(response);

      if (loggedUser.id === id) {
        loggedUser.avatar = formValues.userAvatar;
        loggedUser.isAdmin = formValues.isAdmin
        setLoggedUer(loggedUser)
        localStorage.setItem('user', JSON.stringify(loggedUser))
      }
      navigate(`/user/${id}/details`);
    } catch (error) {
      if(error.message.includes('E1100')) {
        setApiError('Email Already Exists!')
      } else {
        setApiError(error.message);
      }
    }
  }

  useEffect(() => {
    userService
      .getOne(id)
      .then((response) => handleResponse(response))
      .then((user) => {
        setUser(user);
        Object.assign(formValues, user);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finnishSubmit();
    }
  }, [errors]);

  return (
    <>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Edit User</h2>
        {apiError ? <ErrorParagraph message={apiError} /> : null}
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
        />
        {errors.email ? <ErrorParagraph message={errors.email} /> : null}
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
        />
        {errors.firstName ? (
          <ErrorParagraph message={errors.firstName} />
        ) : null}
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
        />
        {errors.lastName ? <ErrorParagraph message={errors.lastName} /> : null}
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
        />
        {errors.password ? <ErrorParagraph message={errors.password} /> : null}
        <InputField
          label="repeatPassword"
          title="Repeat password"
          type="password"
          name="repeatPassword"
          placeholder="Repeat password is required"
          id="repeatPassword"
          value={formValues.repeatPassword}
          onChange={onChangeHandler}
          error={errors.repeatPassword}
        />
        {errors.repeatPassword ? (
          <ErrorParagraph message={errors.repeatPassword} />
        ) : null}
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
        />
        {errors.userAvatar ? (
          <ErrorParagraph message={errors.userAvatar} />
        ) : null}
        <SubmitBtn name="Register" />
      </form>
    </>
  );
}
