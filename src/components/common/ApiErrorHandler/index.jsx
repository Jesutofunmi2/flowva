import "./ApiErrorHandler.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion as Motion } from "framer-motion";
import ApiErrorHandlerLogic from "./ApiErrorHandlerLogic";
import { CancelIcon, ExclamationCirlce } from "../../../assets/svgIcons";

export const ApiErrorHandler = ({ children }) => {
  const { message, closeApiErrorHandler } = ApiErrorHandlerLogic();

  return (
    <>
      {children}
      {message ? (
        <Motion.div
          initial={{ opacity: 0, top: "10px" }}
          animate={{
            opacity: 1,
            top: "50px",
            transition: { duration: 0.1 },
          }}
          exit={{ opacity: 0 }}
          className="api-error-handler"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
         
           <ExclamationCirlce height="20" width="30" strokeColor={"red"}/>

            <span className="white--text">{message}</span>
      
          </div>
          <span
            className="api-error-handler__close"
            onClick={closeApiErrorHandler}
          >
            <CancelIcon width="20" height="20" />
          </span>
        </Motion.div>
      ) : null}
    </>
  );
};
