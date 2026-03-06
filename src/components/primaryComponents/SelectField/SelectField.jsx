import "./SelectField.scss";
import Select from "react-select";
import { useSelectField } from "./SelectFieldLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectField = ({
  value,
  onChange = () => {},
  options = [],
  idKey,
  nameKey,
  placeholder,
  isRequired = false,
  label = null,
  labelDescription = null,
  isDisabled = false,
  isSearchable = true,
  errorMessage = undefined,
  floatError = true,
  giveControl = true,
  classNames = "",
  backgroundColor,
  selectInputRef = null,
  minHeight = "50px",
  sideLabel = "",
  ...rest
}) => {
  const { serializeOptions } = useSelectField({
    valueKey: idKey,
    labelKey: nameKey,
  });
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor:
        state.isFocused || errorMessage !== undefined
          ? `${
              errorMessage !== undefined
                ? "979797"
                : state.isFocused
                  ? "#7647ee"
                  : backgroundColor
            } !important`
          : "1px solid #cccccc",
      boxShadow: "none",
      "&:hover": {
        border: backgroundColor
          ? `1px solid ${backgroundColor} !important`
          : "1px solid #7647ee !important",
        boxShadow: "none",
      },
      borderWidth: "0.5px",
      minHeight: minHeight,
    }),
    dropDown: () => ({
      backgroundColor: "red",
    }),

    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused
        ? backgroundColor
          ? backgroundColor
          : "#7647ee"
        : null,
      color: isFocused ? "#fff" : null,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
    }),
  };

  return (
    <div className={`custom-dropdown ${classNames}`} {...rest}>
      {label !== null && (
        <>
          <label htmlFor="" data-testid="label">
            {isRequired && <span className="text-danger">*</span>}
            <span>{label}</span>
          </label>
          {labelDescription ? (
            <span className="d-block gray--text smallest-text-size mb-1">
              {labelDescription}
            </span>
          ) : null}
        </>
      )}
      <div className="custom-dropdown__wrapper">
        {sideLabel ? (
          <span className="custom-dropdown__label">{sideLabel}</span>
        ) : null}
        <Select
          ref={selectInputRef}
          className="custom-dropdown__select"
          classNamePrefix="custom-dropdown__select"
          options={serializeOptions(options)}
          onChange={(answer) => onChange(answer.value, answer.label)}
          defaultValue={{ label: value }}
          value={!giveControl ? value : undefined}
          placeholder={placeholder}
          isDisabled={isDisabled}
          styles={customStyles}
          isSearchable={isSearchable}
        />
      </div>
      {/* error message */}
      {(floatError || errorMessage !== undefined) && (
        <p
          className={`error-message text-danger ${
            errorMessage !== undefined ? "show" : ""
          }`}
          data-testid="error-message"
        >
          <FontAwesomeIcon
            icon={["fas", "exclamation-circle"]}
            className="mr-2"
            style={{ fontSize: "13px" }}
          />
          {errorMessage !== undefined && <span>{errorMessage?.message}</span>}
        </p>
      )}
    </div>
  );
};

export default SelectField;
