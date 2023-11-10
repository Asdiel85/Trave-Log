import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import * as userService from '../service/userService';
import InputField from './InputField.jsx';

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

  const [errors, setErrors] = useState({});
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
    }
    if (!inputValues.lastName) {
      errors.lastName = 'Please enter Last name';
    }
    if (!inputValues.userAvatar.match(avatarPattern)) {
      errors.userAvatar = 'Invalid image url';
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields(inputFields => ({ ...inputFields, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = async () => {
    try {
      const response = await userService.register(inputFields);
      if (!response ||!response.ok) {
        throw new Error (response)
      }
    } catch (error) {
      errors.apiCall = error.message;
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      {errors.apiCall ? (
        <p className={styles.errors}>{errors.apiCall}</p>
      ) : null}
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <InputField
          label="email"
          title="Email"
          type="email"
          name="email"
          placeholder="Email is required"
          id="email"
          value={inputFields.email}
          onChange={handleChange}
        />
        {errors.email ? <p className={styles.errors}>{errors.email}</p> : null}
        <InputField
          label="firstName"
          title="First name"
          type="firstName"
          name="firstName"
          placeholder="First name is required"
          id="firstName"
          value={inputFields.firstName}
          onChange={handleChange}
        />
        {errors.firstName ? (
          <p className={styles.errors}>{errors.firstName}</p>
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
        />
        {errors.lastName ? (
          <p className={styles.errors}>{errors.lastName}</p>
        ) : null}
        <InputField
          label="password"
          title="Password"
          type="password"
          name="password"
          placeholder="Password is required"
          id="password"
          value={inputFields.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <p className={styles.errors}>{errors.password}</p>
        ) : null}
        <InputField
          label="repeatPassword"
          title="Repeat password"
          type="password"
          name="repeatPassword"
          placeholder="Repeat password is required"
          id="repeatPassword"
          value={inputFields.repeatPassword}
          onChange={handleChange}
        />
        {errors.repeatPassword ? (
          <p className={styles.errors}>{errors.repeatPassword}</p>
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
        />
        {errors.userAvatar ? (
          <p className={styles.errors}>{errors.userAvatar}</p>
        ) : null}
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </>
  );
}
