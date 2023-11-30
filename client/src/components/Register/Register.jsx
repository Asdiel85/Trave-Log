import styles from './Register.module.css';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { useForm } from '../../hooks/useForm.jsx';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';

export default function Register() {
  const { formValues, onChangeHandler, handleSubmit, errors, submitting } =
    useForm({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      userAvatar: '',
    });

  const navigate = useNavigate();
  const [, setErrorMessage] = useContext(ErrorContext);

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
    <form
      className={styles.login}
      onSubmit={(e) => handleSubmit(e, validateUserValues)}
    >
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
        testid="email"
      />
      {errors.email && (
        <ErrorParagraph testId="error-email" message={errors.email} />
      )}
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
        testid="firstName"
      />
      {errors.firstName && (
        <ErrorParagraph testId="error-firstName" message={errors.firstName} />
      )}
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
        testid="lastName"
      />
      {errors.lastName && (
        <ErrorParagraph testId="error-lastName" message={errors.lastName} />
      )}
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
        testid="password"
      />
      {errors.password && (
        <ErrorParagraph testId="error-password" message={errors.password} />
      )}
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
        testid="repeatPassword"
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
        testid="userAvatar"
      />
      {errors.userAvatar && (
        <ErrorParagraph testId="error-userAvatar" message={errors.userAvatar} />
      )}
      <SubmitBtn testId="register" name="Register" />
    </form>
  );
}
