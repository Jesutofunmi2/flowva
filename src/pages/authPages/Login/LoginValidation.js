import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginFormValidation = (email, password) => {
  return useForm({
    resolver: yupResolver(loginSchema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      email: email,
      password: password,
    },
  });
};

export default LoginFormValidation;
