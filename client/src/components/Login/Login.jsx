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
  const { formValues, onChangeHandler } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useContext(ErrorContext)
  const [errors, setErrors] = useState('');
  const [submitting, setSubmitting] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateValuesLogin(formValues));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await userService.login(formValues);
      const { userData, token } = await handleResponse(response);
      setLoggedUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.message)
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
