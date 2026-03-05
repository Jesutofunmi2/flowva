import PrimaryComponents from "../../../components/primaryComponents";
import { ROLES } from "../../../helpers";
import { pathConstants } from "../../../routes/pathContants";
import "../Error404/404Page.scss";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="mb-3 mt-4 error-page">
        <h4>Something went wrong!</h4>
        <p className="mb-0">Our team is currently investigating this problem</p>
      </div>
      <PrimaryComponents.Button
        className="btn btn--primary px-5"
        onClick={() => {
          const role = localStorage.getItem("role");
          role === ROLES.ADMIN
            ? navigate(pathConstants.ADMIN_DASHBOARD)
            : role === ROLES.SUPER_ADMIN
            ? navigate(pathConstants.SUPER_ADMIN_DASHBOARD)
            : navigate(pathConstants.CANDIDATE_DASHBOARD);
        }}
      >
        Return to Home
      </PrimaryComponents.Button>
    </div>
  );
};

export default Error500;
