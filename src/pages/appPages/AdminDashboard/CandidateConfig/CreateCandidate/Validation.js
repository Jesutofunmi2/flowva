import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    class: yup.string().required("Class is required"),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.date().required("Date of birth is required"),
    session: yup.string().required("Session is required"),
  })
  .required();

const Validation = (fullName, className, gender, dateOfBirth, session) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      fullName,
      class: className,
      gender,
      dateOfBirth,
      session,
    },
  });
};

export default Validation;