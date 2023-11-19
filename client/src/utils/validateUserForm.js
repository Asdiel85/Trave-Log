const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const avatarPattern = /^(http|https):\/\//;

export const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.email.match(emailPattern)) {
      errors.email = 'Invalid email';
    }
    if (inputValues.password.length < 5) {
      errors.password = 'Password is too short';
    }
    if (inputValues.password !== inputValues.repeatPassword) {
      errors.repeatPassword = "Passwords don't match";
    }
    if (!inputValues.firstName) {
      errors.firstName = 'Please enter First name';
    } else if (inputValues.firstName.length < 3) {
      errors.firstName = 'First Name should be atleast 3 characters';
    }
    if (!inputValues.lastName) {
      errors.lastName = 'Please enter Last name';
    } else if (inputValues.lastName.length < 3) {
      errors.lastName = 'Last Name should be atleast 3 characters';
    }
    if (!inputValues.userAvatar.match(avatarPattern)) {
      errors.userAvatar = 'Invalid image url';
    }
    return errors;
  };

  export const validateValuesLogin = (inputValues) => {
    let errors = {};
    if (!inputValues.email.match(emailPattern)) {
      errors.email = 'Invalid email';
    }
    if (!inputValues.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };