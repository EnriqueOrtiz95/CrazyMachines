import * as yup from "yup";

export let validate = yup.object().shape({
  fullname: yup
    .string()
    .matches(/^[a-zA-Z0-9 ]{8,70}$/, "Fullname must have at least 8 characters")
    .required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer()
    .min(15, "User must have at least 15 years old")
    .max(80, "User must have at most 80 years old"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(/^(?=.{8,16}$)/, "Must have 8-16 characters")
    .matches(/^(?=.*[a-z])/, "Must have lowercase letters")
    .matches(/^(?=.*[A-Z])/, "Must have uppercase letters")
    .matches(/^(?=.*\d)/, "Must have numbers")
    .matches(/^(?=.*[@$!%*#?&.])/, "Must have special characters (@$!%*#?&.)")
    .required("Enter a password"),
  passwordConfirmed: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export let validateCode = yup.object().shape({
  code: yup
    .number()
    .required("Enter the code")
    .positive()
    .integer()
});

export let validateLogin = yup.object().shape({
  username: yup
    .string()
    .required("Enter your username"),
  password: yup
    .string()
    .required("Enter your password")
});
