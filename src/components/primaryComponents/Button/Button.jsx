import "./Button.scss";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  isLoading,
  loadingText,
  classNames,
  onClick,
  isDisabled,
  showSpinner = true,
  primarySpinner = true,
  ...rest
}) => {
  return (
    <Motion.button
      className={classNames}
      onClick={onClick}
      disabled={isDisabled}
      data-testid="button"
      {...rest}
    >
      {isLoading ? (
        <span className="d-flex align-items-center">
          {showSpinner && (
            <FontAwesomeIcon
              icon={["fas", "spinner"]}
              className={`fa-spin ${
                primarySpinner ? "white--text" : "purple--text"
              } mr-2`}
              style={{ fontSize: "20px" }}
            />
          )}
          {loadingText}
        </span>
      ) : (
        <span className="d-flex justify-content-center align-items-center w-100">
          {children}
        </span>
      )}
    </Motion.button>
  );
};

export default Button;
