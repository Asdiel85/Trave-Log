import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import * as userService from '../service/userService'

export default function Register() {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [inputFields, setInputFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
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
    if(!inputValues.firstName) {
      errors.firstName = 'Please enter First name'
    }
     if(!inputValues.lastName) {
      errors.lastName= 'Please enter Last name'
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = async () => {
   const user = await userService.register(inputFields)
   console.log(user);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div className={styles.login}>
      <h2>Travel Log</h2>
      <form className={styles.login} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email is required"
          id='email'
          value={inputFields.email}
          onChange={handleChange}
        />
        {errors.email ? <p className={styles.errors}>{errors.email}</p> : null}
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First name is required"
          id='firstName'
          value={inputFields.firstName}
          onChange={handleChange}
        />
        {errors.firstName ? <p className={styles.errors}>{errors.firstName}</p> : null}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last name is required"
          id='lastName'
          value={inputFields.lastName}
          onChange={handleChange}
        />
        {errors.lastName ? <p className={styles.errors}>{errors.lastName}</p> : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          id='password'
          value={inputFields.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <p className={styles.errors}>{errors.password}</p>
        ) : null}
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          placeholder="repeat password"
          id='repeatPassword'
          value={inputFields.repeatPassword}
          onChange={handleChange}
        />
        {errors.repeatPassword ? (
          <p className={styles.errors}>{errors.repeatPassword}</p>
        ) : null}
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
