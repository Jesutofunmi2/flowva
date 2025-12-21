import "./InputField.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "../../secondaryComponents/ToolTip";
import { ExclamationCirlce } from "../../../assets/svgIcons";

import { formatNumberWithCommas, removeCommas } from "../../../helpers";

const InputField = ({
  placeholder,
  type = "text",
  name = "",
  isRequired = false,
  label = null,
  labelDescription = null,
  labelIcon = <ExclamationCirlce />,
  labelTootipText = "",
  labelStyles = {},
  labelClassNames = "",
  showLabelIcon = false,
  isDisabled = false,
  errorMessage = undefined,
  value = null,
  onChange = () => {},
  register = () => {},
  onKeyUp = () => {},
  classNames = "",
  floatError = true,
  inputIcon = null,
  sideLabelInputText = null,
  bodyStyle = {},
  ...props
}) => {
  const isNumberType = type === "number";

  return (
    <div className="input-field" htmlFor={name} style={{ ...bodyStyle }}>
      {label !== null && (
        <>
          <label
            htmlFor={name}
            data-testid="label"
            className={`${labelClassNames}`}
            style={{ ...labelStyles }}
          >
            {isRequired && <span className="error--text">*</span>}
            <span>{label}</span>
            {showLabelIcon ? (
              <ToolTip tipText={labelTootipText}>
                <span className="ml-2">{labelIcon}</span>
              </ToolTip>
            ) : null}
          </label>
          {labelDescription ? (
            <span className="d-block gray--text smallest-text-size mb-1">
              {labelDescription}
            </span>
          ) : null}
        </>
      )}

      <div
        className={` ${inputIcon === null && !sideLabelInputText ? "" : classNames} ${
          inputIcon !== null || sideLabelInputText ? "inputCover" : ""
        } ${isDisabled ? "isDisabled" : ""} ${
          errorMessage !== undefined ? "error-border" : ""
        } ${sideLabelInputText ? "d-flex" : ""}`}
      >
        {inputIcon !== null ? <img src={inputIcon} alt="input-icon" /> : null}
        {sideLabelInputText ? (
          <span
            style={{
              minWidth: "120px",
              height: "50px",
              background: "#EAEAEA",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              padding: "0 0.7em 2px 0.7em",
              marginLeft: "-1em",
              display: "flex",
              alignItems: "center",
            }}
          >
            {sideLabelInputText}
          </span>
        ) : null}
        <input
          data-testid="input"
          className={`${inputIcon === null ? classNames : ""} ${
            errorMessage !== undefined && "error-border"
          }`}
          type={isNumberType ? undefined : type}
          name={name}
          placeholder={placeholder}
          id={name}
          {...register(name, { required: isRequired })}
          disabled={isDisabled}
          value={
            isNumberType
              ? formatNumberWithCommas(removeCommas(value)) || ""
              : !value
                ? undefined
                : value
          }
          onKeyUp={onKeyUp}
          onChange={(e) => {
            if (isNumberType) {
              if (isNaN(removeCommas(e.target.value))) {
                e.target.value = "";
                return onChange(e);
              }

              e.target.value = removeCommas(e.target.value);
            }
            onChange(e);
          }}
          {...props}
        />
      </div>
      {floatError || errorMessage !== undefined ? (
        <p
          className={`error-message error--text ${
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

export default InputField;
