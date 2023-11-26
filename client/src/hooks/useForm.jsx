import { useState, useContext } from "react";
import { ErrorContext } from '../contexts/ErrorContext';


export default function useForm(initialValues) {
    const [formValues, setFormValues] = useState(initialValues)
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [, setErrorMessage] = useContext(ErrorContext)
   
  const onChangeHandler = (e) => {
        setFormValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e, validate) => {
        e.preventDefault();
        setErrors(validate(formValues));
        setSubmitting(true);
      };

    return {
        formValues,
        onChangeHandler,
        handleSubmit,
        errors,
        submitting
    }
}