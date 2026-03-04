import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
    username: yup.string().required("Username is required"),
    full_name: yup.string().required("Full name is required"),
  })
  .required();

const Validation = (username, full_name) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      username: username || "",
      full_name: full_name || "",
    },
  });
};

export default Validation;