import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
    name: yup.string().required("Subject name is required"),
  })
  .required();

const Validation = (name) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      name,
    },
  });
};

export default Validation;