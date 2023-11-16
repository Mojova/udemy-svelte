export const validateRequiredField = (value, label = "Field") => {
  let error;
  if (!value) {
    error = `${label} is required.`;
  }
  return error;
};

export const validateEmail = (value, label = "Email") => {
  let error;
  if (value && !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
    error = `${label} is not a valid e-mail.`;
  }
  return error;
};
