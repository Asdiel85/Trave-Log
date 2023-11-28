import styles from './EditPost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
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
  
  
  useEffect(() => {
    postService
    .getPostDetails(id)
    .then((response) => handleResponse(response))
    .then((post) => {
      setFormValues(post)
      setLoading(false);
    })
    .catch((error) => setErrorMessage(error.message));
  }, [id]);
  
  const { formValues, setFormValues, onChangeHandler, handleSubmit, errors, submitting } = useForm({});
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
     postService.editPost(id, formValues)
     .then(response => handleResponse(response))
     .then( navigate(`/post-details/${id}`))
     .catch(error => setErrorMessage(error.message))
    }
  }, [errors]);

  return (
    <>
      {loading ? (
        <LoadingSpinner data-testid = 'loading' />
      ) : (
        <form onSubmit={(e) => handleSubmit(e, validatePostValues)} className={styles.login}>
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
            testid= 'country'
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
            testid={'city'}
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
            testid= 'imageUrl'
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
            testid= 'cost'
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
            data-testid = 'description'
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
