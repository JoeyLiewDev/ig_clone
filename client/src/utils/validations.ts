import * as yup from "yup";

export const registerValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("E-Mail is invalid").required("E-Mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password requires atleast 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
