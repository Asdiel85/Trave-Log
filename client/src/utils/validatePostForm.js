const imagePattern = /^(http|https):\/\//;

export const validateValues = (inputValues) => {
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