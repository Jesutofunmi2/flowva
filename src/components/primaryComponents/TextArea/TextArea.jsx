import "./TextArea.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextArea = ({
  placeholder,
  type = "text",
  name = "",
  isRequired = false,
  label = null,
  isDisabled = false,
  errorMessage = undefined,
  onChange = () => {},
  value = "",
  register = () => {},
  onKeyUp = () => {},
  classNames = "",
  floatError = true,
}) => {
  return (
    <div className="text-area">
      {label !== null && (
        <label htmlFor={name} data-testid="label">
          {isRequired && <span className="text-danger">*</span>}
          <span>{label}</span>
        </label>
      )}
      {/* text area */}
      <textarea
        data-testid="input"
        className={`${classNames} ${
          errorMessage !== undefined && "error-border"
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        {...register(name, { required: isRequired })}
        onChange={onChange}
        disabled={isDisabled}
        onKeyUp={onKeyUp}
        defaultValue={value}
      ></textarea>

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
          {errorMessage !== undefined && <span>{errorMessage?.message}</span>}
        </p>
      ) : null}
    </div>
  );
};

export default TextArea;
