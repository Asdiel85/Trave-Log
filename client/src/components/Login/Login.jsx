import styles from './Login.module.css';
import InputField from '../InputField/InputField';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import * as userService from '../../service/userService.js';
import { UserContext } from '../../contexts/AuthContext.js';
import { useContext } from 'react';
import { handleResponse } from '../../utils/handleResponse.js';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
  const [inputFields, setInputFields] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [errors, setErrors] = useState('');
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState('');

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.email.match(emailPattern)) {
      errors.email = 'Invalid email';
    }
    if (!inputValues.password) {
      errors.password = 'Password is required';
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
      const response = await userService.login(inputFields);
      const { userData, token } = await handleResponse(response);
      setLoggedUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData))
      navigate(from, { replace: true });
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
      <form onSubmit={handleSubmit} className={styles.login}>
        <h2>Login</h2>
        {apiError ? <ErrorParagraph message={apiError} /> : null}
        <InputField
          label="email"
          title="Email"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={inputFields.email}
          onChange={handleChange}
          error={errors.email}
        />
        {errors.email ? <ErrorParagraph message={errors.email} /> : null}
        <InputField
          label="password"
          title="Password"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={inputFields.password}
          onChange={handleChange}
          error={errors.password}
        />
        {errors.password ? <ErrorParagraph message={errors.password} /> : null}
        <SubmitBtn name="Login" />
      </form>
    </>
  );
}
