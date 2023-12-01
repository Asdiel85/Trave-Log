import * as styles from './PostForm.module.css';
import InputField from '../InputField/InputField.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';

export default function PostForm({
  onSubmitHandler,
  formValues,
  onChangeHandler,
  validate,
  errors,
  title,
  btnName
}) {
  return (
    <form
      onSubmit={(e) => onSubmitHandler(e, validate)}
      className={styles.login}
    >
      <h2>{title}</h2>
      <InputField
        testid="country"
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
        <ErrorParagraph testId="error-country" message={errors.country} />
      )}
      <InputField
        testid="city"
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
      {errors.city && (
        <ErrorParagraph testId="error-city" message={errors.city} />
      )}
      <InputField
        testid="imageUrl"
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
      {errors.imageUrl && (
        <ErrorParagraph testId="error-imageUrl" message={errors.imageUrl} />
      )}
      <InputField
        testid="cost"
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
      {errors.cost && (
        <ErrorParagraph testId="error-cost" message={errors.cost} />
      )}
      <label htmlFor="description">Description</label>
      <textarea
        data-testid="description"
        className={errors.description ? styles.errorTextarea : styles.textarea}
        name="description"
        id="description"
        cols="30"
        rows="10"
        value={formValues.description}
        onChange={onChangeHandler}
      ></textarea>
      {errors.description && (
        <ErrorParagraph
          testId="error-description"
          message={errors.description}
        />
      )}
      <SubmitBtn testId="create" name={btnName} />
    </form>
  );
}
