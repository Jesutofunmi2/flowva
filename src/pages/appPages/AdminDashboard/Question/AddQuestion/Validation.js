import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup
  .object({
     questionTitle: yup.string().required("Question title is required"),
     classId: yup.string().required("Class is required"),
     subjectId: yup.string().required("Subject is required"),

  })
  .required();

const Validation = ({ questionTitle, classId, subjectId} ) => {
  return useForm({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      questionTitle,
      classId,
      subjectId
    },
  });
};

export default Validation;