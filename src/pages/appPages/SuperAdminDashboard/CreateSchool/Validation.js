import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone number is required"),
  })
  .required();

const Validation = (name, email, address, phone) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      name,
      email,
      address,
      phone,
    },
  });
};

export default Validation;