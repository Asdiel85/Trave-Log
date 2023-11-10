import styles from './Register.module.css';
import InputField from './InputField';
import * as userService from '../service/userService'
import { handleResponse } from '../utils/handleResponse.js';
import { useState } from 'react';

export default function Login() {
  const [inputFields, setInputFields] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userService.login(inputFields);
      handleResponse(response)
      const token = response.json();
    } catch (err) {
     setError(err.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.login}>
        <h2>Login</h2>
        <InputField
          label="email"
          title="Email"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={inputFields.email}
          onChange={handleChange}
        />
        <InputField
          label="password"
          title="Password"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={inputFields.password}
          onChange={handleChange}
        />
         {error ? (
        <p>{error}</p>
      ) : null}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </>
  );
}
