import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { useForm } from '../../hooks/useForm.jsx';
import * as userService from '../../service/userService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateUserValues } from '../../utils/validateForms.js';
import UserForm from '../UserForm/UserForm.jsx';

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
    <UserForm
      onSubmitHandler={handleSubmit}
      formValues={formValues}
      onChangeHandler={onChangeHandler}
      validate={validateUserValues}
      errors={errors}
      title="Register"
      btnName="Register"
    />
  );
}
