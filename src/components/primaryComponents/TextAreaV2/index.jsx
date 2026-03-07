import { Controller } from "react-hook-form";
import TextArea from "../TextArea/TextArea";

const TextAreaV2 = ({ onChange = () => {}, name = "", control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onControllerChange } }) => (
        <TextArea
          name={name}
          onChange={(e) => {
            onControllerChange(e?.target?.value);
            onChange(e);
          }}
          {...props}
        />
      )}
    />
  );
};

export default TextAreaV2;
