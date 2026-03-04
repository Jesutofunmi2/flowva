import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
    username: yup.string().required("Username is required"),
    fullName: yup.string().required("Full name is required"),
  })
  .required();

const Validation = (username, fullName) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      username,
      fullName,
    },
  });
};

export default Validation;