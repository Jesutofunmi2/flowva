import "./PasswordInputField.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordInputField from "./PasswordInputFieldLogic";

const PasswordInputField = ({
  name = "",
  placeholder = "",
  label = null,
  isRequired = false,
  register = () => {},
  onChange = () => {},
  isDisabled = false,
  errorMessage = undefined,
  value = "",
  onKeyUp = () => {},
}) => {
  const { showPassword, handleShowPassword } = usePasswordInputField();

  return (
    <div className="password-container">
      {label !== null && (
        <label htmlFor={name} data-testid="label">
          {isRequired && <span className="error--text">*</span>}
          <span>{label}</span>
        </label>
      )}
      <div
        className={`password-container__input-section ${
          errorMessage !== undefined && "error-border"
        }`}
      >
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          id={name}
          {...register(name, { required: isRequired })}
          onChange={onChange}
          disabled={isDisabled}
          defaultValue={value}
          autoComplete="on"
          onKeyUp={onKeyUp}
        />
        <div onClick={handleShowPassword} style={{ background: "transparent" }}>
         <label className="cursor-pointer smallest-text-size" style={{ color: "#A78BFA" }}>{showPassword ? "Hide" : "Show"}</label>
        </div>
      </div>
      <p
        className={`error-message error--text ${
          errorMessage !== undefined ? "show" : ""
        }`}
        data-testid="error-message"
      >
        {errorMessage !== undefined && <span>{errorMessage.message}</span>}
      </p>
    </div>
  );
};

export default PasswordInputField;
