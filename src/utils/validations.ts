import { string, object, ref, number } from "yup";

export let validate = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .matches(/^(?=.{8,16}$)/, "Must have 8-16 characters")
    .matches(/^(?=.*[a-z])/, "Must have lowercase letters")
    .matches(/^(?=.*[A-Z])/, "Must have uppercase letters")
    .matches(/^(?=.*\d)/, "Must have numbers")
    .matches(/^(?=.*[@$!%*#?&.])/, "Must have special characters (@$!%*#?&.)")
    .required("Enter a password"),
  passwordConfirmed: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export let validateCode = object().shape({
  code: number().required("Enter the code").positive().integer(),
});

export let validateLogin = object().shape({
  username: string().required("Enter your username"),
  password: string().required("Enter your password"),
});

export let validateForgotPassword = object().shape({
  username: string().required("Enter your username"),
});

export let validateNewPassword = object().shape({
  code: number().required("Enter the code").positive().integer(),
  password: string()
    .matches(/^(?=.{8,16}$)/, "Must have 8-16 characters")
    .matches(/^(?=.*[a-z])/, "Must have lowercase letters")
    .matches(/^(?=.*[A-Z])/, "Must have uppercase letters")
    .matches(/^(?=.*\d)/, "Must have numbers")
    .matches(/^(?=.*[@$!%*#?&.])/, "Must have special characters (@$!%*#?&.)")
    .required("Enter a password"),
});
