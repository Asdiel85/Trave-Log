import styles from './InputField.module.css';
export default function InputField({
  label,
  title,
  type,
  name,
  placeholder,
  id,
  error,
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={label}>{title}</label>
      <input
        className={error ? styles.error : styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
