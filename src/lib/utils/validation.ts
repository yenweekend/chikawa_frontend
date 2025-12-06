export const VALIDATION_REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,72}$/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_ALPHANUMERIC: /^[A-Za-z0-9]+$/,
} as const;

export const ValidationHelpers = {
  isValidEmail: (email: string): boolean => VALIDATION_REGEX.EMAIL.test(email),
  isValidPassword: (password: string): boolean =>
    VALIDATION_REGEX.PASSWORD.test(password),
} as const;

export const ValidationMessages = {
  require: (field: string) => `Please enter ${field}`,
  maxLength: (field: string, maxLength: number) =>
    `${field} must be at most ${maxLength} characters`,
  minLength: (field: string, minLength: number) =>
    `${field} must be at least ${minLength} characters`,
  numberMinLength: (field: string, minLength: number) =>
    `${field} must be at least ${minLength}`,
  numberMaxLength: (field: string, maxLength: number) =>
    `${field} must be at most ${maxLength}`,
  email: "Invalid email address format",
};
