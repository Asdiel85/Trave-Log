import styles from './EditPost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { validateValues } from '../../utils/validatePostForm.js';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [formValues, setFormValues] = useState({
    country: '',
    city: '',
    imageUrl: '',
    cost: '',
    description: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(formValues));
    setSubmitting(true);
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function finnishSubmit() {
    try {
      const response = await postService.editPost(id, formValues);
      await handleResponse(response);
    } catch (error) {
      setApiError(error.message);
    }
  }
  const onChangeHandler = (e) => {
    setFormValues(state => ({...state, [e.target.name]: e.target.value}))
}

  useEffect(() => {
    postService
      .getPostDetails(id)
      .then((response) => handleResponse(response))
      .then((post) => {
        setPost(post);
        setLoading(false);
        setFormValues(state => ({...state, ...post}))
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finnishSubmit();
      navigate('/');
    }
  }, [errors]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className={styles.login}>
          <h2>Create Post</h2>
          {apiError ? <ErrorParagraph message={apiError} /> : null}
          <InputField
            label="country"
            title="Country"
            type="text"
            name="country"
            placeholder="Country"
            id="country"
            value={formValues.country}
            onChange={onChangeHandler}
            error={errors.country}
          />
          {errors.country ? <ErrorParagraph message={errors.country} /> : null}
          <InputField
            label="city"
            title="city"
            type="text"
            name="city"
            placeholder="City"
            id="city"
            value={formValues.city}
            onChange={onChangeHandler}
            error={errors.city}
          />
          {errors.city ? <ErrorParagraph message={errors.city} /> : null}
          <InputField
            label="imageUrl"
            title="Image"
            type="text"
            name="imageUrl"
            placeholder="Image"
            id="imageUrl"
            value={formValues.imageUrl}
            onChange={onChangeHandler}
            error={errors.imageUrl}
          />
          {errors.imageUrl ? (
            <ErrorParagraph message={errors.imageUrl} />
          ) : null}
          <InputField
            label="cost"
            title="Cost"
            type="number"
            name="cost"
            placeholder="0"
            id="cost"
            value={formValues.cost}
            onChange={onChangeHandler}
            error={errors.cost}
          />
          {errors.cost ? <ErrorParagraph message={errors.cost} /> : null}
          <label htmlFor="description">Description</label>
          <textarea
            className={
              errors.description ? styles.errorTextarea : styles.textarea
            }
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={formValues.description}
            onChange={onChangeHandler}
          ></textarea>
          {errors.description ? (
            <ErrorParagraph message={errors.description} />
          ) : null}
          <SubmitBtn name="Create" />
        </form>
      )}
    </>
  );
}
