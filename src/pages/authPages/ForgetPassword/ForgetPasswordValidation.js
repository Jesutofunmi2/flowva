import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const forgetPasswordSchema = yup
  .object({
    email: yup.string().required("Email is required"),
  })
  .required();

const ForgetPasswordValidation = (email) => {
  return useForm({
    resolver: yupResolver(forgetPasswordSchema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      email: email,
    },
  });
};

export default ForgetPasswordValidation;
