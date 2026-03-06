import { cleanObject } from "../../../helpers";

export const useSelectField = ({ valueKey, labelKey, bgKey, colorKey }) => {
  const serializeOptions = (options = []) => {
    return options?.map((option) => {
      return cleanObject({
        label: typeof option === "object" ? option[labelKey] : option,
        value: typeof option === "object" ? option[valueKey] : option,
        bgColor: typeof option === "object" ? option[bgKey] : undefined,
        color: typeof option === "object" ? option[colorKey] : undefined,
      });
    });
  };

  return {
    serializeOptions,
  };
};
