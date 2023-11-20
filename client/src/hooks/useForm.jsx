import { useState } from "react";
import { validateValues } from '../utils/validatePostForm';

export default function useForm(initialValues) {
    const [formValues, setFormValues] = useState(initialValues)
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
   
  const onChangeHandler = (e) => {
        setFormValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(formValues));
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