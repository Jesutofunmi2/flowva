import { Controller } from "react-hook-form";
import DateInput from "../DateInput/DateInput";

const DateInputV2 = ({ onChange = () => {}, name = "", control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onControllerChange } }) => (
        <DateInput
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

export default DateInputV2;
