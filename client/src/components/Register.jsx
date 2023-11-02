import styles from './Register.module.css';
import { useState, useEffect } from 'react';

export default function Register() {
  const [inputFields, setInputFields] = useState({
    email: '',
    firstName: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.email.length < 10) {
      errors.email = 'Email is too short';
    }
    if (inputValues.password.length < 5) {
      errors.password = 'Password is too short';
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

  const finishSubmit = () => {
    console.log(inputFields);
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
        <input
          type="email"
          name="email"
          placeholder="email"
          value={inputFields.email}
          onChange={handleChange}
        />
        {errors.email ? (
          <p className={styles.errors}>Email should be at least 10 characters long</p>
        ) : null}
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          value={inputFields.firstName}
          onChange={handleChange}
        />
        <input type="text" name="lastName" placeholder="last name" />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={inputFields.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="repeat password"
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
