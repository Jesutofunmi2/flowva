import { Controller } from "react-hook-form";
import SelectField from "../SelectField/SelectField";

const SelectFieldV2 = ({
  name = "",
  control,
  onChange = () => {},
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: onControllerChange } }) => (
        <SelectField
          name={name}
          control={control}
          onChange={(value, label) => {
            onControllerChange(value);
            onChange(value, label);
          }}
          {...props}
        />
      )}
    />
  );
};

export default SelectFieldV2;
