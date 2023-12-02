import PostForm from '../PostForm/PostForm.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from '../../hooks/useForm.jsx';
import { validatePostValues } from '../../utils/validateForms.js';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [, setErrorMessage] = useContext(ErrorContext);
  const { formValues, setFormValues, onChangeHandler, handleSubmit, errors, submitting } = useForm({});
  
  
  useEffect(() => {
    postService
    .getPostDetails(id)
    .then((response) => handleResponse(response))
    .then((post) => {
      setFormValues(post)
      setLoading(false);
    })
    .catch((error) => {
      setErrorMessage(error.message)
      navigate('/error')
    });
  }, [id]);
  
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
     postService.editPost(id, formValues)
     .then(response => handleResponse(response))
     .then( navigate(`/post-details/${id}`))
     .catch(error => {
      setErrorMessage(error.message)
      navigate('/error')
    })
    }
  }, [errors]);

  return (
    <>
      {loading ? (
        <LoadingSpinner data-testid = 'loading' />
      ) : (
        <PostForm
        onSubmitHandler={handleSubmit}
        formValues={formValues}
        onChangeHandler={onChangeHandler}
        validate={validatePostValues}
        errors={errors}
        title= 'Edit Post'
        btnName= 'Edit'
        />
      )}
    </>
  );
}
