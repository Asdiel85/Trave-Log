import styles from './CreatePost.module.css';
import InputField from '../InputField/InputField.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx'; 
import * as postService from '../../service/postService.js';
import { handleResponse } from '../../utils/handleResponse.js';
import { useState, useEffect } from 'react';

export default function CreatePost() {
  const imagePattern = /^(http|https):\/\//;
  const [inputFields, setInputFields] = useState({
    country: '',
    city: '',
    imageUrl: '',
    cost: 0,
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.country) {
      errors.country = 'Country is required';
    }
    if (!inputValues.city) {
      errors.city = 'City is required';
    }  
    if (!inputValues.imageUrl.match(imagePattern)) {
      errors.imageUrl = 'Invalid image url';
    }
    if (Number(inputValues.cost < 1)) {
      errors.cost = 'Cost should be a positive number';
    }
    if (!inputValues.description) {
      errors.description = 'Description is required';
    } else if(inputValues.description.length < 20 || inputValues.description.length > 200){
      errors.description = 'Description should be between 20 and 200 characters'
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  async function finnishSubmit() {
    try {
      const response = await postService.createPost(inputFields);
      await handleResponse(response);
    } catch (error) {
      setApiError(error.message);
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
        <h2>Create Post</h2>
        {apiError ? <ErrorParagraph message={apiError} /> : null}
        <InputField
          label="country"
          title="Country"
          type="text"
          name="country"
          placeholder="Country"
          id="country"
          value={inputFields.country}
          onChange={handleChange}
          error = {errors.country}
        />
        {errors.country ? <ErrorParagraph message={errors.country} /> : null}
        <InputField
          label="city"
          title="city"
          type="text"
          name="city"
          placeholder="City"
          id="city"
          value={inputFields.city}
          onChange={handleChange}
          error = {errors.city}
        />
        {errors.city ? <ErrorParagraph message={errors.city} /> : null}
        <InputField
          label="imageUrl"
          title="Image"
          type="text"
          name="imageUrl"
          placeholder="Image"
          id="imageUrl"
          value={inputFields.imageUrl}
          onChange={handleChange}
          error = {errors.imageUrl}
        />
        {errors.imageUrl ? <ErrorParagraph message={errors.imageUrl} /> : null}
        <InputField
          label="cost"
          title="Cost"
          type="number"
          name="cost"
          placeholder="0"
          id="cost"
          value={inputFields.cost}
          onChange={handleChange}
          error = {errors.cost}
        />
        {errors.cost ? <ErrorParagraph message={errors.cost} /> : null}
        <label htmlFor="description">Description</label>
        <textarea
        className={errors.description ? styles.errorTextarea : styles.textarea}
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={inputFields.description}
          onChange={handleChange}
        ></textarea>
        {errors.description ? <ErrorParagraph message={errors.description} /> : null}
        <SubmitBtn name="Create" />
      </form>
    </>
  );
}
