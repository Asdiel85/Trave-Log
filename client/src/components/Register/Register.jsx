import styles from './Register.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import InputField from '../InputField/InputField.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';

export default function Register() {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const avatarPattern = /^(http|https):\/\//;

  const [inputFields, setInputFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    userAvatar: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.email.match(emailPattern)) {
      errors.email = 'Invalid email';
    }
    if (inputValues.password.length < 5) {
      errors.password = 'Password is too short';
    }
    if (inputValues.password !== inputValues.repeatPassword) {
      errors.repeatPassword = "Passwords don't match";
    }
    if (!inputValues.firstName) {
      errors.firstName = 'Please enter First name';
    } else if (inputValues.firstName.length < 3) {
      errors.firstName = 'First Name should be atleast 3 characters';
    }
    if (!inputValues.lastName) {
      errors.lastName = 'Please enter Last name';
    } else if (inputValues.lastName.length < 3) {
      errors.lastName = 'Last Name should be atleast 3 characters';
    }
    if (!inputValues.userAvatar.match(avatarPattern)) {
      errors.userAvatar = 'Invalid image url';
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields((inputFields) => ({
      ...inputFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await userService.register(inputFields);
      await handleResponse(response);
      navigate('/login')
    } catch (error) {
      setApiError(error.message);
    }
  }
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finnishSubmit();
    }
  }, [errors]);

  return (
    <>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {apiError ? <ErrorParagraph message={apiError} /> : null}
        <InputField
          label="email"
          title="Email"
          type="email"
          name="email"
          placeholder="Email is required"
          id="email"
          value={inputFields.email}
          onChange={handleChange}
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
          value={inputFields.firstName}
          onChange={handleChange}
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
          value={inputFields.lastName}
          onChange={handleChange}
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
          value={inputFields.password}
          onChange={handleChange}
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
          value={inputFields.repeatPassword}
          onChange={handleChange}
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
          value={inputFields.userAvatar}
          onChange={handleChange}
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
