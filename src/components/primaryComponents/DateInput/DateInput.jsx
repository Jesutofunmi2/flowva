import "./DateInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DateInput = ({
  placeholder = "YYYY-MM-DD",
  name = "",
  isRequired = false,
  label = null,
  labelDescription = null,
  isDisabled = false,
  errorMessage = undefined,
  onChange = () => {},
  register = () => {},
  onKeyUp = () => {},
  classNames = "",
  floatError = true,
  ...props
}) => {
  return (
    <div className="date-input">
      {/* label */}
      {label !== null && (
        <>
          <label htmlFor={name} data-testid="label">
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
      {/* date input  */}
      <input
        data-testid="input"
        type="date"
        className={`${classNames} ${
          errorMessage !== undefined && "error-border"
        }`}
        name={name}
        placeholder={placeholder}
        id={name}
        {...register(name, { required: isRequired })}
        onChange={(e) => {
          onChange(e);
        }}
        disabled={isDisabled}
        onKeyUp={onKeyUp}
        {...props}
      />

      {/* error message */}
      {floatError || errorMessage !== undefined ? (
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
          {errorMessage !== undefined && <span>{errorMessage.message}</span>}
        </p>
      ) : null}
    </div>
  );
};

export default DateInput;
