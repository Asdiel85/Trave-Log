import * as styles from './UserForm.module.css';
import InputField from '../InputField/InputField.jsx';
import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.jsx';
import SubmitBtn from '../SubmitBtn/SubmitBtn.jsx';

export default function UserForm({
  onSubmitHandler,
  formValues,
  onChangeHandler,
  validate,
  errors,
  title,
  btnName,
}) {
  return (
    <form
      className={styles.login}
      onSubmit={(e) => onSubmitHandler(e, validate)}
    >
      <h2>{title}</h2>
      <InputField
        label="email"
        title="Email"
        type="email"
        name="email"
        placeholder="Email is required"
        id="email"
        value={formValues.email}
        onChange={onChangeHandler}
        error={errors.email}
        testid="email"
      />
      {errors.email && (
        <ErrorParagraph testId="error-email" message={errors.email} />
      )}
      <InputField
        label="firstName"
        title="First name"
        type="firstName"
        name="firstName"
        placeholder="First name is required"
        id="firstName"
        value={formValues.firstName}
        onChange={onChangeHandler}
        error={errors.firstName}
        testid="firstName"
      />
      {errors.firstName && (
        <ErrorParagraph testId="error-firstName" message={errors.firstName} />
      )}
      <InputField
        label="lastName"
        title="Last name"
        type="lastName"
        name="lastName"
        placeholder="Last name is required"
        id="lastName"
        value={formValues.lastName}
        onChange={onChangeHandler}
        error={errors.lastName}
        testid="lastName"
      />
      {errors.lastName && (
        <ErrorParagraph testId="error-lastName" message={errors.lastName} />
      )}
      <InputField
        label="password"
        title="Password"
        type="password"
        name="password"
        placeholder="Minimum 5 characters"
        id="password"
        value={formValues.password}
        onChange={onChangeHandler}
        error={errors.password}
        testid="password"
      />
      {errors.password && (
        <ErrorParagraph testId="error-password" message={errors.password} />
      )}
      <InputField
        label="repeatPassword"
        title="Repeat password"
        type="password"
        name="repeatPassword"
        placeholder="Repeat password is required"
        id="repeatPassword"
        value={formValues.repeatPassword || ''}
        onChange={onChangeHandler}
        error={errors.repeatPassword}
        testid="repeatPassword"
      />
      {errors.repeatPassword && (
        <ErrorParagraph message={errors.repeatPassword} />
      )}
      <InputField
        label="userAvatar"
        title="User Avatar"
        type="text"
        name="userAvatar"
        placeholder="Avatar is required"
        id="userAvatar"
        value={formValues.userAvatar}
        onChange={onChangeHandler}
        error={errors.userAvatar}
        testid="userAvatar"
      />
      {errors.userAvatar && (
        <ErrorParagraph testId="error-userAvatar" message={errors.userAvatar} />
      )}
      <SubmitBtn testId="register" name={btnName} />
    </form>
  );
}
