import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signUpSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&\-_#^]/,
        "Password must contain at least one special character (@$!%*?&-_#^)"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

const SignUpFormValidation = (email, password, confirmPassword) => {
  return useForm({
    resolver: yupResolver(signUpSchema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      email,
      password,
      confirmPassword,
    },
  });
};

export default SignUpFormValidation;