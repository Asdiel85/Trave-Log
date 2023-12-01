import PostForm from '../PostForm/PostForm.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useForm } from '../../hooks/useForm.jsx';
import { validatePostValues } from '../../utils/validateForms.js';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { formValues, onChangeHandler, handleSubmit, errors, submitting } =
    useForm({
      country: '',
      city: '',
      imageUrl: '',
      cost: 0,
      description: '',
    });

  const navigate = useNavigate();
  const [, setErrorMessage] = useContext(ErrorContext);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      postService
        .createPost(formValues)
        .then((response) => handleResponse(response))
        .then(navigate('/'))
        .catch((error) => {
          const message = error.message;
          setErrorMessage((prev) => ({ ...prev, message }));
        });
    }
  }, [errors]);

  return (
    <>
      <PostForm
        onSubmitHandler={handleSubmit}
        formValues={formValues}
        onChangeHandler={onChangeHandler}
        validate={validatePostValues}
        errors={errors}
        title= 'Create Post'
        btnName= 'Create'
      />
    </>
  );
}
