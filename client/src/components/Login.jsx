import styles from './Register.module.css';
import InputField from './InputField';
import * as userService from '../service/userService'

import { useState } from 'react';

export default function Login() {
  const [inputFields, setInputFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await userService.login(inputFields)
    } catch (error) {
      console.log(error);
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
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </>
  );
}
