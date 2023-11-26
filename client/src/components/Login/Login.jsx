import Form from 'react-bootstrap/Form';
import styles from './Login.module.css';
import InputField from '../InputField/InputField';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import * as userService from '../../service/userService.js';
import { UserContext } from '../../contexts/AuthContext.jsx';
import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { handleResponse } from '../../utils/handleResponse.js';
import { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { validateValuesLogin } from '../../utils/validateForms.js';
import useForm from '../../hooks/useForm.jsx';

export default function Login() {
  const { formValues, onChangeHandler, handleSubmit, errors, submitting } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [, setLoggedUser] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorContext)
  // const [submitting, setSubmitting] = useState('');

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      userService.login(formValues)
      .then(response => handleResponse(response))
      .then(userData => {
        setLoggedUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate(from, { replace: true });
      })
      .catch(error => setErrorMessage(error.message))
    }
  }, [errors]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, validateValuesLogin)} className={styles.login}>
        <h2>Login</h2>
        <InputField
          label="email"
          title="Email"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={formValues.email}
          onChange={onChangeHandler}
          error={errors.email}
        />
        {errors.email && <ErrorParagraph message={errors.email} />}
        <InputField
          label="password"
          title="Password"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={formValues.password}
          onChange={onChangeHandler}
          error={errors.password}
        />
        {errors.password && <ErrorParagraph message={errors.password} />}
        <SubmitBtn name="Login" />
      </form>
    </>
  );
}
