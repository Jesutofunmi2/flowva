import "./LoginLayout.scss";
import Images from "../../assets/images";
import { Link } from "react-router-dom";

export const LoginLayout = ({ children }) => {
  return (
    <div className="login-layout">
      <div className="login-layout__content">
        <div>{children}</div>
      </div>
    </div>
  );
};
