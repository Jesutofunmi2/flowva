import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ResetPasswordCallbackSchema = yup
  .object({
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
  })
  .required();

const ResetPasswordCallbackValidation = (password) => {
  return useForm({
    resolver: yupResolver(ResetPasswordCallbackSchema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      password: password,
    },
  });
};

export default ResetPasswordCallbackValidation;
