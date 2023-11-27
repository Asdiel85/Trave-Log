import styles from './CreatePost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
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
          setErrorMessage(prev => ({...prev, message}))
        });
    }
  }, [errors]);

  return (
    <>
     
        <form onSubmit={(e) => handleSubmit(e, validatePostValues)} className={styles.login}>
          <h2>Create Post</h2>
          <InputField
          testid='country'
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
          {errors.country && <ErrorParagraph testId='error-country' message={errors.country} />}
          <InputField
          testid='city'
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
          {errors.city && <ErrorParagraph testId='error-city' message={errors.city} />}
          <InputField
          testid='imageUrl'
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
          {errors.imageUrl && <ErrorParagraph testId='error-imageUrl' message={errors.imageUrl} />}
          <InputField
          testid='cost'
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
          {errors.cost && <ErrorParagraph testId='error-cost'  message={errors.cost} />}
          <label htmlFor="description">Description</label>
          <textarea
          data-testid='description'
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
            <ErrorParagraph testId='error-description' message={errors.description} />
          )}
          <SubmitBtn testId= 'create' name="Create" />
        </form>
    </>
  );
}
