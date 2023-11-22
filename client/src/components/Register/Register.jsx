import styles from './Register.module.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext.js';
import useForm from '../../hooks/useForm.jsx';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';

export default function Register() {
  const { formValues, onChangeHandler } = useForm({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    userAvatar: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateUserValues(formValues));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await userService.register(formValues);
      await handleResponse(response);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finnishSubmit();
    }
  }, [errors]);

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      {errors.firstName ? <ErrorParagraph message={errors.firstName} /> : null}
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
  );
}
