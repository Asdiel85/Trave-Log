import styles from './EditPost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm.jsx';
import { validatePostValues } from '../../utils/validateForms.js';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const [errors, setErrors] = useState('');
  const [submitting, setSubmitting] = useState('');

  const { formValues, onChangeHandler } = useForm({ ...post });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validatePostValues(formValues));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await postService.editPost(id, formValues);
      await handleResponse(response);
      navigate(`/post-details/${id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    postService
      .getPostDetails(id)
      .then((response) => handleResponse(response))
      .then((post) => {
        setPost(post);
        Object.assign(formValues, post);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finnishSubmit();
    }
  }, [errors]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className={styles.login}>
          <h2>Edit Post</h2>
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
          {errors.country && <ErrorParagraph message={errors.country} />}
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
          {errors.city && <ErrorParagraph message={errors.city} />}
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
          {errors.imageUrl && <ErrorParagraph message={errors.imageUrl} />}
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
          {errors.cost && <ErrorParagraph message={errors.cost} />}
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
          {errors.description && (
            <ErrorParagraph message={errors.description} />
          )}
          <SubmitBtn name="Edit" />
        </form>
      )}
    </>
  );
}
