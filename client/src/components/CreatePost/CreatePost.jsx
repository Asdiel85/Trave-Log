import styles from './CreatePost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import useForm from '../../hooks/useForm.jsx';
import { validatePostValues } from '../../utils/validateForms.js';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { formValues, onChangeHandler } = useForm({
    country: '',
    city: '',
    imageUrl: '',
    cost: 0,
    description: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validatePostValues(formValues));
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await postService.createPost(formValues);
        await handleResponse(response);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  async function finnishSubmit() {
    try {
      const response = await postService.createPost(formValues);
      await handleResponse(response);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && submitting) {
  //     finnishSubmit();
  //   }
  // }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.login}>
        <h2>Create Post</h2>
        <InputField
          testid={'country'}
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
        {errors.country && (
          <ErrorParagraph testId={'error-coutry'} message={errors.country} />
        )}
        <InputField
          testid={'city'}
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
        {errors.city && <ErrorParagraph testId={'error-city'} message={errors.city} />}
        <InputField
          testid={'imageUrl'}
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
        {errors.imageUrl && <ErrorParagraph testId={'error-imageUrl'} message={errors.imageUrl} />}
        <InputField
          testid={'cost'}
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
        {errors.cost && <ErrorParagraph testId={'error-cost'} message={errors.cost} />}
        <label htmlFor="description">Description</label>
        <textarea
          className={
            errors.description ? styles.errorTextarea : styles.textarea
          }
          data-testid={'description'}
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={formValues.description}
          onChange={onChangeHandler}
        ></textarea>
        {errors.description && <ErrorParagraph testId={'error-description'} message={errors.description} />}
        <SubmitBtn testId={'create'} name="Create" />
      </form>
    </>
  );
}